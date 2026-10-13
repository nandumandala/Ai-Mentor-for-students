import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, PlayCircle, CheckCircle, Circle, BookOpen } from 'lucide-react';

export default function CourseView() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  
  const [activeLesson, setActiveLesson] = useState(0);

  const courseTitles: Record<string, string> = {
    'javascript-fundamentals': 'JavaScript Fundamentals',
    'react-typescript': 'React & TypeScript',
    'nodejs-backend': 'Node.js Backend'
  };

  const title = courseId ? courseTitles[courseId] || 'Course Details' : 'Course Details';

  const lessons = [
    { id: 0, title: 'Introduction to the Course', duration: '5 min', completed: true },
    { id: 1, title: 'Understanding Variables & Data Types', duration: '15 min', completed: true },
    { id: 2, title: 'Functions and Scope', duration: '20 min', completed: false },
    { id: 3, title: 'Arrays and Objects', duration: '25 min', completed: false },
    { id: 4, title: 'Asynchronous Programming', duration: '30 min', completed: false },
  ];

  return (
    <div className="min-h-screen bg-navy-900 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="flex items-center gap-4 p-4 border-b border-navy-800 bg-navy-900/80 backdrop-blur sticky top-0 z-10">
        <button 
          onClick={() => navigate('/dashboard')}
          className="p-2 hover:bg-navy-800 rounded-lg transition"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-violet-500" />
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content / Video Player */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-black rounded-2xl border border-navy-700 flex items-center justify-center shadow-2xl mb-8 relative overflow-hidden group">
              <PlayCircle className="w-20 h-20 text-slate-600 group-hover:text-violet-500 transition cursor-pointer" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition">
                <div className="w-full bg-slate-800 h-1.5 rounded-full cursor-pointer">
                  <div className="bg-violet-500 h-1.5 rounded-full w-1/3"></div>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-4">{lessons[activeLesson].title}</h2>
            <div className="prose prose-invert max-w-none text-slate-300">
              <p>In this lesson, we will cover the core concepts required to understand this topic thoroughly. You will learn about best practices, common pitfalls, and how to apply this knowledge in real-world scenarios.</p>
              
              <div className="bg-navy-800 p-6 rounded-xl border border-navy-700 mt-8">
                <h3 className="text-lg font-bold text-white mb-4">Lesson Notes</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Key concept 1: Always declare variables properly.</li>
                  <li>Key concept 2: Understand the difference between mutability and immutability.</li>
                  <li>Practice exercise: Try rewriting the function using arrow syntax.</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between items-center border-t border-navy-800 pt-8">
               <button 
                onClick={() => setActiveLesson(Math.max(0, activeLesson - 1))}
                disabled={activeLesson === 0}
                className="px-6 py-2 rounded-lg bg-navy-800 hover:bg-navy-700 disabled:opacity-50 transition font-medium"
              >
                Previous Lesson
              </button>
              <button 
                onClick={() => setActiveLesson(Math.min(lessons.length - 1, activeLesson + 1))}
                className="px-6 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 transition font-medium"
              >
                {activeLesson === lessons.length - 1 ? 'Finish Course' : 'Next Lesson'}
              </button>
            </div>
          </div>
        </main>

        {/* Course Syllabus Sidebar */}
        <aside className="w-80 bg-navy-800 border-l border-navy-700 hidden lg:flex flex-col h-full">
          <div className="p-6 border-b border-navy-700">
            <h3 className="font-bold text-lg">Course Content</h3>
            <p className="text-sm text-slate-400 mt-1">2 / 5 completed</p>
            <div className="w-full bg-navy-900 rounded-full h-1.5 mt-3">
              <div className="bg-violet-500 h-1.5 rounded-full" style={{ width: '40%' }}></div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {lessons.map((lesson, index) => (
              <button
                key={lesson.id}
                onClick={() => setActiveLesson(index)}
                className={`w-full text-left p-3 rounded-lg flex gap-3 transition ${
                  activeLesson === index 
                    ? 'bg-violet-600/20 border border-violet-500/30' 
                    : 'hover:bg-navy-700 border border-transparent'
                }`}
              >
                <div className="mt-1">
                  {lesson.completed ? (
                    <CheckCircle className="w-5 h-5 text-violet-500" />
                  ) : (
                    <Circle className={`w-5 h-5 ${activeLesson === index ? 'text-violet-400' : 'text-slate-500'}`} />
                  )}
                </div>
                <div>
                  <div className={`font-medium ${activeLesson === index ? 'text-violet-300' : 'text-slate-200'}`}>
                    {index + 1}. {lesson.title}
                  </div>
                  <div className="text-sm text-slate-400 mt-1">{lesson.duration}</div>
                </div>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
