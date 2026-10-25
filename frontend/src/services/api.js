const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '') + '/api';

export const api = {
  // Fetch popular destinations
  async getPopularDestinations() {
    try {
      const res = await fetch(`${API_BASE}/destinations/popular`);
      if (!res.ok) throw new Error('Failed to fetch destinations');
      return await res.json();
    } catch (err) {
      console.warn('API error, using fallback destinations', err);
      return [];
    }
  },

  // List all saved trips
  async getTrips() {
    try {
      const res = await fetch(`${API_BASE}/trips`);
      if (!res.ok) throw new Error('Failed to fetch trips');
      return await res.json();
    } catch (err) {
      console.error('Error fetching trips:', err);
      return [];
    }
  },

  // Get single trip by ID
  async getTrip(id) {
    try {
      const res = await fetch(`${API_BASE}/trips/${id}`);
      if (!res.ok) throw new Error('Trip not found');
      return await res.json();
    } catch (err) {
      console.error(`Error fetching trip ${id}:`, err);
      return null;
    }
  },

  // Get preset scenario
  async getPresetScenario(scenarioId) {
    try {
      const res = await fetch(`${API_BASE}/trips/preset/${scenarioId}`);
      if (!res.ok) throw new Error('Scenario not found');
      return await res.json();
    } catch (err) {
      console.error(`Error fetching scenario ${scenarioId}:`, err);
      return null;
    }
  },

  // Generate new trip
  async generateTrip(formData) {
    const res = await fetch(`${API_BASE}/trips/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Trip generation failed');
    }
    return await res.json();
  },

  // Regenerate a single day
  async regenerateDay(tripId, dayNumber, refinementPrompt = '') {
    const res = await fetch(`${API_BASE}/trips/regenerate-day`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trip_id: tripId,
        day_number: dayNumber,
        refinement_prompt: refinementPrompt,
      }),
    });
    if (!res.ok) throw new Error('Failed to regenerate day');
    return await res.json();
  },

  // Regenerate single activity
  async regenerateActivity(tripId, dayNumber, activityId, refinementPrompt = '') {
    const res = await fetch(`${API_BASE}/trips/regenerate-activity`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trip_id: tripId,
        day_number: dayNumber,
        activity_id: activityId,
        refinement_prompt: refinementPrompt,
      }),
    });
    if (!res.ok) throw new Error('Failed to regenerate activity');
    return await res.json();
  },

  // Update trip
  async updateTrip(trip) {
    const res = await fetch(`${API_BASE}/trips/${trip.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trip),
    });
    if (!res.ok) throw new Error('Failed to update trip');
    return await res.json();
  },

  // Delete trip
  async deleteTrip(tripId) {
    const res = await fetch(`${API_BASE}/trips/${tripId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete trip');
    return await res.json();
  },

  // Get shared trip by token
  async getTripByShare(token) {
    const res = await fetch(`${API_BASE}/trips/share/${token}`);
    if (!res.ok) throw new Error('Shared trip not found');
    return await res.json();
  },

  // Health check
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE}/health`);
      return await res.json();
    } catch {
      return { status: 'offline' };
    }
  }
};
