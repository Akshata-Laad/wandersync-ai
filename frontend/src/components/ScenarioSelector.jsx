import React from 'react';
import { useTrip } from '../context/TripContext';
import { SCENARIO_PRESETS } from '../data/presetScenarios';
import { User, Heart, Users, Clock, Compass, ArrowRight, CheckCircle2 } from 'lucide-react';

export const ScenarioSelector = () => {
  const { loadScenario, currentTrip } = useTrip();

  const getIcon = (id) => {
    switch (id) {
      case 'scenario_1':
        return <User className="w-5 h-5 text-emerald-600" />;
      case 'scenario_2':
        return <Heart className="w-5 h-5 text-rose-600" />;
      case 'scenario_3':
        return <Users className="w-5 h-5 text-indigo-600" />;
      default:
        return <Compass className="w-5 h-5 text-teal-600" />;
    }
  };

  return (
    <section id="scenarios" className="mb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-semibold mb-2">
            Built-in Real World Demonstrations
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Target Travel Scenarios
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-2xl">
            Experience how the AI planner solves specific travel hurdles across solo getaways, romantic escapes, and group logistics.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {SCENARIO_PRESETS.map((scenario) => {
          const isActive = currentTrip?.scenario_id === scenario.id;

          return (
            <div
              key={scenario.id}
              className={`relative flex flex-col rounded-2xl bg-white border transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl ${
                isActive 
                  ? 'border-teal-500 ring-2 ring-teal-500/20 shadow-md' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Header Image with Gradient */}
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={scenario.bgImage}
                  alt={scenario.destination}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                
                {/* Scenario Tag & Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-white/95 text-slate-900 shadow-sm">
                    {scenario.tag}
                  </span>
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border ${scenario.badgeColor} bg-white/90`}>
                    {scenario.badge}
                  </span>
                </div>

                {/* Destination & Duration Bottom overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between text-white">
                  <div>
                    <h3 className="font-bold text-lg leading-snug drop-shadow-sm">
                      {scenario.destination}
                    </h3>
                    <p className="text-xs text-slate-200">
                      {scenario.days} Days • {scenario.budget}
                    </p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-base mb-2">
                    {scenario.title}
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {scenario.subtitle}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-1.5 mb-5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Key Tailored Highlights
                    </span>
                    {scenario.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 mt-0.5 shrink-0" />
                        <span className="line-clamp-1">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action Button */}
                <button
                  onClick={() => loadScenario(scenario.id)}
                  className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-600/25'
                      : 'bg-slate-100 hover:bg-teal-50 text-slate-800 hover:text-teal-700 border border-slate-200 hover:border-teal-300'
                  }`}
                >
                  {getIcon(scenario.id)}
                  <span>{isActive ? 'Viewing Active Plan' : 'Explore This Itinerary'}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
