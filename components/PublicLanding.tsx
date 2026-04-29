'use client';

import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../services/firebase';
import App from './App';
import { AuthScreen } from './AuthScreen';
import {
  Search, Home, MapPin, ShieldCheck, Wifi, GraduationCap,
  ShieldAlert, Droplets, Bus, Loader2, ChevronRight, Star,
  CheckCircle2, ArrowRight, Phone, Mail, Sparkles, Lock,
  BarChart2, Info, Users, Building2
} from 'lucide-react';

// ─── Teaser report type (partial) ────────────────────────────────────────────
interface TeaserReport {
  address: string;
  postcode: string;
  summary: string;
  broadband: { maxSpeed: string; fiberAvailable: boolean; providers: string[] };
  crime: { level: string };
  floodRisk: { riskLevel: string };
  schools: { name: string; ofstedRating: string }[];
}

// ─── HSR branded strip ────────────────────────────────────────────────────────
function HSRStrip() {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white py-3 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <Building2 size={16} className="text-blue-400 shrink-0" />
          <p className="text-xs font-medium text-slate-300">
            <span className="text-white font-bold">Powered by Home Sales Ready</span> — the UK's premier property platform for home owners
          </p>
        </div>
        <a
          href="https://homesalesready.com"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-1.5 bg-blue-500 hover:bg-blue-400 text-white text-xs font-bold px-4 py-1.5 rounded-full transition-colors"
        >
          Home Sales Ready <ChevronRight size={12} />
        </a>
      </div>
    </div>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className={`flex items-center gap-3 bg-white rounded-2xl p-4 shadow-sm border border-slate-100`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-400 font-medium">{label}</p>
        <p className="font-bold text-slate-900 text-sm">{value}</p>
      </div>
    </div>
  );
}

