import React, { useState } from 'react';
import { 
  X, Copy, Check, Share2, Download, Printer, 
  Users, Mail, CheckCircle2, FileText 
} from 'lucide-react';

export const ShareModal = ({ trip, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [invitedMembers, setInvitedMembers] = useState([
    { email: 'alex@example.com', role: 'Editor', status: 'Accepted' },
    { email: 'sarah@example.com', role: 'Viewer', status: 'Pending' }
  ]);

  if (!isOpen || !trip) return null;

  const shareUrl = `${window.location.origin}/?share=${trip.share_token}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleInvite = (e) => {
    e.preventDefault();
    if (!inviteEmail) return;
    setInvitedMembers([...invitedMembers, { email: inviteEmail, role: 'Editor', status: 'Invited' }]);
    setInviteEmail('');
  };

  const handleExportMarkdown = () => {
    let md = `# ${trip.title}\n`;
    md += `**Destination:** ${trip.destination}\n`;
    md += `**Dates:** ${trip.start_date} to ${trip.end_date} (${trip.total_days} days)\n`;
    md += `**Trip Type:** ${trip.trip_type} (Party size: ${trip.group_size})\n`;
    md += `**Total Estimated Cost:** $${trip.cost_breakdown?.total || 0} USD\n\n`;
    md += `## Overview\n${trip.overview}\n\n`;

    trip.days.forEach(day => {
      md += `### Day ${day.day_number}: ${day.title}\n`;
      md += `*Theme:* ${day.theme}\n`;
      md += `*Highlight:* ${day.highlight}\n`;
      md += `*Transit Advice:* ${day.transit_advice}\n\n`;

      day.activities.forEach(act => {
        md += `- **[${act.time_slot} | ${act.time}] ${act.title}** (${act.category})\n`;
        md += `  ${act.description}\n`;
        md += `  *Location:* ${act.location} | *Cost:* $${act.estimated_cost} | *Duration:* ${act.duration_hours}h\n`;
        if (act.tips) md += `  *Tip:* ${act.tips}\n`;
      });
      md += `\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${trip.destination.replace(/[^a-zA-Z0-9]/g, '_')}_itinerary.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-teal-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-teal-400" />
            <h3 className="font-bold text-lg">Share & Collaborate</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Share Link */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Shareable Itinerary Link
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono bg-slate-50 text-slate-700 select-all focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition-colors shrink-0 shadow-sm"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              Anyone with this link can view the day-by-day plan, budget breakdown, and map.
            </p>
          </div>

          {/* Group Trip Collaboration (Scenario 3 Focus) */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-indigo-600" />
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                Group Trip Collaboration
              </h4>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              Coordinate travel dates, activities, and budget with your travel companions.
            </p>

            <form onSubmit={handleInvite} className="flex gap-2 mb-3">
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="companion@email.com"
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold"
              >
                Invite
              </button>
            </form>

            {/* Invited list */}
            <div className="space-y-1.5">
              {invitedMembers.map((m, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-white border border-slate-100">
                  <span className="font-medium text-slate-700">{m.email}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400">{m.role}</span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                      {m.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Export Options */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              onClick={handleExportMarkdown}
              className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
            >
              <FileText className="w-4 h-4 text-slate-500" />
              <span>Export Markdown</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>Print / PDF</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
