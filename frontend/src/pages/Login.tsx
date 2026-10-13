import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, User, Mail, Lock, ArrowRight } from 'lucide-react';

export default function Login() {
  const [view, setView] = useState<'login' | 'register' | 'forgot'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    localStorage.setItem('userEmail', email);
    navigate('/dashboard');
  };

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    navigate('/dashboard');
  };

  const handleForgotPassword = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (email) {
      setResetEmailSent(true);
    }
  };

  const resetForm = () => {
    setError('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="min-h-screen bg-navy-900 text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="p-3 bg-violet-600/10 rounded-2xl border border-violet-500/20">
            <Brain className="w-12 h-12 text-violet-500" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          {view === 'login' && 'Sign in to your account'}
          {view === 'register' && 'Create your free account'}
          {view === 'forgot' && 'Reset your password'}
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          {view === 'login' && (
            <span>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setView('register');
                }}
                className="font-medium text-violet-400 hover:text-violet-300 underline underline-offset-4 transition"
              >
                Create new account
              </button>
            </span>
          )}
          {view === 'register' && (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setView('login');
                }}
                className="font-medium text-violet-400 hover:text-violet-300 underline underline-offset-4 transition"
              >
                Sign in
              </button>
            </span>
          )}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-navy-800 py-8 px-6 shadow-xl sm:rounded-xl sm:px-10 border border-navy-700">
          {error && (
            <div className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* LOGIN FORM */}
          {view === 'login' && (
            <form className="space-y-5" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                  Email address
                </label>
                <div className="mt-1 relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2.5 pl-10 border border-navy-600 rounded-lg shadow-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent sm:text-sm bg-navy-900 text-white"
                    placeholder="you@example.com"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setView('forgot');
                    }}
                    className="text-xs font-medium text-violet-400 hover:text-violet-300 transition"
                  >
                    Forgot your password?
                  </button>
                </div>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2.5 pl-10 border border-navy-600 rounded-lg shadow-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent sm:text-sm bg-navy-900 text-white"
                    placeholder="••••••••"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg shadow-sm text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition font-semibold"
                >
                  Sign in
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-2 border-t border-navy-700 text-center">
                <span className="text-xs text-slate-400">Don't have an account? </span>
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setView('register');
                  }}
                  className="text-xs font-medium text-violet-400 hover:text-violet-300 transition"
                >
                  Register here
                </button>
              </div>
            </form>
          )}

          {/* REGISTER FORM */}
          {view === 'register' && (
            <form className="space-y-4" onSubmit={handleRegister}>
              <div>
                <label htmlFor="reg-name" className="block text-sm font-medium text-slate-300">
                  Full Name
                </label>
                <div className="mt-1 relative">
                  <input
                    id="reg-name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none block w-full px-3 py-2.5 pl-10 border border-navy-600 rounded-lg shadow-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent sm:text-sm bg-navy-900 text-white"
                    placeholder="John Doe"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label htmlFor="reg-email" className="block text-sm font-medium text-slate-300">
                  Email address
                </label>
                <div className="mt-1 relative">
                  <input
                    id="reg-email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2.5 pl-10 border border-navy-600 rounded-lg shadow-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent sm:text-sm bg-navy-900 text-white"
                    placeholder="you@example.com"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label htmlFor="reg-password" className="block text-sm font-medium text-slate-300">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="reg-password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2.5 pl-10 border border-navy-600 rounded-lg shadow-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent sm:text-sm bg-navy-900 text-white"
                    placeholder="At least 6 characters"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label htmlFor="reg-confirm" className="block text-sm font-medium text-slate-300">
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="reg-confirm"
                    name="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2.5 pl-10 border border-navy-600 rounded-lg shadow-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent sm:text-sm bg-navy-900 text-white"
                    placeholder="Repeat password"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg shadow-sm text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition"
                >
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-2 border-t border-navy-700 text-center">
                <span className="text-xs text-slate-400">Already registered? </span>
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setView('login');
                  }}
                  className="text-xs font-medium text-violet-400 hover:text-violet-300 transition"
                >
                  Sign in here
                </button>
              </div>
            </form>
          )}

          {/* FORGOT PASSWORD FORM */}
          {view === 'forgot' && (
            <div className="space-y-6">
              {resetEmailSent ? (
                <div className="text-center space-y-4">
                  <div className="text-green-400 text-5xl mb-4">✉️</div>
                  <h3 className="text-xl font-bold">Check your email</h3>
                  <p className="text-slate-400">
                    We've sent a password reset link to <span className="text-white font-medium">{email}</span>
                  </p>
                  <button
                    onClick={() => {
                      setView('login');
                      setResetEmailSent(false);
                      resetForm();
                    }}
                    className="mt-6 w-full py-2.5 border border-navy-600 rounded-lg text-sm font-medium text-white hover:bg-navy-700 transition"
                  >
                    Back to login
                  </button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleForgotPassword}>
                  <p className="text-sm text-slate-400">
                    Enter the email address associated with your account and we'll send you a link to reset your password.
                  </p>
                  <div>
                    <label htmlFor="reset-email" className="block text-sm font-medium text-slate-300">
                      Email address
                    </label>
                    <div className="mt-1 relative">
                      <input
                        id="reset-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="appearance-none block w-full px-3 py-2.5 pl-10 border border-navy-600 rounded-lg shadow-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent sm:text-sm bg-navy-900 text-white"
                        placeholder="you@example.com"
                      />
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition"
                    >
                      Send Reset Link
                    </button>
                  </div>
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => {
                        resetForm();
                        setView('login');
                      }}
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
