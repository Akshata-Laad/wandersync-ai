import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import confetti from 'canvas-confetti';

const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [currentTrip, setCurrentTrip] = useState(null);
  const [savedTrips, setSavedTrips] = useState([]);
  const [popularDestinations, setPopularDestinations] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'itinerary', 'map', 'budget', 'logistics', 'explore'
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generatingStatus, setGeneratingStatus] = useState('');
  const [error, setError] = useState(null);
  const [backendHealth, setBackendHealth] = useState({ status: 'checking', supabase_connected: false });

  // Initial load
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      const [tripsData, destsData, healthData] = await Promise.all([
        api.getTrips(),
        api.getPopularDestinations(),
        api.checkHealth()
      ]);

      setSavedTrips(tripsData);
      setPopularDestinations(destsData);
      setBackendHealth(healthData);

      // Default select the first trip if available
      if (tripsData && tripsData.length > 0) {
        setCurrentTrip(tripsData[0]);
      }
    } catch (err) {
      console.error('Failed to load initial data:', err);
      setError('Unable to load initial data. Check backend connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadScenario = async (scenarioPresetId) => {
    setIsLoading(true);
    setGeneratingStatus(`Loading ${scenarioPresetId.replace('_', ' ')}...`);
    try {
      const trip = await api.getPresetScenario(scenarioPresetId);
      if (trip) {
        setCurrentTrip(trip);
        setActiveTab('itinerary');
        triggerCelebration();
      }
    } catch (err) {
      setError(`Failed to load scenario: ${err.message}`);
    } finally {
      setIsLoading(false);
      setGeneratingStatus('');
    }
  };

  const generateTrip = async (formData) => {
    setIsLoading(true);
    setGeneratingStatus('Analyzing destination, weather & local highlights...');
    try {
      setTimeout(() => setGeneratingStatus('Synthesizing optimized day-by-day itinerary...'), 1200);
      setTimeout(() => setGeneratingStatus('Balancing transit routes & calculating budget allocation...'), 2400);

      const newTrip = await api.generateTrip(formData);
      setCurrentTrip(newTrip);
      setSavedTrips(prev => [newTrip, ...prev.filter(t => t.id !== newTrip.id)]);
      setActiveTab('itinerary');
      setIsBuilderOpen(false);
      triggerCelebration();
      return newTrip;
    } catch (err) {
      setError(err.message || 'Generation failed');
      throw err;
    } finally {
      setIsLoading(false);
      setGeneratingStatus('');
    }
  };

  const regenerateDayPlan = async (dayNumber, refinementPrompt) => {
    if (!currentTrip) return;
    setIsLoading(true);
    setGeneratingStatus(`Regenerating Day ${dayNumber} with your custom preferences...`);
    try {
      const updatedTrip = await api.regenerateDay(currentTrip.id, dayNumber, refinementPrompt);
      setCurrentTrip(updatedTrip);
      setSavedTrips(prev => prev.map(t => t.id === updatedTrip.id ? updatedTrip : t));
      triggerCelebration();
    } catch (err) {
      setError(`Failed to regenerate Day ${dayNumber}: ${err.message}`);
    } finally {
      setIsLoading(false);
      setGeneratingStatus('');
    }
  };

  const regenerateSingleActivity = async (dayNumber, activityId, prompt) => {
    if (!currentTrip) return;
    setIsLoading(true);
    setGeneratingStatus('Finding tailored activity alternatives...');
    try {
      const updatedTrip = await api.regenerateActivity(currentTrip.id, dayNumber, activityId, prompt);
      setCurrentTrip(updatedTrip);
      setSavedTrips(prev => prev.map(t => t.id === updatedTrip.id ? updatedTrip : t));
    } catch (err) {
      setError(`Failed to update activity: ${err.message}`);
    } finally {
      setIsLoading(false);
      setGeneratingStatus('');
    }
  };

  const updateTripDetails = async (updatedTrip) => {
    try {
      const res = await api.updateTrip(updatedTrip);
      setCurrentTrip(res);
      setSavedTrips(prev => prev.map(t => t.id === res.id ? res : t));
    } catch (err) {
      setError(`Failed to update trip: ${err.message}`);
    }
  };

  const deleteTripById = async (tripId) => {
    try {
      await api.deleteTrip(tripId);
      const remaining = savedTrips.filter(t => t.id !== tripId);
      setSavedTrips(remaining);
      if (currentTrip?.id === tripId) {
        setCurrentTrip(remaining[0] || null);
        setActiveTab(remaining.length > 0 ? 'itinerary' : 'dashboard');
      }
    } catch (err) {
      setError(`Failed to delete trip: ${err.message}`);
    }
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // Confetti fallback
    }
  };

  return (
    <TripContext.Provider
      value={{
        currentTrip,
        setCurrentTrip,
        savedTrips,
        popularDestinations,
        activeTab,
        setActiveTab,
        isBuilderOpen,
        setIsBuilderOpen,
        isLoading,
        generatingStatus,
        error,
        setError,
        backendHealth,
        loadScenario,
        generateTrip,
        regenerateDayPlan,
        regenerateSingleActivity,
        updateTripDetails,
        deleteTripById,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};
