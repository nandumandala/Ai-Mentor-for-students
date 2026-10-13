import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain } from 'lucide-react';

export default function Login() {
  const [view, setView] = useState<'login' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Temporary mock login
    if (email && password) {
      localStorage.setItem('userEmail', email);
      navigate('/dashboard');
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setResetEmailSent(true);
    }
  };

  return (
    <div className="min-h-screen bg-navy-900 text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Brain className="w-12 h-12 text-violet-500" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          {view === 'login' ? 'Sign in to your account' : 'Reset your password'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-navy-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-navy-700">
          {view === 'login' ? (
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-navy-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm bg-navy-900 text-white"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                    Password
                  </label>
                  <button 
                    type="button"
                    onClick={() => setView('forgot')}
                    className="text-sm font-medium text-violet-400 hover:text-violet-300 transition"
                  >
                    Forgot your password?
                  </button>
                </div>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-navy-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm bg-navy-900 text-white"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition"
                >
                  Sign in
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {resetEmailSent ? (
                <div className="text-center space-y-4">
                  <div className="text-green-400 text-5xl mb-4">✉️</div>
                  <h3 className="text-xl font-bold">Check your email</h3>
                  <p className="text-slate-400">We've sent a password reset link to <span className="text-white">{email}</span></p>
                  <button 
                    onClick={() => {
                      setView('login');
                      setResetEmailSent(false);
                    }}
                    className="mt-6 w-full py-2 border border-navy-600 rounded-md text-sm font-medium text-white hover:bg-navy-700 transition"
                  >
                    Back to login
                  </button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleForgotPassword}>
                  <p className="text-sm text-slate-400">Enter the email address associated with your account and we'll send you a link to reset your password.</p>
                  <div>
                    <label htmlFor="reset-email" className="block text-sm font-medium text-slate-300">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="reset-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="appearance-none block w-full px-3 py-2 border border-navy-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm bg-navy-900 text-white"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition"
                    >
                      Send Reset Link
                    </button>
                  </div>
                  <div className="text-center">
                    <button 
                      type="button"
                      onClick={() => setView('login')}
                      className="text-sm font-medium text-slate-400 hover:text-white transition"
                    >
                      Wait, I remember my password
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
