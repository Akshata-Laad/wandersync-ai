import React, { useState } from 'react';
import { 
  Clock, MapPin, DollarSign, Lightbulb, ExternalLink, 
  RefreshCw, Edit3, CheckCircle, AlertTriangle, Sparkles 
} from 'lucide-react';

export const ActivityCard = ({ 
  activity, 
  dayNumber, 
  onRegenerate, 
  onEdit 
}) => {
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapPrompt, setSwapPrompt] = useState('');
  const [showPromptInput, setShowPromptInput] = useState(false);

  const getCategoryBadge = (category) => {
    switch (category?.toLowerCase()) {
      case 'dining':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'attraction':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'stay':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'leisure':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'nightlife':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const handleSwapSubmit = (e) => {
    e.preventDefault();
    onRegenerate(dayNumber, activity.id, swapPrompt);
    setShowPromptInput(false);
    setSwapPrompt('');
  };

  const googleMapsUrl = activity.coordinates 
    ? `https://www.google.com/maps/search/?api=1&query=${activity.coordinates.lat},${activity.coordinates.lng}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.location)}`;

  return (
    <div className="relative bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 hover:border-teal-300 hover:shadow-md transition-all group">
      
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          {/* Time Slot Pill */}
          <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-bold uppercase tracking-wider">
            {activity.time_slot}
          </span>

          {/* Time badge */}
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{activity.time}</span>
          </div>

          {/* Category Pill */}
          <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border ${getCategoryBadge(activity.category)}`}>
            {activity.category}
          </span>
        </div>

        {/* Cost & Duration Badges */}
        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
            {activity.estimated_cost === 0 ? 'Free' : `$${activity.estimated_cost}`}
          </span>
          <span className="text-slate-400 font-medium">
            {activity.duration_hours}h
          </span>
        </div>
      </div>

      {/* Title & Description */}
      <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5 group-hover:text-teal-900 transition-colors">
        {activity.title}
      </h4>
      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3">
        {activity.description}
      </p>

      {/* Location Link */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
        <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
        <a 
          href={googleMapsUrl}
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-teal-700 hover:underline flex items-center gap-1 truncate"
        >
          <span>{activity.location}</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </a>
      </div>

      {/* Pro Tips Box */}
      {activity.tips && (
        <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/60 mb-3 flex items-start gap-2 text-xs text-amber-900">
          <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-snug">
            <strong className="font-semibold text-amber-950">Local Tip: </strong>
            {activity.tips}
          </div>
        </div>
      )}

      {/* Booking Alert if required */}
      {activity.booking_required && (
        <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md mb-3">
          <AlertTriangle className="w-3 h-3" />
          <span>Advance Reservation Advised</span>
        </div>
      )}

      {/* Tags & Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
        <div className="flex flex-wrap gap-1">
          {activity.tags?.map((tag, idx) => (
            <span key={idx} className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowPromptInput(!showPromptInput)}
            title="Swap with AI Alternative"
            className="p-1.5 rounded-lg text-slate-500 hover:text-teal-700 hover:bg-teal-50 border border-transparent hover:border-teal-200 transition-colors text-xs flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span className="hidden sm:inline">Swap AI</span>
          </button>

          <button
            onClick={() => onEdit(activity, dayNumber)}
            title="Edit activity"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Inline AI Swap refinement prompt form */}
      {showPromptInput && (
        <form onSubmit={handleSwapSubmit} className="mt-3 p-3 bg-teal-50/70 rounded-xl border border-teal-200 animate-in fade-in">
          <label className="block text-xs font-semibold text-teal-900 mb-1">
            What would you prefer instead?
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={swapPrompt}
              onChange={(e) => setSwapPrompt(e.target.value)}
              placeholder="e.g. A quieter café, vegetarian option, art gallery..."
              className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              Swap
            </button>
          </div>
        </form>
      )}

    </div>
  );
};
