'use client';

import React, { useEffect, useState } from 'react';
import { Home, Loader2 } from 'lucide-react';

const messages = [
  'Analysing broadband infrastructure…',
  'Checking Ofsted school ratings…',
  'Reviewing crime statistics…',
  'Assessing flood risk data…',
  'Mapping local amenities…',
  'Gathering transport links…',
  'Consulting healthcare facilities…',
  'Compiling your area report…',
];

export function LoadingScreen() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % messages.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-24 px-4">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-12 max-w-sm w-full text-center">
        <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
          <Home className="text-white" size={28} />
        </div>
        <Loader2 size={32} className="animate-spin text-blue-600 mx-auto mb-4" />
        <h2 className="text-lg font-bold text-slate-900 mb-2">Generating your report</h2>
        <p className="text-sm text-slate-500 h-6 transition-all duration-500">{messages[msgIndex]}</p>
        <div className="mt-6 flex gap-1.5 justify-center">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