// ─── Teaser report card ───────────────────────────────────────────────────────
function TeaserCard({ report }: { report: TeaserReport }) {
  return (
    <div className="relative">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Address bar */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5">
          <div className="flex items-center gap-2 mb-1">
            <MapPin size={16} className="text-blue-200" />
            <p className="text-blue-100 text-xs font-bold uppercase tracking-wider">Area Report</p>
          </div>
          <h3 className="text-white font-black text-lg leading-tight">{report.address}</h3>
          <span className="inline-block mt-1 bg-white/20 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
            {report.postcode}
          </span>
        </div>

        {/* Summary */}
        <div className="px-6 py-4 border-b border-slate-50">
          <p className="text-sm text-slate-600 leading-relaxed">{report.summary}</p>
        </div>

        {/* Key stats grid */}
        <div className="p-4 grid grid-cols-2 gap-3">
          <StatCard
            icon={<Wifi size={18} className="text-blue-600" />}
            label="Max Broadband"
            value={report.broadband.maxSpeed}
            color="bg-blue-50"
          />
          <StatCard
            icon={<ShieldAlert size={18} className="text-emerald-600" />}
            label="Crime Level"
            value={report.crime.level}
            color="bg-emerald-50"
          />
          <StatCard
            icon={<Droplets size={18} className="text-sky-600" />}
            label="Flood Risk"
            value={report.floodRisk.riskLevel}
            color="bg-sky-50"
          />
          <StatCard
            icon={<GraduationCap size={18} className="text-purple-600" />}
            label="Nearest School"
            value={report.schools[0]?.ofstedRating || 'See full report'}
            color="bg-purple-50"
          />
        </div>

        {/* Blur / paywall overlay */}
        <div className="relative">
          {/* Blurred preview of more content */}
          <div className="px-6 py-4 filter blur-sm select-none pointer-events-none opacity-60">
            <div className="flex items-center gap-2 mb-3">
              <Bus size={16} className="text-slate-400" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Transport Links</span>
            </div>
            <div className="space-y-2">
              {['Train Station — 0.4 miles', 'Bus Stop — 0.1 miles', 'Motorway Access — 2.1 miles'].map(t => (
                <div key={t} className="flex justify-between py-1.5 border-b border-slate-50 text-sm">
                  <span className="text-slate-700">{t.split('—')[0]}</span>
                  <span className="text-slate-400 font-medium">{t.split('—')[1]}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-4 mb-3">
              <ShieldCheck size={16} className="text-slate-400" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Healthcare</span>
            </div>
            <div className="space-y-2">
              {['GP Surgery', 'Dentist', 'Hospital'].map(h => (
                <div key={h} className="flex justify-between py-1.5 border-b border-slate-50 text-sm">
                  <span className="text-slate-700">{h}</span>
                  <span className="text-slate-400">—</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lock overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-white via-white/90 to-transparent">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5 mx-6 text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Lock size={22} className="text-blue-600" />
              </div>
              <p className="font-black text-slate-900 text-sm mb-1">Full report locked</p>
              <p className="text-xs text-slate-500 mb-3">Transport, healthcare, schools, gyms + deep AI analysis</p>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('show-auth'))}
                className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                Sign up free — unlock full report <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main public landing page ─────────────────────────────────────────────────
export default function PublicLanding() {
  const [user, setUser] = useState<User | null>(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [address, setAddress] = useState('');
  const [teaserLoading, setTeaserLoading] = useState(false);
  const [teaserReport, setTeaserReport] = useState<TeaserReport | null>(null);
  const [teaserError, setTeaserError] = useState('');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u && u.emailVerified ? u : null);
      setAuthChecking(false);
    });
    // Listen for auth trigger from teaser card
    const handler = () => setShowAuth(true);
    window.addEventListener('show-auth', handler);
    return () => { unsub(); window.removeEventListener('show-auth', handler); };
  }, []);

  const handleTeaserSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;
    setTeaserLoading(true);
    setTeaserError('');
    setTeaserReport(null);
    try {
      const res = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      });
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setTeaserReport(data);
    } catch {
      setTeaserError('Could not generate report. Please check the address and try again.');
    } finally {
      setTeaserLoading(false);
    }
  };

  // Loading spinner
  if (authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  // Signed-in users go straight to the full app
  if (user) return <App />;

  // Auth overlay
  if (showAuth) return <AuthScreen onBack={() => setShowAuth(false)} />;

  // ── Public landing page ───────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* HSR top bar */}
      <HSRStrip />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Home className="text-white" size={20} />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">
              Home<span className="text-blue-600">Notes</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAuth(true)}
              className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => setShowAuth(true)}
              className="bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-1.5"
            >
              Get Started <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </header>

      <main>

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white pt-16 pb-20 px-4">
          {/* Blobs */}
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-200/30 blur-3xl rounded-full" />
            <div className="absolute top-20 right-0 w-96 h-96 bg-indigo-200/25 blur-3xl rounded-full" />
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Left — copy + search */}
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full text-xs font-bold text-blue-700 mb-6 uppercase tracking-wider">
                  <Sparkles size={12} /> AI-Powered · Free · Instant
                </div>

                <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight mb-6">
                  Know your area{' '}
                  <span className="text-blue-600">before you move.</span>
                </h1>

                <p className="text-xl text-slate-500 leading-relaxed mb-8 max-w-lg">
                  Enter any UK address and get an instant AI report on broadband, schools,
                  crime, flood risk, transport and more — <strong className="text-slate-700">completely free.</strong>
                </p>

                {/* Key benefits */}
                <ul className="space-y-2.5 mb-10">
                  {[
                    'Broadband speeds & fibre availability',
                    'Ofsted school ratings near the property',
                    'Crime levels & flood risk assessment',
                    'Transport links, healthcare & gyms',
                    'Side-by-side property comparisons',
                    'Deep AI investment analysis',
                  ].map(b => (
                    <li key={b} className="flex items-center gap-2.5 text-sm text-slate-600 font-medium">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Search bar */}
                <form onSubmit={handleTeaserSearch} className="relative group max-w-xl">
                  <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <Search size={20} />
                  </div>
                  <input
                    type="text"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="Enter a UK address and postcode…"
                    className="w-full pl-13 pr-36 py-4 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none text-base transition-all shadow-xl bg-white placeholder:text-slate-400"
                    style={{ paddingLeft: '3rem' }}
                  />
                  <button
                    type="submit"
                    disabled={teaserLoading}
                    className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-6 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95 disabled:opacity-60 flex items-center gap-2 text-sm"
                  >
                    {teaserLoading ? <Loader2 size={16} className="animate-spin" /> : null}
                    {teaserLoading ? 'Analysing…' : 'Analyse'}
                  </button>
                </form>

                {teaserError && (
                  <p className="mt-3 text-sm text-red-600 flex items-center gap-1.5">
                    <Info size={13} /> {teaserError}
                  </p>
                )}

                <p className="mt-3 text-xs text-slate-400 flex items-center gap-1.5">
                  <Info size={11} />
                  Reports are AI-generated. Always verify independently before any property decision.
                </p>
              </div>

              {/* Right — teaser report or placeholder */}
              <div className="lg:block">
                {teaserLoading && (
                  <div className="bg-white rounded-3xl shadow-xl border border-slate-100 h-80 flex flex-col items-center justify-center gap-4">
                    <Loader2 size={32} className="animate-spin text-blue-500" />
                    <p className="text-slate-500 font-medium text-sm">Generating your area report…</p>
                    <div className="flex gap-1.5">
                      {[0,1,2].map(i => (
                        <div key={i} className="w-2 h-2 bg-blue-300 rounded-full animate-bounce"
                             style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                  </div>
                )}

                {teaserReport && !teaserLoading && (
                  <TeaserCard report={teaserReport} />
                )}

                {!teaserReport && !teaserLoading && (
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-white/20 p-2.5 rounded-xl">
                        <BarChart2 size={22} />
                      </div>
                      <div>
                        <p className="font-black text-lg">Your report includes</p>
                        <p className="text-blue-200 text-sm">Everything you need to decide</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { icon: <Wifi size={16} />, label: 'Broadband & Fibre' },
                        { icon: <GraduationCap size={16} />, label: 'School Ratings' },
                        { icon: <ShieldAlert size={16} />, label: 'Crime Statistics' },
                        { icon: <Droplets size={16} />, label: 'Flood Risk' },
                        { icon: <Bus size={16} />, label: 'Transport Links' },
                        { icon: <Sparkles size={16} />, label: 'AI Deep Analysis' },
                      ].map(({ icon, label }) => (
                        <div key={label} className="flex items-center gap-2.5 bg-white/10 rounded-xl px-3 py-2.5">
                          <span className="text-blue-200">{icon}</span>
                          <span className="text-sm font-semibold">{label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-5 border-t border-white/20">
                      <p className="text-blue-100 text-sm font-medium text-center">
                        
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── HSR CTA STRIP ─────────────────────────────────────────────────── */}
        <section className="bg-gradient-to-r from-blue-950 to-slate-900 py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                  <Building2 size={11} /> Powered by Home Sales Ready
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                  Ready to take the next step?
                </h2>
                <p className="text-slate-400 text-base max-w-md">
                  Home Notes is brought to you by <strong className="text-white">Home Sales Ready</strong>.
                  Our experts are on hand to help you act on what you&apos;ve discovered.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <a
                  href="https://homesalesready.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
                >
                  <Building2 size={16} /> Home Sales Ready
                </a>
                <a
                  href="https://wa.me/447724601320?text=Hi Home Sales Ready, I just used Home Notes and would like to find out more"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
                >
                  <Phone size={16} /> Speak to an Expert
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">How it works</h2>
            <p className="text-slate-500 mb-12 max-w-xl mx-auto">Three steps to knowing everything about your next neighbourhood</p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', icon: <Search size={24} />, title: 'Enter any UK address', desc: 'Just type the full address and postcode of any property you\'re interested in.' },
                { step: '02', icon: <Sparkles size={24} />, title: 'Get your instant report', desc: 'Our AI analyses broadband, schools, crime, flood risk, transport and more in seconds.' },
                { step: '03', icon: <CheckCircle2 size={24} />, title: 'Make confident decisions', desc: 'Save reports, compare properties side by side, and get deep professional analysis.' },
              ].map(({ step, icon, title, desc }) => (
                <div key={step} className="relative">
                  <div className="text-6xl font-black text-slate-100 mb-4 leading-none">{step}</div>
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-4 -mt-6">
                    {icon}
                  </div>
                  <h3 className="font-black text-slate-900 mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SOCIAL PROOF ──────────────────────────────────────────────────── */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { stat: '2,500+', label: 'Users getting AI property insights', icon: <Users size={20} /> },
                { stat: '16 cities', label: 'Coverage across England', icon: <MapPin size={20} /> },
                { stat: 'Free', label: 'No subscription required', icon: <Star size={20} /> },
              ].map(({ stat, label, icon }) => (
                <div key={stat} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mx-auto mb-4">
                    {icon}
                  </div>
                  <p className="text-3xl font-black text-slate-900 mb-1">{stat}</p>
                  <p className="text-sm text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Ready to know your area?
            </h2>
            <p className="text-slate-500 mb-8 text-lg">
              Join thousands of buyers and renters who use Home Notes to make smarter property decisions.
            </p>
            <button
              onClick={() => setShowAuth(true)}
              className="inline-flex items-center gap-2 bg-blue-600 text-white text-lg font-bold px-8 py-4 rounded-2xl hover:bg-blue-700 transition-colors shadow-xl shadow-blue-200 active:scale-95"
            >
              Get your free report <ArrowRight size={18} />
            </button>
            <p className="mt-4 text-xs text-slate-400">
              Free forever · No credit card · Powered by Home Sales Ready
            </p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 px-4 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1 rounded-lg"><Home className="text-white" size={14} /></div>
            <span className="font-bold text-white text-sm">HomeNotes</span>
            <span className="text-slate-600 text-xs ml-2">by Home Sales Ready · Powered by Claude AI</span>
          </div>
          <div className="flex items-center gap-5 text-xs">
            <a href="https://homesalesready.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Home Sales Ready</a>
            <a href="https://wa.me/447724601320" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp</a>
            <button onClick={() => setShowAuth(true)} className="hover:text-white transition-colors">Sign In</button>
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="/cookies" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
          <p className="text-[10px] text-slate-600 text-center">
            © 2026 Kadima Systems Ltd · Reports are AI-generated. Verify independently.
          </p>
        </div>
      </footer>
    </div>
  );
}
