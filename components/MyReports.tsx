'use client';

import React, { useEffect, useState } from 'react';
import { PropertyReport } from '../types';
import { X, Clock, MapPin, Loader2, ChevronRight, Trash2, FileText } from 'lucide-react';

interface ReportSummary {
  id: string;
  address: string;
  postcode: string;
  created_at: string;
}

interface Props {
  userEmail: string;
  onClose: () => void;
  onLoadReport: (report: PropertyReport) => void;
}

export function MyReports({ userEmail, onClose, onLoadReport }: Props) {
  const [reports, setReports] = useState<ReportSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/get-reports?email=${encodeURIComponent(userEmail)}`)
      .then(r => r.json())
      .then(d => setReports(d.reports || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [userEmail]);

  const handleLoad = async (id: string) => {
    setLoadingId(id);
    try {
      const res = await fetch(`/api/get-report?id=${id}&email=${encodeURIComponent(userEmail)}`);
      const data = await res.json();
      if (data.report_data) {
        onLoadReport(data.report_data as PropertyReport);
        onClose();
      }
    } catch (err) {
      console.error('Failed to load report:', err);
    } finally {
      setLoadingId(null);
    }
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative bg-white w-full sm:max-w-lg sm:rounded-3xl flex flex-col overflow-hidden shadow-2xl"
           style={{ height: 'min(85vh, 600px)' }}>

        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-800 to-slate-900">
          <div className="bg-white/10 p-2 rounded-xl">
            <FileText className="text-white" size={18} />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-bold text-sm">My Saved Reports</h3>
            <p className="text-slate-400 text-xs">Your property search history</p>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <Loader2 size={24} className="animate-spin text-blue-500" />
            </div>
          ) : reports.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-slate-400 gap-3">
              <MapPin size={32} className="opacity-30" />
              <div className="text-center">
                <p className="font-semibold text-slate-600">No reports yet</p>
                <p className="text-sm mt-1">Your searches will be saved here automatically</p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {reports.map((r) => (
                <button
                  key={r.id}
                  onClick={() => handleLoad(r.id)}
                  disabled={loadingId === r.id}
                  className="w-full flex items-center gap-4 px-5 py-4 hover:bg-blue-50 transition-colors text-left group disabled:opacity-60"
                >
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                    {loadingId === r.id
                      ? <Loader2 size={18} className="animate-spin text-blue-500" />
                      : <MapPin size={18} className="text-blue-600" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 text-sm truncate">{r.address}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        {r.postcode}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock size={10} />
                        {formatDate(r.created_at)}
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-400 transition-colors shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50">
          <p className="text-[10px] text-slate-400 text-center uppercase tracking-wider font-medium">
            {reports.length} report{reports.length !== 1 ? 's' : ''} saved · Click any to reload
          </p>
        </div>
      </div>
    </div>
  );
}
