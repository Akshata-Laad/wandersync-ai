import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { MapPin, Navigation, Eye, Compass, Layers } from 'lucide-react';

// Custom Marker Colors per Day
const DAY_COLORS = ['#0d9488', '#e11d48', '#4f46e5', '#d97706', '#0284c7', '#16a34a', '#9333ea'];

export const InteractiveMap = ({ trip }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [selectedDayFilter, setSelectedDayFilter] = useState('all'); // 'all' or day number

  useEffect(() => {
    if (!mapContainerRef.current || !trip || !trip.days) return;

    // Destroy prior map instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Collect all coordinates
    const allActivities = [];
    trip.days.forEach(day => {
      day.activities.forEach(act => {
        if (act.coordinates && act.coordinates.lat && act.coordinates.lng) {
          allActivities.push({
            ...act,
            day_number: day.day_number,
            day_title: day.title
          });
        }
      });
    });

    if (allActivities.length === 0) return;

    // Filter by selected day if specified
    const filteredActivities = selectedDayFilter === 'all'
      ? allActivities
      : allActivities.filter(a => a.day_number === parseInt(selectedDayFilter, 10));

    const initialCenter = filteredActivities[0]?.coordinates 
      ? [filteredActivities[0].coordinates.lat, filteredActivities[0].coordinates.lng]
      : [48.8566, 2.3522];

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: 13,
      scrollWheelZoom: false,
    });

    // Add CartoDB Positron / OpenStreetMap tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CartoDB</a> contributors',
      maxZoom: 19
    }).addTo(map);

    const markersGroup = L.featureGroup();
    const routeCoords = [];

    filteredActivities.forEach((act, index) => {
      const color = DAY_COLORS[(act.day_number - 1) % DAY_COLORS.length];
      const latLng = [act.coordinates.lat, act.coordinates.lng];
      routeCoords.push(latLng);

      // Create custom SVG marker icon
      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div style="
            background-color: ${color};
            color: white;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 12px;
            border: 3px solid white;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.25);
          ">
            ${index + 1}
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -18]
      });

      const popupContent = `
        <div style="font-family: sans-serif; padding: 4px; max-width: 220px;">
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
            <span style="font-size: 10px; font-weight: 700; color: ${color}; text-transform: uppercase;">
              Day ${act.day_number} • ${act.time_slot}
            </span>
            <span style="font-size: 10px; background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-weight: 600;">
              ${act.category}
            </span>
          </div>
          <h4 style="margin: 0 0 4px 0; font-size: 13px; font-weight: 700; color: #0f172a;">
            ${act.title}
          </h4>
          <p style="margin: 0 0 6px 0; font-size: 11px; color: #475569; line-height: 1.3;">
            ${act.description.substring(0, 95)}...
          </p>
          <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 600;">
            <span style="color: #0d9488;">${act.estimated_cost === 0 ? 'Free' : '$' + act.estimated_cost}</span>
            <span style="color: #64748b;">${act.time}</span>
          </div>
        </div>
      `;

      const marker = L.marker(latLng, { icon: customIcon })
        .bindPopup(popupContent);

      markersGroup.addLayer(marker);
    });

    // Add polyline if multiple points
    if (routeCoords.length > 1) {
      const polyline = L.polyline(routeCoords, {
        color: selectedDayFilter === 'all' ? '#0d9488' : DAY_COLORS[(parseInt(selectedDayFilter, 10) - 1) % DAY_COLORS.length],
        weight: 3,
        opacity: 0.7,
        dashArray: '6, 8',
      });
      polyline.addTo(map);
    }

    markersGroup.addTo(map);

    if (markersGroup.getLayers().length > 0) {
      map.fitBounds(markersGroup.getBounds().pad(0.15));
    }

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [trip, selectedDayFilter]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
      
      {/* Map Control Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
        <div>
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-teal-600" />
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              Interactive Route & Waypoints Overview
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Geographic pins and sequenced paths for {trip.destination}
          </p>
        </div>

        {/* Day Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedDayFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              selectedDayFilter === 'all'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Days
          </button>
          {trip.days.map(d => (
            <button
              key={d.day_number}
              onClick={() => setSelectedDayFilter(d.day_number.toString())}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedDayFilter === d.day_number.toString()
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Day {d.day_number}
            </button>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div 
        ref={mapContainerRef} 
        className="w-full h-[450px] sm:h-[520px] relative z-10 bg-slate-100"
      />

      {/* Map Legend Footer */}
      <div className="p-4 bg-white border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-semibold text-slate-400 uppercase text-[10px]">Route Legend:</span>
          {trip.days.map((d, i) => (
            <div key={d.day_number} className="flex items-center gap-1.5">
              <span 
                className="w-3 h-3 rounded-full border border-white shadow-xs" 
                style={{ backgroundColor: DAY_COLORS[i % DAY_COLORS.length] }} 
              />
              <span className="font-medium text-slate-700">Day {d.day_number}</span>
            </div>
          ))}
        </div>
        <div className="text-[11px] text-slate-400">
          Click any numbered pin to preview activity details
        </div>
      </div>

    </div>
  );
};
