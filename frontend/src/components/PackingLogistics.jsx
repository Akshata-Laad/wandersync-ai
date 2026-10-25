import React, { useState } from 'react';
import { 
  CloudSun, CheckSquare, Square, Luggage, Shield, 
  PhoneCall, AlertCircle, Info, Sparkles 
} from 'lucide-react';

export const PackingLogistics = ({ trip }) => {
  if (!trip || !trip.logistics) return null;

  const { weather_summary, recommended_clothing, essential_items, local_customs_and_tips, emergency_numbers } = trip.logistics;

  // Local state for interactive checkboxes
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (key) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      
      {/* Weather Forecast Card */}
      <div className="bg-gradient-to-r from-sky-500 via-teal-500 to-emerald-500 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <CloudSun className="w-5 h-5 text-amber-200" />
            <span className="text-xs font-bold uppercase tracking-wider text-sky-100">
              Climate & Seasonal Advisory
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold mb-2">
            Destination Weather for {trip.destination}
          </h3>
          <p className="text-sm sm:text-base text-white/95 leading-relaxed font-medium">
            {weather_summary}
          </p>
        </div>
        <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Packing Checklist */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-4">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Luggage className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base">
                Interactive Packing Checklist
              </h4>
              <p className="text-xs text-slate-500">Tap items as you pack your bags</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Recommended Clothing */}
            <div>
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Recommended Apparel & Layers
              </h5>
              <div className="space-y-2">
                {recommended_clothing?.map((item, idx) => {
                  const key = `cloth-${idx}`;
                  const isChecked = !!checkedItems[key];
                  return (
                    <div
                      key={key}
                      onClick={() => toggleCheck(key)}
                      className={`flex items-start gap-2.5 p-2 rounded-xl text-xs cursor-pointer transition-all ${
                        isChecked 
                          ? 'bg-slate-50 text-slate-400 line-through' 
                          : 'bg-white hover:bg-teal-50/50 text-slate-700'
                      }`}
                    >
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                      )}
                      <span>{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Essential Items */}
            <div className="pt-2 border-t border-slate-100">
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Essential Gear & Documentation
              </h5>
              <div className="space-y-2">
                {essential_items?.map((item, idx) => {
                  const key = `ess-${idx}`;
                  const isChecked = !!checkedItems[key];
                  return (
                    <div
                      key={key}
                      onClick={() => toggleCheck(key)}
                      className={`flex items-start gap-2.5 p-2 rounded-xl text-xs cursor-pointer transition-all ${
                        isChecked 
                          ? 'bg-slate-50 text-slate-400 line-through' 
                          : 'bg-white hover:bg-teal-50/50 text-slate-700'
                      }`}
                    >
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                      )}
                      <span>{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Customs, Tips & Emergency Logistics */}
        <div className="space-y-6">
          
          {/* Local Customs & Etiquette */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-4">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">
                  Local Customs & Etiquette
                </h4>
                <p className="text-xs text-slate-500">Culture, tipping & navigation tips</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {local_customs_and_tips?.map((tip, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Contacts */}
          {emergency_numbers && Object.keys(emergency_numbers).length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-4">
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">
                    Emergency & Assistance Contacts
                  </h4>
                  <p className="text-xs text-slate-500">Quick emergency phone reference</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {Object.entries(emergency_numbers).map(([name, num], idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-rose-50/50 border border-rose-100">
                    <span className="text-[11px] font-semibold text-rose-800 block">{name}</span>
                    <span className="text-base font-extrabold text-rose-950 font-mono">{num}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
