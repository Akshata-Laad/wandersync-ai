import React, { useState } from 'react';
import { ActivityCard } from './ActivityCard';
import { 
  Calendar, RefreshCw, Bus, DollarSign, Sparkles, 
  ChevronDown, ChevronUp, Star, Lightbulb, MapPin 
} from 'lucide-react';

export const DayCard = ({ 
  day, 
  onRegenerateDay, 
  onRegenerateActivity, 
  onEditActivity 
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [showRegenModal, setShowRegenModal] = useState(false);
  const [refinementPrompt, setRefinementPrompt] = useState('');

  const handleRegenSubmit = (e) => {
    e.preventDefault();
    onRegenerateDay(day.day_number, refinementPrompt);
    setShowRegenModal(false);
    setRefinementPrompt('');
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden mb-6">
      
      {/* Day Card Header */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-50 via-teal-50/20 to-white border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Day Title & Theme */}
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex flex-col items-center justify-center font-extrabold shrink-0 shadow-md shadow-teal-600/20">
              <span className="text-[10px] uppercase tracking-wider font-semibold opacity-80">Day</span>
              <span className="text-lg leading-none">{day.day_number}</span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-lg text-slate-900 leading-snug">
                  {day.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                {day.theme}
              </p>
              {day.date && (
                <span className="inline-block mt-1 text-[11px] font-semibold text-slate-400">
                  {day.date}
                </span>
              )}
            </div>
          </div>

          {/* Right Action & Cost Meta */}
          <div className="flex items-center gap-3 self-end sm:self-center">
            {/* Day Cost */}
            <div className="text-right">
              <span className="text-[11px] text-slate-400 font-semibold uppercase block">Est. Day Cost</span>
              <span className="font-extrabold text-teal-700 text-base">
                ${day.day_estimated_cost}
              </span>
            </div>

            {/* Regenerate Day Button */}
            <button
              onClick={() => setShowRegenModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-semibold border border-teal-200 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Regenerate Day</span>
            </button>

            {/* Accordion Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Highlight Banner */}
        {day.highlight && (
          <div className="mt-4 p-3 rounded-2xl bg-amber-50/60 border border-amber-200/50 flex items-center gap-2.5 text-xs text-amber-900">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
            <div>
              <span className="font-bold text-amber-950">Day Highlight: </span>
              {day.highlight}
            </div>
          </div>
        )}

        {/* Transit Advice */}
        {day.transit_advice && (
          <div className="mt-2 p-3 rounded-2xl bg-sky-50/70 border border-sky-200/50 flex items-center gap-2.5 text-xs text-sky-900">
            <Bus className="w-4 h-4 text-sky-600 shrink-0" />
            <div>
              <span className="font-bold text-sky-950">Logistics & Transit: </span>
              {day.transit_advice}
            </div>
          </div>
        )}
      </div>

      {/* Activities Timeline */}
      {isOpen && (
        <div className="p-5 sm:p-6 bg-slate-50/40">
          <div className="space-y-4">
            {day.activities.map((act) => (
              <ActivityCard
                key={act.id}
                activity={act}
                dayNumber={day.day_number}
                onRegenerate={onRegenerateActivity}
                onEdit={onEditActivity}
              />
            ))}
          </div>
        </div>
      )}

      {/* Regenerate Day Modal Dialog */}
      {showRegenModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-2 text-teal-800 font-bold text-base mb-2">
              <Sparkles className="w-5 h-5 text-teal-600" />
              <span>Regenerate Day {day.day_number}</span>
            </div>
            <p className="text-xs text-slate-600 mb-4">
              Enter any new preferences or adjustments (e.g. "Focus more on outdoor parks", "Add romantic dinner", "Less walking, more relaxing").
            </p>

            <form onSubmit={handleRegenSubmit} className="space-y-4">
              <textarea
                rows={3}
                value={refinementPrompt}
                onChange={(e) => setRefinementPrompt(e.target.value)}
                placeholder="What would you like to change about Day 1?"
                className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
              />

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowRegenModal(false)}
                  className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Regenerate with AI
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
