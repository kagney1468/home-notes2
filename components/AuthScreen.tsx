'use client';

import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { auth } from '../services/firebase';
import { Home, Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

type Mode = 'signin' | 'signup';

export function AuthScreen({ onBack }: { onBack?: () => void } = {}) {
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verificationSent, setVerificationSent] = useState(false);

  const clearError = () => setError(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    clearError();
    try {
      if (mode === 'signup') {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(cred.user);
        setVerificationSent(true);
      } else {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        if (!cred.user.emailVerified) {
          setError('Please verify your email before signing in. Check your inbox for a verification link.');
          await auth.signOut();
        }
      }
    } catch (err: unknown) {
      const msg = (err as { code?: string }).code;
      if (msg === 'auth/invalid-credential' || msg === 'auth/user-not-found' || msg === 'auth/wrong-password') {
        setError('Invalid email or password.');
      } else if (msg === 'auth/email-already-in-use') {
        setError('An account with this email already exists.');
      } else if (msg === 'auth/weak-password') {
        setError('Password must be at least 6 characters.');
      } else if (msg === 'auth/too-many-requests') {
        setError('Too many attempts. Please try again later.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (verificationSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-10 max-w-md w-full text-center">
          <div className="bg-emerald-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="text-emerald-600" size={32} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-3">Check your inbox</h2>
          <p className="text-slate-600 mb-6">
            We&apos;ve sent a verification link to <strong>{email}</strong>. Click the link to activate your account, then come back and sign in.
          </p>
          <button
            onClick={() => { setVerificationSent(false); setMode('signin'); }}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-4">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 max-w-md w-full">
        {/* Back button */}
        {onBack && (
          <button onClick={onBack} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 mb-4 transition-colors">
            ← Back
          </button>
        )}
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="bg-blue-600 p-2 rounded-xl">
            <Home className="text-white" size={22} />
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tight">
            Home<span className="text-blue-600">Notes</span>
          </span>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
          {(['signin', 'signup'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); clearError(); }}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                mode === m ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {m === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-2 bg-red-50 text-red-700 border border-red-100 rounded-xl p-3 mb-4 text-sm">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-50 outline-none text-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-50 outline-none text-sm transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : null}
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-6">
          {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); clearError(); }}
            className="text-blue-600 font-bold hover:underline"
          >
            {mode === 'signin' ? 'Sign up' : 'Sign in'}
          </button>
        </p>

        {/* AI Disclaimer */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <p className="text-[10px] text-slate-400 leading-relaxed text-center">
            <strong className="text-slate-500">AI Disclaimer:</strong> Home Notes uses AI language models to generate property area reports. 
            All data is AI-generated and may not reflect current or accurate real-world conditions. 
            Always verify independently and consult qualified professionals before making any property decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
