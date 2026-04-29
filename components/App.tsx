'use client';

import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '../services/firebase';
import { AppState, PropertyReport } from '../types';
import { fetchPropertyReport } from '../services/aiService';
import { LoadingScreen } from './LoadingScreen';
import { ReportDashboard } from './ReportDashboard';
import { ProfessionalInsightsAgent } from './ProfessionalInsightsAgent';
import { AuthScreen } from './AuthScreen';
import { MyReports } from './MyReports';
import {
  Search, Home, Mail, ArrowRight, CheckCircle2, Globe,
  MessageCircle, Briefcase, LogOut, Loader2, Sparkles,
  AlertCircle, ShieldCheck, Info, History
} from 'lucide-react';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState<AppState>(AppState.IDLE);
  const [report, setReport] = useState<PropertyReport | null>(null);
  const [secondReport, setSecondReport] = useState<PropertyReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isComparing, setIsComparing] = useState(false);
  const [showProfessionalAgent, setShowProfessionalAgent] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showMyReports, setShowMyReports] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setAuthChecking(false);
    });
    return () => unsubscribe();
  }, []);

  // Auto-save report to Supabase whenever a new report is generated
  const saveReport = async (rep: PropertyReport, userEmail: string) => {
    try {
      await fetch('/api/save-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_email: userEmail,
          address: rep.address,
          postcode: rep.postcode || '',
          report_data: rep,
        }),
      });
    } catch (err) {
      console.error('Failed to save report:', err);
      // Non-fatal — don't interrupt the user
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;
    setStatus(AppState.LOADING);
    setError(null);
    try {
      const data = await fetchPropertyReport(address);
      setReport(data);
      setSecondReport(null);
      setStatus(AppState.REPORT);
      // Save to Supabase in the background
      if (currentUser?.email) {
        saveReport(data, currentUser.email);
      }
    } catch (err: unknown) {
      setError((err as Error).message || 'An unexpected error occurred.');
      setStatus(AppState.ERROR);
    }
  };

  const handleCompare = async (targetAddress: string) => {
    if (!targetAddress.trim()) return;
    setIsComparing(true);
    try {
      const data = await fetchPropertyReport(targetAddress);
      setSecondReport(data);
      setStatus(AppState.COMPARING);
      // Save comparison report too
      if (currentUser?.email) {
        saveReport(data, currentUser.email);
      }
    } catch (err: unknown) {
      alert('Could not fetch comparison address: ' + (err as Error).message);
    } finally {
      setIsComparing(false);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    } catch (err) {
      console.error('Subscribe error:', err);
    }
    setSubscribed(true);
    setTimeout(() => { setSubscribed(false); setEmail(''); }, 5000);
  };

  const handleReset = () => {
    setStatus(AppState.IDLE);
    setAddress('');
    setReport(null);
    setSecondReport(null);
    setError(null);
  };

  const handleLogout = async () => {
    try { await signOut(auth); handleReset(); } catch (err) { console.error('Sign out error:', err); }
  };

  // Load a saved report from history
  const handleLoadSavedReport = (rep: PropertyReport) => {
    setReport(rep);
    setSecondReport(null);
    setStatus(AppState.REPORT);
  };

  const coverageAreas = [
    'Bournemouth', 'Poole', 'Christchurch', 'Dorchester',
    'London', 'Birmingham', 'Manchester', 'Leeds',
    'Liverpool', 'Bristol', 'Sheffield', 'Newcastle',
    'Nottingham', 'Leicester', 'Coventry', 'Southampton',
  ];

  const whatsappNumber = '447724601320';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi Home Sales Ready, I have a question about my Home Notes property report.`;

  if (authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  if (!currentUser) return <AuthScreen />;

  return (
    <div className="min-h-screen flex flex-col text-slate-900">

      {/* ── HEADER ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={handleReset}>
            <div className="bg-blue-600 p-1.5 rounded-lg group-hover:scale-110 transition-transform">
              <Home className="text-white" size={20} />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">
              Home<span className="text-blue-600">Notes</span>
            </span>
          </div>
          <nav className="flex items-center gap-3 md:gap-4">
            <button
              onClick={() => setShowMyReports(true)}
              className="flex items-center gap-1.5 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
              title="My saved reports"
            >
              <History size={17} />
              <span className="hidden sm:inline">My Reports</span>
            </button>
            <button
              onClick={() => setShowDisclaimer(true)}
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-slate-700 transition-colors"
            >
              <Info size={15} /> Disclaimer
            </button>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
               className="hidden md:flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:text-emerald-700">
              <MessageCircle size={17} /> Support
            </a>
            <button
              onClick={() => setShowProfessionalAgent(true)}
              className="hidden sm:flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full transition-all hover:bg-blue-100"
            >
              <Briefcase size={15} /> Pro
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm font-bold text-slate-400 hover:text-red-500 transition-colors"
            >
              <LogOut size={17} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </nav>
        </div>
      </header>

      {/* ── MAIN ───────────────────────────────────────────── */}
      <main className="flex-grow">

        {/* IDLE / HOME */}
        {status === AppState.IDLE && (
          <div className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white">
            {/* Decorative blobs */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
              <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-200/30 blur-3xl rounded-full" />
              <div className="absolute top-40 right-0 w-80 h-80 bg-indigo-200/20 blur-3xl rounded-full" />
              <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-sky-200/20 blur-3xl rounded-full" />
            </div>

            <div className="max-w-4xl mx-auto px-4 pt-14 pb-20 text-center">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white border border-slate-200 shadow-sm px-4 py-1.5 rounded-full text-xs font-bold text-slate-500 mb-10 tracking-widest uppercase">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                AI Powered UK Property Area Intelligence
              </div>

              {/* Intro card */}
              <div className="mb-12 relative bg-white border border-blue-100 rounded-[2rem] shadow-2xl shadow-blue-900/5 p-8 md:p-10 text-center overflow-hidden">
                <div className="absolute top-4 right-4 opacity-5">
                  <Sparkles size={140} className="text-blue-600" />
                </div>
                <div className="relative max-w-2xl mx-auto">
                  <div className="flex items-center justify-center gap-2 mb-5">
                    <ShieldCheck size={18} className="text-blue-600" />
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                      Welcome back, {currentUser.email?.split('@')[0]}
                    </span>
                  </div>
                  <p className="text-xl md:text-2xl text-slate-800 leading-relaxed font-medium">
                    This app was created to allow anyone searching for a new place to live some insight into that place —{' '}
                    <span className="text-blue-600 font-bold">just as property professionals use.</span>{' '}
                    It doesn&apos;t matter whether you are looking to buy or rent. To keep your lists active or to share
                    the info, just leave your details. Why not give it a go?
                  </p>
                </div>
              </div>

              {/* Hero */}
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-5 leading-[1.1] tracking-tight">
                Searching for your next home?{' '}
                <span className="text-blue-600">Get intelligent insight.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                The most comprehensive area reports for the UK — including side-by-side comparisons and deep AI analysis.
              </p>

              {/* Search bar */}
              <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto group mb-4">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Search size={22} />
                </div>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter full address and postcode in UK …"
                  className="w-full pl-14 pr-36 py-5 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none text-lg transition-all shadow-xl bg-white text-slate-900 placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-2.5 bottom-2.5 bg-blue-600 text-white px-7 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg active:scale-95 text-base"
                >
                  Analyse
                </button>
              </form>
              <p className="text-xs text-slate-400 mb-12 flex items-center justify-center gap-1.5">
                <Info size={11} />
                Reports are AI-generated and saved to your account. Always verify independently.
              </p>

              {/* Newsletter */}
              <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-16">
                <div className="flex items-center gap-2 mb-4 justify-center">
                  <Mail className="text-blue-600" size={18} />
                  <h3 className="font-bold text-slate-800">Receive our Newsletter if you wish</h3>
                </div>
                {subscribed ? (
                  <div className="flex items-center justify-center gap-2 text-emerald-600 font-bold">
                    <CheckCircle2 size={18} /> Thanks for joining!
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-none text-sm bg-white"
                      required
                    />
                    <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors flex items-center gap-2 group">
                      Notify Me <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </form>
                )}
                <p className="mt-3 text-[10px] text-slate-400 uppercase font-bold tracking-widest text-center">
                  Join 2,500+ users getting AI property insights
                </p>
              </div>

              {/* Coverage areas */}
              <div className="max-w-3xl mx-auto py-10 border-t border-slate-100">
                <div className="flex items-center justify-center gap-2 text-slate-400 mb-5">
                  <Globe size={14} />
                  <span className="text-xs font-bold uppercase tracking-widest">Major Coverage Areas in England</span>
                </div>
                <div className="flex flex-wrap justify-center gap-x-5 gap-y-2.5">
                  {coverageAreas.map((city) => (
                    <span key={city} className="text-slate-400 hover:text-blue-600 cursor-default transition-colors text-sm font-medium">
                      Property Reports {city}
                    </span>
                  ))}
                </div>
                <p className="mt-6 text-slate-400 text-xs leading-relaxed max-w-lg mx-auto text-center">
                  Home Notes provides AI-generated area intelligence for home buyers and renters across the South Coast,
                  Midlands, North West, and all major English regions.
                </p>
              </div>
            </div>
          </div>
        )}

        {status === AppState.LOADING && <LoadingScreen />}

        {(status === AppState.REPORT || status === AppState.COMPARING) && report && (
          <ReportDashboard
            report={report}
            secondReport={secondReport}
            onNewSearch={handleReset}
            onCompare={handleCompare}
            isComparing={isComparing}
          />
        )}

        {status === AppState.ERROR && (
          <div className="max-w-2xl mx-auto px-4 py-32 text-center">
            <div className="bg-red-50 text-red-600 p-8 rounded-3xl border border-red-100 inline-block mb-6">
              <AlertCircle size={44} className="mx-auto mb-3" />
              <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
              <p className="text-red-700 opacity-80 text-sm">{error}</p>
            </div>
            <div>
              <button onClick={handleReset} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 shadow-lg">
                Try Another Address
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ── MODALS & OVERLAYS ──────────────────────────────── */}

      {/* Disclaimer Modal */}
      {showDisclaimer && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowDisclaimer(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-amber-50 p-2.5 rounded-xl"><ShieldCheck className="text-amber-600" size={22} /></div>
              <h2 className="text-xl font-black text-slate-900">AI Disclaimer</h2>
            </div>
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                <strong className="text-slate-900">Home Notes uses AI language models</strong> to generate property area reports.
                The information provided — including broadband speeds, school ratings, crime statistics, flood risk, and local amenities — is{' '}
                <strong>AI-generated</strong> and sourced from the model&apos;s training data.
              </p>
              <p>
                This data <strong>may not reflect current, accurate, or real-world conditions.</strong> It should be treated as a general starting point for research only, not as authoritative or up-to-date factual information.
              </p>
              <p><strong className="text-slate-900">Before making any property decision</strong> you should always:</p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Verify all data from official sources (Ofsted, Environment Agency, Ofcom, ONS)</li>
                <li>Consult a qualified surveyor, solicitor, or financial adviser</li>
                <li>Conduct your own independent research</li>
              </ul>
              <p>Kadima Systems Ltd accepts <strong>no liability</strong> for decisions made based on information provided by this application.</p>
            </div>
            <button
              onClick={() => setShowDisclaimer(false)}
              className="mt-6 w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors"
            >
              Understood
            </button>
          </div>
        </div>
      )}

      {/* My Reports Panel */}
      {showMyReports && currentUser?.email && (
        <MyReports
          userEmail={currentUser.email}
          onClose={() => setShowMyReports(false)}
          onLoadReport={handleLoadSavedReport}
        />
      )}

      {/* Professional Insights Agent */}
      {showProfessionalAgent && (
        <ProfessionalInsightsAgent onClose={() => setShowProfessionalAgent(false)} />
      )}

      {/* WhatsApp FAB */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[60] bg-emerald-500 text-white p-4 rounded-full shadow-2xl hover:bg-emerald-600 hover:scale-110 transition-all group flex items-center gap-2"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle size={22} />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 text-sm font-bold">
          WhatsApp Us
        </span>
      </a>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-slate-800 pb-8 mb-8">
            <div className="max-w-md">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-blue-600 p-1 rounded-lg"><Home className="text-white" size={15} /></div>
                <span className="text-lg font-bold text-white">Home Notes</span>
              </div>
              <p className="text-sm italic mb-4">AI-Assisted Property Intelligence for England.</p>
              <div className="mb-5">
                <h4 className="text-white text-xs font-bold uppercase mb-3">Contact Support</h4>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-lg hover:bg-emerald-500/20 transition-all text-sm font-medium">
                  <MessageCircle size={16} /> 07724 601320 (WhatsApp)
                </a>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-800">
                <h4 className="text-white text-xs font-bold uppercase mb-2">Legal Disclaimer</h4>
                <p className="text-[11px] leading-relaxed">
                  Reports are generated by AI and may be inaccurate or outdated. Home Notes makes no warranties as to the accuracy of any information provided. Always verify independently and consult qualified professionals before making any property commitments.
                </p>
              </div>
            </div>
            <div className="flex gap-8 text-sm">
              <div className="flex flex-col gap-2">
                <h4 className="text-white text-xs font-bold uppercase mb-2">Navigation</h4>
                <button onClick={() => setShowMyReports(true)} className="hover:text-white text-left">My Reports</button>
                <button onClick={() => setShowDisclaimer(true)} className="hover:text-white text-left">AI Disclaimer</button>
                <a href="/privacy" className="hover:text-white">Privacy Policy</a>
                <a href="/terms" className="hover:text-white">Terms of Service</a>
                <a href="/cookies" className="hover:text-white">Cookie Policy</a>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-white text-xs font-bold uppercase mb-2">Coverage</h4>
                <span className="text-[10px] text-slate-500">Dorset & South Coast:</span>
                <p className="text-[11px] text-slate-400">Bournemouth, Poole, Christchurch</p>
                <span className="text-[10px] text-slate-500 mt-2">National Hubs:</span>
                <p className="text-[11px] text-slate-400">London, Manchester, Birmingham</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-widest opacity-60">
            <p>© 2026 Kadima Systems Ltd · Powered by Claude AI</p>
            <p>AI-assisted property area intelligence</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
