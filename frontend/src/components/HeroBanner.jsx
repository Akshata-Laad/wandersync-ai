import React from 'react';
import { useTrip } from '../context/TripContext';
import { Sparkles, Compass, ShieldCheck, Map, Users, Heart, User, Clock, ArrowRight } from 'lucide-react';

export const HeroBanner = () => {
  const { setIsBuilderOpen, loadScenario } = useTrip();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white p-8 md:p-12 mb-10 shadow-2xl border border-teal-900/50">
      {/* Background ambient glowing rings */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-5">
          <Sparkles className="w-3.5 h-3.5" />
          AI-Powered Full-Stack Travel Planner
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white mb-4">
          Personalized Itineraries, <br />
          <span className="bg-gradient-to-r from-teal-300 via-emerald-300 to-cyan-200 bg-clip-text text-transparent">
            Automated in Seconds.
          </span>
        </h1>

        <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed font-normal">
          Generate optimized day-by-day travel plans with intelligent routing, curated dining, accommodations, and live budget tracking. Tailored for solo adventurers, romantic couples, and coordinating friend groups.
        </p>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <button
            onClick={() => setIsBuilderOpen(true)}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold shadow-lg shadow-teal-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-5 h-5 text-slate-950" />
            <span>Create Custom Trip</span>
          </button>

          <a
            href="#scenarios"
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-medium transition-all backdrop-blur-sm"
          >
            <span>Explore 3 Scenarios</span>
            <ArrowRight className="w-4 h-4 text-teal-300" />
          </a>
        </div>

        {/* Feature Highlights Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300 pt-6 border-t border-white/10">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-teal-400" />
            <span>Zero Decision Fatigue</span>
          </div>
          <div className="flex items-center gap-2">
            <Map className="w-4 h-4 text-teal-400" />
            <span>Interactive Route Maps</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>Budget & Transit Sync</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>Regenerate Any Day</span>
          </div>
        </div>

      </div>
    </div>
  );
};
