import React from 'react';
import { 
  DollarSign, PieChart, Users, Hotel, Utensils, 
  Compass, Bus, HelpCircle, CheckCircle2, AlertCircle 
} from 'lucide-react';

export const BudgetOverview = ({ trip }) => {
  if (!trip || !trip.cost_breakdown) return null;

  const { accommodation, dining, activities, transit, misc, total, currency } = trip.cost_breakdown;
  const targetBudget = trip.budget_amount || total;
  const isOverBudget = total > targetBudget && targetBudget > 0;
  const percentageOfBudget = targetBudget > 0 ? Math.min(Math.round((total / targetBudget) * 100), 120) : 100;

  const perPersonCost = trip.group_size > 1 ? (total / trip.group_size).toFixed(2) : total;

  const categories = [
    { name: 'Accommodation', amount: accommodation, icon: Hotel, color: 'bg-purple-500', lightColor: 'bg-purple-50 text-purple-700' },
    { name: 'Dining & Food', amount: dining, icon: Utensils, color: 'bg-amber-500', lightColor: 'bg-amber-50 text-amber-700' },
    { name: 'Activities & Tours', amount: activities, icon: Compass, color: 'bg-teal-500', lightColor: 'bg-teal-50 text-teal-700' },
    { name: 'Transportation', amount: transit, icon: Bus, color: 'bg-blue-500', lightColor: 'bg-blue-50 text-blue-700' },
    { name: 'Misc & Buffer', amount: misc, icon: HelpCircle, color: 'bg-slate-500', lightColor: 'bg-slate-100 text-slate-700' },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <div className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full mb-1">
            <PieChart className="w-3.5 h-3.5" />
            Live Budget & Cost Optimizer
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Trip Expense Breakdown
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Estimated costs based on {trip.group_size} {trip.group_size === 1 ? 'traveler' : 'travelers'} for {trip.total_days} days.
          </p>
        </div>

        {/* Per-Person vs Total Highlight */}
        <div className="flex items-center gap-3">
          {trip.group_size > 1 && (
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-right">
              <span className="text-[11px] font-semibold text-slate-400 block uppercase">Per Person</span>
              <span className="text-xl font-extrabold text-indigo-700">
                ${perPersonCost}
              </span>
            </div>
          )}
          <div className="p-3 bg-teal-50/70 rounded-2xl border border-teal-200 text-right">
            <span className="text-[11px] font-semibold text-teal-700 block uppercase">Total Trip Est.</span>
            <span className="text-2xl font-extrabold text-teal-900">
              ${total.toLocaleString()} {currency}
            </span>
          </div>
        </div>
      </div>

      {/* Target Budget Progress Bar */}
      <div className="py-6 border-b border-slate-100">
        <div className="flex justify-between items-center text-xs font-semibold mb-2">
          <div className="flex items-center gap-1.5 text-slate-700">
            <span>Budget Utilization:</span>
            <span className={`px-2 py-0.5 rounded-md ${isOverBudget ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}`}>
              {percentageOfBudget}% of Target (${targetBudget.toLocaleString()})
            </span>
          </div>
          <span className="text-slate-500 font-medium">
            {isOverBudget ? `+$${(total - targetBudget).toFixed(0)} over target` : `$${(targetBudget - total).toFixed(0)} remaining under target`}
          </span>
        </div>

        {/* Progress bar container */}
        <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden flex">
          {categories.map((cat, idx) => {
            const widthPct = total > 0 ? (cat.amount / total) * 100 : 0;
            return (
              <div 
                key={idx}
                style={{ width: `${widthPct}%` }}
                className={`${cat.color} transition-all duration-500`}
                title={`${cat.name}: $${cat.amount}`}
              />
            );
          })}
        </div>
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-6 mb-6">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          const share = total > 0 ? Math.round((cat.amount / total) * 100) : 0;

          return (
            <div 
              key={idx}
              className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 hover:shadow-xs transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${cat.lightColor}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-slate-400">
                  {share}%
                </span>
              </div>
              <h5 className="text-xs font-semibold text-slate-600 truncate">
                {cat.name}
              </h5>
              <p className="text-base font-extrabold text-slate-900 mt-0.5">
                ${cat.amount.toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>

      {/* Smart Group & Solo Cost Tips */}
      <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200/60 flex items-start gap-3 text-xs text-teal-950">
        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-teal-900">
            {trip.trip_type === 'group' 
              ? 'Group Splitting Tip: Centralize Shared Expenses'
              : trip.trip_type === 'couple'
              ? 'Couple Optimization: Romantic Experience Allocation'
              : 'Solo Traveler Optimization: High Efficiency Spending'}
          </p>
          <p className="text-teal-800 leading-relaxed">
            {trip.trip_type === 'group'
              ? 'Accommodations and private van rentals yield dramatic per-person savings when booked together for 4+ people. Use shared digital ledgers like Splitwise to settle meals smoothly.'
              : trip.trip_type === 'couple'
              ? 'Invest in 1-2 hero experiences (like private boat charters or sunset terrace tasting menus) and keep morning breakfasts and scenic walks light and relaxed.'
              : 'Solo dining booths and 72-hour unlimited metro passes eliminate tipping and expensive transit fares, keeping everyday costs predictable.'}
          </p>
        </div>
      </div>

    </div>
  );
};
