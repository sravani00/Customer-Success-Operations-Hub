'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Loader2, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError('Please enter the password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push('/dashboard');
        router.refresh();
      } else {
        setError(data.message || 'Incorrect password. Access denied.');
      }
    } catch (err) {
      setError('Connection failed. Please check your network.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-slate-900 flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-[420px] bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl shadow-slate-200/50 text-center">
        {/* Lock Icon Circle */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-slate-100 mb-6 text-slate-700">
          <Lock className="w-6 h-6 stroke-[1.75]" />
        </div>

        {/* Header Titles */}
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
          Password Required
        </h1>
        <p className="text-sm text-slate-500 mb-7 leading-relaxed">
          Please enter the password to access the dashboard
        </p>

        {error && (
          <div className="mb-5 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-xs font-medium flex items-center justify-center space-x-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          <div>
            <label 
              htmlFor="password-input" 
              className="block text-xs font-semibold text-slate-800 mb-2"
            >
              Password
            </label>
            <input
              id="password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              autoFocus
              disabled={loading}
              className="w-full bg-[#edf3fc] border border-[#cbd5e1] focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-mono disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#64748b] hover:bg-[#475569] active:bg-[#334155] text-white font-semibold text-sm py-3 px-4 rounded-xl flex items-center justify-center space-x-2 shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <span>Access Dashboard</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
