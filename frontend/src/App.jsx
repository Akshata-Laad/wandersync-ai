import React from 'react';
import { TripProvider, useTrip } from './context/TripContext';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { ItineraryView } from './components/ItineraryView';
import { ExploreDestinations } from './pages/ExploreDestinations';
import { TripBuilderModal } from './components/TripBuilderModal';
import { AlertCircle, X, Heart, Compass, Sparkles } from 'lucide-react';

const MainLayout = () => {
  const { activeTab, error, setError } = useTrip();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Sticky Navbar */}
      <Navbar />

      {/* Global Error Banner if any */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 w-full">
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => setError(null)}
              className="p-1 rounded-lg hover:bg-rose-100 text-rose-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'itinerary' && <ItineraryView />}
        {activeTab === 'explore' && <ExploreDestinations />}
      </main>

      {/* Trip Builder Modal */}
      <TripBuilderModal />

      {/* Modern SaaS Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2 font-medium">
            <Compass className="w-4 h-4 text-teal-600" />
            <span className="font-bold text-slate-800">WanderSync AI</span>
            <span>— Personalized Travel Itinerary Planner</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-600 font-medium">
              React + Vite
            </span>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-600 font-medium">
              FastAPI
            </span>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-600 font-medium">
              Supabase Ready
            </span>
            <span className="px-2 py-0.5 rounded-md bg-teal-50 border border-teal-200 text-teal-700 font-medium">
              Gemini & Fallback Engine
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <TripProvider>
      <MainLayout />
    </TripProvider>
  );
}
