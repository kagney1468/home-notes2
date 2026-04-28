'use client';

import React, { useState, useEffect } from 'react';
import { PropertyReport } from '../types';
import { fetchDeepAnalysisStream } from '../services/aiService';
import {
  Wifi, ShoppingBag, GraduationCap, ShieldAlert, Bus, HeartPulse, Dumbbell,
  Droplets, ArrowLeft, Search, GitCompare, Sparkles, CheckCircle, XCircle,
  ChevronRight, Loader2, Volume2, VolumeX
} from 'lucide-react';

interface Props {
  report: PropertyReport;
  secondReport: PropertyReport | null;
  onNewSearch: () => void;
  onCompare: (address: string) => void;
  isComparing: boolean;
}

const riskColor = (level: string) => {
  const l = level.toLowerCase();
  if (l.includes('very low') || l.includes('low')) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
  if (l.includes('medium')) return 'text-amber-600 bg-amber-50 border-amber-200';
  return 'text-red-600 bg-red-50 border-red-200';
};

const ofstedColor = (rating: string) => {
  const r = rating.toLowerCase();
  if (r.includes('outstanding')) return 'text-emerald-700 bg-emerald-50';
  if (r.includes('good')) return 'text-blue-700 bg-blue-50';
  if (r.includes('requires') || r.includes('improvement')) return 'text-amber-700 bg-amber-50';
  if (r.includes('inadequate')) return 'text-red-700 bg-red-50';
  return 'text-slate-600 bg-slate-50';
};

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-50">
        <div className="text-blue-600">{icon}</div>
        <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function ReportColumn({ report }: { report: PropertyReport }) {
  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
        <p className="text-sm font-bold text-blue-100 uppercase tracking-wider mb-1">Area Summary</p>
        <p className="text-white leading-relaxed">{report.summary}</p>
      </div>

      {/* Broadband */}
      <Section icon={<Wifi size={18} />} title="Broadband">
        <div className="grid grid-cols-2 gap-3 mb-3">
          {[
            { label: 'Max Download', value: report.broadband.maxSpeed },
            { label: 'Max Upload', value: report.broadband.uploadSpeed },
            { label: 'Latency', value: report.broadband.latency },
            { label: 'Fibre', value: report.broadband.fiberAvailable ? 'Available' : 'Not Available' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-slate-50 rounded-xl p-3">
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{label}</p>
              <p className="font-bold text-slate-900 text-sm mt-0.5">{value}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {report.broadband.providers.map((p) => (
            <span key={p} className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full">{p}</span>
          ))}
        </div>
        {report.broadband.description && (
          <p className="text-xs text-slate-500 mt-3 leading-relaxed">{report.broadband.description}</p>
        )}
      </Section>

      {/* Crime */}
      <Section icon={<ShieldAlert size={18} />} title="Crime">
        <div className={`inline-flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-full border mb-3 ${riskColor(report.crime.level)}`}>
          <ShieldAlert size={14} />
          {report.crime.level} Crime Area
        </div>
        <p className="text-sm text-slate-600 mb-3">{report.crime.recentStats}</p>
        <div className="flex flex-wrap gap-1.5">
          {report.crime.commonTypes.map((t) => (
            <span key={t} className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-full font-medium">{t}</span>
          ))}
        </div>
      </Section>

      {/* Flood Risk */}
      <Section icon={<Droplets size={18} />} title="Flood Risk">
        <div className={`inline-flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-full border mb-3 ${riskColor(report.floodRisk.riskLevel)}`}>
          <Droplets size={14} />
          {report.floodRisk.riskLevel} Risk
        </div>
        <p className="text-sm text-slate-600">{report.floodRisk.details}</p>
      </Section>

      {/* Schools */}
      {report.schools?.length > 0 && (
        <Section icon={<GraduationCap size={18} />} title="Schools">
          <div className="space-y-2.5">
            {report.schools.map((s, i) => (
              <div key={i} className="flex items-start justify-between gap-3 p-3 bg-slate-50 rounded-xl">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-slate-900 truncate">{s.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{s.type} · {s.distance}</p>
                </div>
                <span className={`shrink-0 text-xs font-bold px-2 py-0.5 rounded-full ${ofstedColor(s.ofstedRating)}`}>
                  {s.ofstedRating}
                </span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Shops */}
      {report.shops?.length > 0 && (
        <Section icon={<ShoppingBag size={18} />} title="Local Shops">
          <div className="space-y-2">
            {report.shops.map((s, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{s.name}</p>
                  <p className="text-xs text-slate-400">{s.type}</p>
                </div>
                <span className="text-xs font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">{s.distance}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Transport */}
      {report.transport?.length > 0 && (
        <Section icon={<Bus size={18} />} title="Transport">
          <div className="space-y-2">
            {report.transport.map((t, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.type}</p>
                </div>
                <span className="text-xs font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">{t.distance}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Healthcare */}
      {report.healthcare?.length > 0 && (
        <Section icon={<HeartPulse size={18} />} title="Healthcare">
          <div className="space-y-2">
            {report.healthcare.map((h, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{h.name}</p>
                  <p className="text-xs text-slate-400">{h.type}</p>
                </div>
                <span className="text-xs font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">{h.distance}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Gyms */}
      {report.gyms?.length > 0 && (
        <Section icon={<Dumbbell size={18} />} title="Gyms & Leisure">
          <div className="space-y-2">
            {report.gyms.map((g, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{g.name}</p>
                  <p className="text-xs text-slate-400">{g.type}</p>
                </div>
                <span className="text-xs font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">{g.distance}</span>
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

export function ReportDashboard({ report, secondReport, onNewSearch, onCompare, isComparing }: Props) {
  const [compareAddress, setCompareAddress] = useState('');
  const [showCompareInput, setShowCompareInput] = useState(false);
  const [deepAnalysis, setDeepAnalysis] = useState('');
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisStarted, setAnalysisStarted] = useState(false);

  const runDeepAnalysis = async () => {
    if (analysisStarted) return;
    setAnalysisStarted(true);
    setAnalysisLoading(true);
    setDeepAnalysis('');
    try {
      for await (const chunk of fetchDeepAnalysisStream(report)) {
        setDeepAnalysis((prev) => prev + chunk);
      }
    } finally {
      setAnalysisLoading(false);
    }
  };

  // Simple markdown-to-JSX renderer for the analysis
  const renderMarkdown = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) return <h3 key={i} className="text-base font-bold text-slate-900 mt-5 mb-2 first:mt-0">{line.slice(3)}</h3>;
      if (line.startsWith('# ')) return <h2 key={i} className="text-lg font-bold text-slate-900 mt-5 mb-2 first:mt-0">{line.slice(2)}</h2>;
      if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="font-bold text-slate-800 text-sm">{line.slice(2, -2)}</p>;
      if (line.trim() === '') return <div key={i} className="h-2" />;
      return <p key={i} className="text-sm text-slate-600 leading-relaxed">{line}</p>;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <button onClick={onNewSearch} className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-slate-900 mb-2 transition-colors">
            <ArrowLeft size={16} /> New Search
          </button>
          <h2 className="text-2xl font-black text-slate-900">{report.address}</h2>
          <p className="text-slate-500 text-sm">{report.postcode}</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Deep Analysis button */}
          {!analysisStarted && (
            <button
              onClick={runDeepAnalysis}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors"
            >
              <Sparkles size={16} />
              Deep Analysis
            </button>
          )}

          {/* Compare button */}
          {!secondReport && (
            <button
              onClick={() => setShowCompareInput((v) => !v)}
              className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors"
            >
              <GitCompare size={16} />
              Compare
            </button>
          )}
        </div>
      </div>

      {/* Compare input */}
      {showCompareInput && !secondReport && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-6 shadow-sm">
          <p className="text-sm font-bold text-slate-700 mb-3">Enter address to compare</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onCompare(compareAddress);
            }}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={compareAddress}
                onChange={(e) => setCompareAddress(e.target.value)}
                placeholder="Enter UK address and postcode…"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-50 outline-none text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={isComparing || !compareAddress.trim()}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-60"
            >
              {isComparing ? <Loader2 size={14} className="animate-spin" /> : <ChevronRight size={16} />}
              {isComparing ? 'Loading…' : 'Compare'}
            </button>
          </form>
        </div>
      )}

      {/* Deep Analysis panel */}
      {analysisStarted && (
        <div className="bg-white border border-indigo-100 rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={18} className="text-indigo-600" />
            <h3 className="font-bold text-slate-900">Professional Deep Analysis</h3>
            {analysisLoading && <Loader2 size={14} className="animate-spin text-indigo-500 ml-auto" />}
          </div>
          <div className="prose prose-sm max-w-none">
            {deepAnalysis ? renderMarkdown(deepAnalysis) : (
              <div className="flex gap-1">
                {[0,1,2].map(i => (
                  <div key={i} className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce"
                       style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Report columns */}
      {secondReport ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="bg-blue-600 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-t-xl inline-block">
              Property A
            </div>
            <div className="bg-blue-50 rounded-b-2xl rounded-tr-2xl p-4 -mt-0">
              <p className="text-sm font-semibold text-blue-900 mb-4">{report.address}</p>
              <ReportColumn report={report} />
            </div>
          </div>
          <div>
            <div className="bg-slate-800 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-t-xl inline-block">
              Property B
            </div>
            <div className="bg-slate-50 rounded-b-2xl rounded-tr-2xl p-4">
              <p className="text-sm font-semibold text-slate-900 mb-4">{secondReport.address}</p>
              <ReportColumn report={secondReport} />
            </div>
          </div>
        </div>
      ) : (
        <ReportColumn report={report} />
      )}
    </div>
  );
}
