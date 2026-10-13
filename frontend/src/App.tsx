import React from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Brain, Compass, Code, LayoutDashboard } from 'lucide-react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CourseView from './pages/CourseView';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-navy-900 text-slate-100 font-sans">
      <nav className="flex justify-between items-center p-6 border-b border-navy-800">
        <div className="flex items-center gap-2">
          <Brain className="w-8 h-8 text-violet-500" />
          <span className="text-xl font-bold tracking-tight">AI Mentor</span>
        </div>
        <div className="flex gap-4">
          <button onClick={() => navigate('/login')} className="px-4 py-2 rounded-lg hover:bg-navy-800 transition">Log In</button>
          <button onClick={() => navigate('/login')} className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 transition font-medium">Get Started</button>
        </div>
      </nav>
      
      <main className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
          Your Personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-violet-600">AI Career Coach</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
          Master new skills, conquer interviews, and accelerate your tech career with personalized, AI-driven learning roadmaps.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="p-6 rounded-2xl bg-navy-800 border border-navy-700 text-left">
            <Compass className="w-10 h-10 text-violet-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Smart Roadmaps</h3>
            <p className="text-slate-400">Personalized learning paths tailored to your dream role and current skill level.</p>
          </div>
          <div className="p-6 rounded-2xl bg-navy-800 border border-navy-700 text-left">
            <Code className="w-10 h-10 text-violet-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Coding Practice</h3>
            <p className="text-slate-400">Interactive sandbox to test your skills with real-time AI feedback.</p>
          </div>
          <div className="p-6 rounded-2xl bg-navy-800 border border-navy-700 text-left">
            <LayoutDashboard className="w-10 h-10 text-violet-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Career Dashboard</h3>
            <p className="text-slate-400">Track your progress, analyze your resume, and prepare with mock interviews.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/course/:courseId" element={<CourseView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
