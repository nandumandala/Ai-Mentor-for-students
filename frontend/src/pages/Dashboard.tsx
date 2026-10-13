import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, 
  LayoutDashboard, 
  LogOut, 
  MessageSquare, 
  BookOpen, 
  Code, 
  FileText, 
  UserCheck, 
  BarChart, 
  Settings,
  PlayCircle,
  CheckCircle2,
  XCircle,
  Upload,
  FileCheck,
  Video,
  Mic,
  PhoneOff
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [language, setLanguage] = useState('JavaScript');
  
  // Try to load email from localStorage (set by Login page)
  const storedEmail = localStorage.getItem('userEmail') || 'student@example.com';
  const derivedName = storedEmail.split('@')[0].charAt(0).toUpperCase() + storedEmail.split('@')[0].slice(1);
  
  const [userName, setUserName] = useState(derivedName);
  const [userEmail, setUserEmail] = useState(storedEmail);
  const [activeProblem, setActiveProblem] = useState(0);
  
  const codeTemplates: Record<string, string> = {
    'JavaScript': `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Write your solution here
    
};`,
    'Python': `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Write your solution here
        pass`,
    'Java': `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        return new int[]{};
    }
}`,
    'C++': `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        return {};
    }
};`
  };

  // Code editor state
  const [code, setCode] = useState(codeTemplates['JavaScript']);
  const [testResult, setTestResult] = useState<{passed: boolean, output: string} | null>(null);

  // Resume Analyzer state
  const [resumeState, setResumeState] = useState<'idle' | 'analyzing' | 'done'>('idle');
  const [resumeScore, setResumeScore] = useState(0);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  // Mock Interview state
  const [interviewState, setInterviewState] = useState<'idle' | 'active' | 'feedback'>('idle');
  const [interviewQuestion, setInterviewQuestion] = useState(0);

  const mockQuestions = [
    "Tell me about a challenging technical problem you solved recently.",
    "How do you handle disagreements with team members over architecture?",
    "Explain the concept of React hooks to a junior developer."
  ];

  const handleRunCode = () => {
    try {
      if (language !== 'JavaScript') {
        // Mocking execution for other languages since we don't have a backend execution environment yet
        if (code.includes('[0, 1]') || code.includes('[0,1]') || code.includes('{0, 1}') || code.includes('{0,1}')) {
          setTestResult({ passed: true, output: '[0,1]' });
          return true;
        } else {
          setTestResult({ passed: false, output: 'SyntaxError: Mock backend requires a valid return array like [0, 1] for non-JS languages.' });
          return false;
        }
      }

      // Create a function from the code string for JavaScript
      const userFunc = new Function('nums', 'target', code + '\nreturn typeof twoSum === "function" ? twoSum(nums, target) : undefined;');
      const result = userFunc([2, 7, 11, 15], 9);
      
      const expectedStr = JSON.stringify([0, 1]);
      const resultStr = JSON.stringify(result);
      
      if (resultStr === expectedStr) {
        setTestResult({ passed: true, output: resultStr });
        return true;
      } else {
        setTestResult({ passed: false, output: resultStr || 'undefined' });
        return false;
      }
    } catch (err: any) {
      setTestResult({ passed: false, output: err.message });
      return false;
    }
  };

  const handleSubmitCode = () => {
    const passed = handleRunCode();
    if (passed) {
      alert("🎉 Success! Your solution was accepted and saved to your profile! (Mock Backend)");
    } else {
      alert("❌ Submission Failed. Check the Test Cases console for errors.");
    }
  };

  const handleAnalyzeResume = () => {
    setResumeState('analyzing');
    // Simulate AI parsing and scoring delay
    setTimeout(() => {
      setResumeScore(Math.floor(Math.random() * 30) + 60); // Random score between 60-90
      setResumeState('done');
    }, 2500);
  };

  const handleLogout = () => {
    navigate('/');
  };

  // Chat state
  const [messages, setMessages] = useState<{role: string, content: string}[]>([
    { role: 'assistant', content: "Hello! I'm your AI Career Coach. I see you're working towards becoming a Full-Stack Engineer. How can I help you today?" }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { role: 'user', content: inputText }];
    setMessages(newMessages);
    setInputText('');

    // Simulate AI response with a deterministic demo mode
    setTimeout(() => {
      let response = "[DEMO MODE] I'm a simulated AI coach! Please connect the real backend to get full AI guidance.";
      const lowerInput = inputText.toLowerCase();
      
      if (lowerInput.includes('how are you')) {
        response = "[DEMO MODE] I'm doing great, thank you! I'm ready to help you build your tech career. What should we focus on today?";
      } else if (lowerInput.includes('doubt') || lowerInput.includes('help')) {
        response = "[DEMO MODE] I'd love to help! Could you provide a bit more detail about the specific problem or topic you are struggling with?";
      } else if (lowerInput.includes('react') || lowerInput.includes('javascript') || lowerInput.includes('code')) {
        response = "[DEMO MODE] It looks like you're asking about coding! For JavaScript and React, I recommend practicing state management and understanding hooks like useEffect. Check out the Learning Hub for a full module on this!";
      } else if (lowerInput.includes('resume') || lowerInput.includes('interview')) {
        response = "[DEMO MODE] For interview prep and resumes, always make sure to highlight measurable achievements. Use the Resume Analyzer tab to get a full breakdown of your current CV!";
      } else if (lowerInput.includes('hi') || lowerInput.includes('hello')) {
        response = "[DEMO MODE] Hello there! Let's get started on your career roadmap.";
      } else if (lowerInput.includes('ok') || lowerInput.includes('okk') || lowerInput.includes('sure')) {
        response = "[DEMO MODE] Great! Let me know when you're ready to proceed to the next step.";
      } else if (lowerInput.includes('thank') || lowerInput.includes('thx')) {
        response = "[DEMO MODE] You're very welcome! I'm here whenever you need more guidance.";
      } else {
        response = `[DEMO MODE] I understand you're saying "${inputText}". Since I am currently running as a secure frontend-only mock without a backend database or LLM connection, I don't have the intelligence to answer this specific question yet.`;
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }, 1000);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'ai-mentor', label: 'AI Mentor Chat', icon: MessageSquare },
    { id: 'learning', label: 'Learning Hub', icon: BookOpen },
    { id: 'coding', label: 'Coding Practice', icon: Code },
    { id: 'resume', label: 'Resume Analyzer', icon: FileText },
    { id: 'interview', label: 'Mock Interview', icon: UserCheck },
    { id: 'analytics', label: 'Analytics', icon: BarChart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className={`min-h-screen bg-navy-900 text-slate-100 flex transition-all duration-500 ${theme === 'light' ? 'invert hue-rotate-180' : ''}`}>
      {/* Sidebar */}
      <aside className="w-64 bg-navy-800 border-r border-navy-700 p-6 hidden md:flex flex-col h-screen fixed">
        <div className="flex items-center gap-2 mb-10">
          <Brain className="w-8 h-8 text-violet-500" />
          <span className="text-xl font-bold">AI Mentor</span>
        </div>
        <nav className="flex-1 space-y-2 overflow-y-auto pr-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeTab === item.id 
                  ? 'bg-violet-600/10 text-violet-400 font-medium border border-violet-500/20' 
                  : 'text-slate-400 hover:bg-navy-700 hover:text-slate-200'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="pt-6 mt-6 border-t border-navy-700">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-red-400 transition">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:ml-64">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            {navItems.find(i => i.id === activeTab)?.label || 'Dashboard'}
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-bold text-slate-200">{userName}</div>
              <div className="text-xs text-slate-400">{userEmail}</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center font-bold shadow-lg shadow-violet-500/20 uppercase">
              {userName.charAt(0)}
            </div>
          </div>
        </header>

        {/* Tab Contents */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-navy-800 border border-navy-700 hover:border-violet-500/30 transition">
                <h3 className="text-lg font-bold mb-2">Career Readiness</h3>
                <div className="text-3xl font-extrabold text-violet-500">45%</div>
                <div className="w-full bg-navy-900 rounded-full h-2 mt-4">
                  <div className="bg-violet-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <p className="text-sm text-slate-400 mt-3">Target: Full-Stack Engineer</p>
              </div>
              <div className="p-6 rounded-2xl bg-navy-800 border border-navy-700 hover:border-violet-500/30 transition">
                <h3 className="text-lg font-bold mb-2">Learning Streak</h3>
                <div className="text-3xl font-extrabold text-violet-500">3 Days</div>
                <p className="text-sm text-slate-400 mt-3">Keep it up! Daily goal: 30 mins</p>
              </div>
              <div className="p-6 rounded-2xl bg-navy-800 border border-navy-700 hover:border-violet-500/30 transition">
                <h3 className="text-lg font-bold mb-2">Next Milestone</h3>
                <div className="text-xl font-semibold text-white mt-1">Master React Hooks</div>
                <button className="mt-4 w-full py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm font-medium transition">
                  Continue Lesson
                </button>
              </div>
            </div>
            
            {/* AI Recommendation */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-violet-900/40 to-navy-800 border border-violet-500/20">
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-violet-500/20 rounded-lg">
                  <Brain className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-violet-100">AI Mentor Recommendation</h3>
                  <p className="text-slate-300 mt-2">Based on your recent quiz results, I recommend practicing State Management. You have a skill gap in handling complex application state. Would you like me to generate a personalized practice problem?</p>
                  <button onClick={() => setActiveTab('ai-mentor')} className="mt-4 px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm font-medium transition">
                    Chat with AI Mentor
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ai-mentor' && (
          <div className="flex flex-col h-[70vh] bg-navy-800 rounded-2xl border border-navy-700 overflow-hidden">
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-4 max-w-2xl ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-violet-600' : 'bg-navy-600'}`}>
                    {msg.role === 'user' ? 'U' : <Brain className="w-4 h-4" />}
                  </div>
                  <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-violet-600 text-white rounded-tr-none' : 'bg-navy-700 text-slate-200 rounded-tl-none'}`}>
                    <p>{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-navy-700 bg-navy-900/50">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask for career advice, technical help, or interview prep..." 
                  className="flex-1 bg-navy-900 border border-navy-600 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-violet-500" 
                />
                <button onClick={handleSendMessage} className="bg-violet-600 hover:bg-violet-500 px-6 py-2 rounded-lg font-medium transition">
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'learning' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['JavaScript Fundamentals', 'React & TypeScript', 'Node.js Backend'].map(course => (
              <div key={course} className="bg-navy-800 rounded-2xl border border-navy-700 overflow-hidden group hover:border-violet-500/50 transition">
                <div className="h-32 bg-navy-700 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-slate-500 group-hover:text-violet-400 transition" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">{course}</h3>
                  <div className="w-full bg-navy-900 rounded-full h-1.5 mb-4">
                    <div className="bg-violet-500 h-1.5 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <button onClick={() => navigate(`/course/${course.toLowerCase().replace(/[\s&]+/g, '-').replace(/\./g, '')}`)} className="w-full py-2 bg-navy-700 hover:bg-violet-600 rounded-lg text-sm font-medium transition">
                    Continue Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Coding Practice Tab */}
        {activeTab === 'coding' && (
          <div className="flex flex-col h-[75vh] lg:flex-row gap-6">
            {/* Problem Description */}
            <div className="lg:w-1/3 bg-navy-800 rounded-2xl border border-navy-700 flex flex-col overflow-hidden">
              <div className="p-4 border-b border-navy-700 flex flex-col gap-2 bg-navy-900/50">
                <select 
                  value={activeProblem}
                  onChange={(e) => setActiveProblem(Number(e.target.value))}
                  className="bg-navy-900 border border-navy-600 rounded px-3 py-1.5 text-sm font-bold text-white focus:outline-none"
                >
                  <option value={0}>Problem 1: Two Sum</option>
                  <option value={1}>Problem 2: Valid Parentheses</option>
                  <option value={2}>Problem 3: Merge Intervals</option>
                </select>
                <div className="flex justify-between items-center mt-1">
                  <span className={`px-2 py-1 text-xs font-bold rounded ${activeProblem === 0 ? 'bg-green-500/20 text-green-400' : activeProblem === 1 ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {activeProblem === 2 ? 'Medium' : 'Easy'}
                  </span>
                </div>
              </div>
              <div className="flex-1 p-6 overflow-y-auto text-slate-300 space-y-4">
                {activeProblem === 0 && (
                  <>
                    <p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p>
                    <p>You may assume that each input would have exactly one solution, and you may not use the same element twice.</p>
                    
                    <h4 className="font-bold text-white mt-6">Example 1:</h4>
                    <div className="bg-navy-900 p-4 rounded-lg font-mono text-sm">
                      <div><span className="text-slate-500">Input:</span> nums = [2,7,11,15], target = 9</div>
                      <div><span className="text-slate-500">Output:</span> [0,1]</div>
                      <div><span className="text-slate-500">Explanation:</span> Because nums[0] + nums[1] == 9, we return [0, 1].</div>
                    </div>
                  </>
                )}
                {activeProblem === 1 && (
                  <>
                    <p>Given a string <code>s</code> containing just the characters <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code> and <code>']'</code>, determine if the input string is valid.</p>
                    <p>An input string is valid if open brackets are closed by the same type of brackets, and open brackets must be closed in the correct order.</p>
                    
                    <h4 className="font-bold text-white mt-6">Example 1:</h4>
                    <div className="bg-navy-900 p-4 rounded-lg font-mono text-sm">
                      <div><span className="text-slate-500">Input:</span> s = "()[]{}"</div>
                      <div><span className="text-slate-500">Output:</span> true</div>
                    </div>
                  </>
                )}
                {activeProblem === 2 && (
                  <>
                    <p>Given an array of <code>intervals</code> where <code>intervals[i] = [starti, endi]</code>, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.</p>
                    
                    <h4 className="font-bold text-white mt-6">Example 1:</h4>
                    <div className="bg-navy-900 p-4 rounded-lg font-mono text-sm">
                      <div><span className="text-slate-500">Input:</span> intervals = [[1,3],[2,6],[8,10],[15,18]]</div>
                      <div><span className="text-slate-500">Output:</span> [[1,6],[8,10],[15,18]]</div>
                      <div><span className="text-slate-500">Explanation:</span> Since intervals [1,3] and [2,6] overlap, merge them into [1,6].</div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="lg:w-2/3 flex flex-col gap-6">
              {/* Editor */}
              <div className="flex-1 bg-navy-800 rounded-2xl border border-navy-700 flex flex-col overflow-hidden">
                <div className="p-2 border-b border-navy-700 bg-navy-900/50 flex justify-between items-center">
                  <div className="flex gap-2">
                    {['JavaScript', 'Python', 'Java', 'C++'].map(lang => (
                      <button 
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setCode(codeTemplates[lang]);
                        }}
                        className={`px-3 py-1 rounded text-sm transition ${language === lang ? 'bg-navy-700 text-slate-300' : 'hover:bg-navy-700 text-slate-400'}`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleRunCode}
                      className="px-4 py-1.5 bg-navy-700 hover:bg-navy-600 rounded-lg text-sm font-medium transition flex items-center gap-2"
                    >
                      <PlayCircle className="w-4 h-4" /> Run
                    </button>
                    <button 
                      onClick={handleSubmitCode}
                      className="px-4 py-1.5 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm font-medium transition"
                    >
                      Submit
                    </button>
                  </div>
                </div>
                <textarea 
                  className="flex-1 w-full bg-[#0d1117] text-slate-300 p-4 font-mono text-sm focus:outline-none resize-none"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>

              {/* Test Cases Console */}
              <div className="h-48 bg-navy-800 rounded-2xl border border-navy-700 flex flex-col overflow-hidden">
                <div className="p-2 border-b border-navy-700 bg-navy-900/50">
                  <span className="px-4 py-1 text-sm font-medium text-slate-300">Test Cases</span>
                </div>
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {testResult && (
                    <div className={`p-3 rounded-lg border ${testResult.passed ? 'bg-green-900/20 border-green-500/30 text-green-400' : 'bg-red-900/20 border-red-500/30 text-red-400'} flex items-center gap-3 mb-4`}>
                      {testResult.passed ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                      <span className="font-bold">{testResult.passed ? 'Accepted' : 'Wrong Answer / Error'}</span>
                    </div>
                  )}
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Input</div>
                    <div className="bg-navy-900 px-3 py-2 rounded text-sm font-mono text-slate-300">nums = [2,7,11,15], target = 9</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Expected Output</div>
                    <div className="bg-navy-900 px-3 py-2 rounded text-sm font-mono text-slate-300">[0,1]</div>
                  </div>
                  {testResult && (
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Your Output</div>
                      <div className={`bg-navy-900 px-3 py-2 rounded text-sm font-mono ${testResult.passed ? 'text-green-400' : 'text-red-400'}`}>
                        {testResult.output}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Resume Analyzer Tab */}
        {activeTab === 'resume' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-navy-800 rounded-2xl border border-navy-700 p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">AI Resume Analyzer</h2>
              <p className="text-slate-400 mb-8 max-w-2xl mx-auto">Upload your resume and a target job description. Our AI will analyze your skills, experience, and format to provide a comprehensive match score and actionable feedback.</p>
              
              <div className="grid md:grid-cols-2 gap-8 text-left">
                {/* Upload Section */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-300">Target Role</label>
                  <input type="text" defaultValue="Full-Stack Engineer" className="w-full bg-navy-900 border border-navy-600 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-violet-500" />
                  
                  <label className="border-2 border-dashed border-navy-600 rounded-xl p-8 flex flex-col items-center justify-center bg-navy-900/50 hover:bg-navy-900 transition cursor-pointer group">
                    <input 
                      type="file" 
                      className="hidden" 
                      accept=".pdf,.docx" 
                      onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                    />
                    <Upload className="w-10 h-10 text-slate-500 group-hover:text-violet-500 mb-4 transition" />
                    <p className="font-medium text-slate-300">
                      {resumeFile ? resumeFile.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">PDF or DOCX (MAX. 5MB)</p>
                  </label>
                  
                  <button 
                    onClick={handleAnalyzeResume}
                    disabled={resumeState === 'analyzing' || !resumeFile}
                    className="w-full py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 rounded-lg font-bold transition flex items-center justify-center gap-2"
                  >
                    {resumeState === 'analyzing' ? (
                      <>Analyzing Resume...</>
                    ) : (
                      <><FileCheck className="w-5 h-5" /> Analyze Match</>
                    )}
                  </button>
                </div>

                {/* Results Section */}
                <div className="bg-navy-900 rounded-xl p-6 border border-navy-700 h-full flex flex-col">
                  {resumeState === 'idle' && (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-500 text-center">
                      <FileText className="w-12 h-12 mb-4 opacity-50" />
                      <p>Upload a resume and click Analyze to see your ATS match score and AI feedback.</p>
                    </div>
                  )}
                  {resumeState === 'analyzing' && (
                    <div className="flex-1 flex flex-col items-center justify-center">
                      <div className="w-12 h-12 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin mb-4"></div>
                      <p className="text-violet-400 font-medium animate-pulse">Parsing document structure...</p>
                    </div>
                  )}
                  {resumeState === 'done' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="flex items-center justify-between border-b border-navy-700 pb-4">
                        <h3 className="font-bold text-lg text-white">Match Score</h3>
                        <div className={`text-3xl font-extrabold ${resumeScore > 75 ? 'text-green-500' : 'text-yellow-500'}`}>
                          {resumeScore}%
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-200 mb-2">Strengths</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-green-400">
                          <li>Strong modern frontend stack (React, Tailwind)</li>
                          <li>Clear bullet points with action verbs</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-200 mb-2">Missing Keywords</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-red-400">
                          <li>Docker / Containerization</li>
                          <li>CI/CD pipelines</li>
                          <li>AWS / Cloud deployment</li>
                        </ul>
                      </div>
                      <div className="pt-4 mt-auto border-t border-navy-700">
                        <p className="text-sm text-slate-400 italic">[DEMO MODE] This is a simulated analysis. Connect the Node.js backend to parse real PDFs and use the LLM for accurate scoring.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mock Interview Tab */}
        {activeTab === 'interview' && (
          <div className="flex flex-col h-[75vh] space-y-6 max-w-5xl mx-auto w-full">
            <div className="flex items-center justify-between bg-navy-800 p-4 rounded-xl border border-navy-700">
              <div>
                <h2 className="text-xl font-bold">Behavioral & Technical Mock Interview</h2>
                <p className="text-sm text-slate-400">Target Role: Full-Stack Engineer</p>
              </div>
              {interviewState === 'idle' && (
                <button 
                  onClick={() => setInterviewState('active')}
                  className="bg-violet-600 hover:bg-violet-500 px-6 py-2 rounded-lg font-bold transition flex items-center gap-2"
                >
                  <Video className="w-5 h-5" /> Start Interview
                </button>
              )}
              {interviewState === 'active' && (
                <button 
                  onClick={() => setInterviewState('feedback')}
                  className="bg-red-600 hover:bg-red-500 px-6 py-2 rounded-lg font-bold transition flex items-center gap-2"
                >
                  <PhoneOff className="w-5 h-5" /> End Interview
                </button>
              )}
            </div>

            {interviewState === 'idle' && (
              <div className="flex-1 bg-navy-800 rounded-2xl border border-navy-700 flex flex-col items-center justify-center text-center p-8">
                <div className="w-24 h-24 bg-navy-900 rounded-full flex items-center justify-center mb-6 shadow-xl">
                  <UserCheck className="w-12 h-12 text-violet-500" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Ready to practice?</h3>
                <p className="text-slate-400 max-w-lg mb-8">Our AI interviewer will ask you questions tailored to your target role. Make sure your microphone and camera are ready.</p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-sm bg-navy-900 px-4 py-2 rounded-lg border border-navy-600 text-green-400">
                    <Mic className="w-4 h-4" /> Mic Check: OK
                  </div>
                  <div className="flex items-center gap-2 text-sm bg-navy-900 px-4 py-2 rounded-lg border border-navy-600 text-green-400">
                    <Video className="w-4 h-4" /> Camera Check: OK
                  </div>
                </div>
              </div>
            )}

            {interviewState === 'active' && (
              <div className="flex-1 flex gap-6">
                {/* Main Video Area */}
                <div className="flex-1 bg-black rounded-2xl border border-navy-700 relative overflow-hidden flex flex-col">
                  {/* AI Interviewer Simulation */}
                  <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-navy-900 to-black">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-violet-600/20 rounded-full mx-auto flex items-center justify-center relative">
                        <div className="absolute inset-0 border-4 border-violet-500 rounded-full animate-ping opacity-20"></div>
                        <Brain className="w-16 h-16 text-violet-400" />
                      </div>
                      <p className="mt-4 font-medium text-slate-300">AI Interviewer is speaking...</p>
                    </div>
                  </div>
                  
                  {/* Subtitle / Question Box */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                    <div className="bg-navy-900/90 backdrop-blur border border-navy-600 p-4 rounded-xl">
                      <p className="font-bold text-violet-400 mb-1">Question {interviewQuestion + 1} of 3</p>
                      <p className="text-lg">{mockQuestions[interviewQuestion]}</p>
                    </div>
                  </div>

                  {/* User PiP */}
                  <div className="absolute top-6 right-6 w-48 aspect-video bg-navy-800 rounded-lg border-2 border-navy-600 flex items-center justify-center shadow-2xl">
                    <Video className="w-8 h-8 text-slate-500" />
                  </div>
                </div>

                {/* Sidebar Controls */}
                <div className="w-80 flex flex-col gap-4">
                  <div className="bg-navy-800 rounded-xl p-6 border border-navy-700">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                      <Mic className="w-5 h-5 text-violet-500" /> Your Response
                    </h3>
                    <div className="bg-navy-900 p-4 rounded-lg h-48 overflow-y-auto text-sm text-slate-400 italic">
                      Live transcript will appear here as you speak...
                    </div>
                    <button 
                      onClick={() => setInterviewQuestion((prev) => Math.min(prev + 1, mockQuestions.length - 1))}
                      className="w-full mt-4 py-2 bg-navy-700 hover:bg-navy-600 rounded-lg transition font-medium"
                    >
                      Next Question
                    </button>
                  </div>
                </div>
              </div>
            )}

            {interviewState === 'feedback' && (
              <div className="flex-1 bg-navy-800 rounded-2xl border border-navy-700 p-8 overflow-y-auto">
                <h3 className="text-2xl font-bold mb-6 text-center text-green-400">Interview Complete!</h3>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-navy-900 p-6 rounded-xl border border-navy-600 text-center">
                    <div className="text-4xl font-black text-violet-400 mb-2">85%</div>
                    <div className="font-medium text-slate-300">Overall Score</div>
                  </div>
                  <div className="bg-navy-900 p-6 rounded-xl border border-navy-600 text-center">
                    <div className="text-4xl font-black text-green-400 mb-2">Great</div>
                    <div className="font-medium text-slate-300">Communication</div>
                  </div>
                  <div className="bg-navy-900 p-6 rounded-xl border border-navy-600 text-center">
                    <div className="text-4xl font-black text-yellow-400 mb-2">Needs Work</div>
                    <div className="font-medium text-slate-300">Technical Depth</div>
                  </div>
                </div>
                
                <h4 className="font-bold text-xl mb-4">Detailed Feedback</h4>
                <div className="space-y-4">
                  <div className="bg-navy-900 p-6 rounded-xl border border-navy-600">
                    <p className="font-bold text-white mb-2">Q: {mockQuestions[0]}</p>
                    <p className="text-slate-300 mb-4"><span className="text-green-400 font-bold">Feedback:</span> Good use of the STAR method to explain your problem-solving process.</p>
                  </div>
                  <div className="bg-navy-900 p-6 rounded-xl border border-navy-600">
                    <p className="font-bold text-white mb-2">Q: {mockQuestions[1]}</p>
                    <p className="text-slate-300 mb-4"><span className="text-yellow-400 font-bold">Feedback:</span> You explained the technical tradeoff well, but try to focus more on how you maintained team morale during the disagreement.</p>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <button 
                    onClick={() => {
                      setInterviewState('idle');
                      setInterviewQuestion(0);
                    }}
                    className="bg-navy-700 hover:bg-navy-600 px-8 py-3 rounded-lg font-bold transition"
                  >
                    Practice Again
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="max-w-6xl mx-auto space-y-6 w-full">
            <h2 className="text-2xl font-bold mb-6">Your Learning Journey</h2>
            
            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-navy-800 p-6 rounded-2xl border border-navy-700 shadow-lg">
                <div className="text-sm font-medium text-slate-400 mb-1">Total Study Hours</div>
                <div className="text-3xl font-black text-white">124</div>
                <div className="text-sm text-green-400 mt-2 flex items-center gap-1">↑ 12% this week</div>
              </div>
              <div className="bg-navy-800 p-6 rounded-2xl border border-navy-700 shadow-lg">
                <div className="text-sm font-medium text-slate-400 mb-1">Problems Solved</div>
                <div className="text-3xl font-black text-white">47</div>
                <div className="text-sm text-green-400 mt-2 flex items-center gap-1">↑ 5 today</div>
              </div>
              <div className="bg-navy-800 p-6 rounded-2xl border border-navy-700 shadow-lg">
                <div className="text-sm font-medium text-slate-400 mb-1">Mock Interviews</div>
                <div className="text-3xl font-black text-white">8</div>
                <div className="text-sm text-slate-400 mt-2 flex items-center gap-1">Avg Score: 78%</div>
              </div>
              <div className="bg-gradient-to-br from-violet-600 to-indigo-700 p-6 rounded-2xl border border-violet-500 shadow-lg shadow-violet-900/20">
                <div className="text-sm font-medium text-violet-200 mb-1">Career Readiness</div>
                <div className="text-3xl font-black text-white">82%</div>
                <div className="text-sm text-violet-200 mt-2">Ready for applications</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Skill Radar / Progress */}
              <div className="lg:col-span-2 bg-navy-800 p-6 rounded-2xl border border-navy-700">
                <h3 className="font-bold text-lg mb-6">Skill Proficiency</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-200">Frontend (React, TypeScript)</span>
                      <span className="text-violet-400 font-bold">90%</span>
                    </div>
                    <div className="w-full bg-navy-900 rounded-full h-3">
                      <div className="bg-violet-500 h-3 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-200">Backend (Node.js, Express)</span>
                      <span className="text-violet-400 font-bold">65%</span>
                    </div>
                    <div className="w-full bg-navy-900 rounded-full h-3">
                      <div className="bg-violet-500 h-3 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-200">Databases (SQL, MongoDB)</span>
                      <span className="text-violet-400 font-bold">50%</span>
                    </div>
                    <div className="w-full bg-navy-900 rounded-full h-3">
                      <div className="bg-violet-500 h-3 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-200">System Design</span>
                      <span className="text-violet-400 font-bold">40%</span>
                    </div>
                    <div className="w-full bg-navy-900 rounded-full h-3">
                      <div className="bg-violet-500 h-3 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Heatmap Mock */}
              <div className="bg-navy-800 p-6 rounded-2xl border border-navy-700">
                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                  <BarChart className="w-5 h-5 text-violet-500" /> Activity Streak
                </h3>
                <div className="flex items-end gap-2 h-40 mb-4">
                  {[40, 60, 30, 80, 100, 50, 70].map((height, i) => (
                    <div key={i} className="flex-1 bg-navy-900 rounded-t-sm flex items-end">
                      <div 
                        className={`w-full rounded-t-sm transition-all duration-1000 ${i === 6 ? 'bg-violet-500' : 'bg-violet-500/50 hover:bg-violet-400'}`} 
                        style={{ height: `${height}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-slate-500 font-medium">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
                <div className="mt-6 p-4 bg-navy-900 rounded-xl text-center">
                  <div className="font-bold text-white">14 Day Streak! 🔥</div>
                  <div className="text-sm text-slate-400">Keep it up to unlock your next badge.</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="max-w-4xl mx-auto w-full space-y-6">
            <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
            
            <div className="bg-navy-800 rounded-2xl border border-navy-700 overflow-hidden">
              <div className="p-6 border-b border-navy-700 flex items-center gap-6">
                <div className="w-24 h-24 bg-violet-600 rounded-full flex items-center justify-center text-4xl font-bold uppercase">
                  {userName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{userName}</h3>
                  <p className="text-slate-400">{userEmail}</p>
                  <button className="mt-2 text-sm text-violet-400 hover:text-violet-300 font-medium transition">
                    Change Avatar
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-8">
                {/* Profile Information */}
                <div>
                  <h4 className="font-bold text-lg mb-4 text-white">Profile Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        value={userName} 
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full bg-navy-900 border border-navy-600 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-violet-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Email Address</label>
                      <input 
                        type="email" 
                        value={userEmail} 
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="w-full bg-navy-900 border border-navy-600 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-violet-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Location</label>
                      <input type="text" defaultValue="San Francisco, CA" className="w-full bg-navy-900 border border-navy-600 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-violet-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Phone Number</label>
                      <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full bg-navy-900 border border-navy-600 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-violet-500" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-400 mb-1">Short Bio</label>
                      <textarea defaultValue="Passionate software engineer building web applications." className="w-full bg-navy-900 border border-navy-600 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-violet-500 h-24 resize-none"></textarea>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-400 mb-1">Target Career Goal</label>
                      <select className="w-full bg-navy-900 border border-navy-600 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-violet-500">
                        <option>Full-Stack Engineer</option>
                        <option>Frontend Developer</option>
                        <option>Backend Developer</option>
                        <option>Data Scientist</option>
                        <option>Product Manager</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Theme Preferences */}
                <div className="pt-8 border-t border-navy-700">
                  <h4 className="font-bold text-lg mb-4 text-white">Appearance</h4>
                  <div className="grid grid-cols-3 gap-4 max-w-lg">
                    <button 
                      onClick={() => setTheme('dark')} 
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition ${theme === 'dark' ? 'border-violet-500 bg-navy-900' : 'border-navy-700 hover:border-navy-500 bg-navy-900'}`}
                    >
                      <div className="w-12 h-12 bg-navy-800 rounded-full flex items-center justify-center">🌙</div>
                      <span className={`text-sm font-bold ${theme === 'dark' ? 'text-violet-400' : 'text-slate-400'}`}>Dark Mode</span>
                    </button>
                    <button 
                      onClick={() => setTheme('light')} 
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition ${theme === 'light' ? 'border-violet-500 bg-navy-900' : 'border-navy-700 hover:border-navy-500 bg-navy-900'}`}
                    >
                      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">☀️</div>
                      <span className={`text-sm font-bold ${theme === 'light' ? 'text-violet-400' : 'text-slate-400'}`}>Light Mode</span>
                    </button>
                    <button 
                      onClick={() => setTheme('dark')} 
                      className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-navy-700 hover:border-navy-500 bg-navy-900 transition"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-slate-100 to-navy-800 rounded-full flex items-center justify-center">💻</div>
                      <span className="text-sm font-bold text-slate-400">System</span>
                    </button>
                  </div>
                </div>

                {/* API Keys (Mock) */}
                <div className="pt-8 border-t border-navy-700">
                  <h4 className="font-bold text-lg mb-4 text-white">AI Provider Settings</h4>
                  <p className="text-sm text-slate-400 mb-4">Connect your own API keys to power the AI Mentor, Resume Analyzer, and Mock Interviews.</p>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">OpenAI API Key</label>
                      <input type="password" placeholder="sk-..." className="w-full bg-navy-900 border border-navy-600 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-violet-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Google Gemini API Key</label>
                      <input type="password" placeholder="AIza..." className="w-full bg-navy-900 border border-navy-600 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-violet-500" />
                    </div>
                  </div>
                </div>

                {/* Notifications */}
                <div className="pt-8 border-t border-navy-700">
                  <h4 className="font-bold text-lg mb-4 text-white">Notifications</h4>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-navy-600 bg-navy-900 accent-violet-600" />
                      <span className="text-slate-300">Daily Study Reminders</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-navy-600 bg-navy-900 accent-violet-600" />
                      <span className="text-slate-300">Interview Practice Alerts</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 rounded border-navy-600 bg-navy-900 accent-violet-600" />
                      <span className="text-slate-300">Marketing Emails</span>
                    </label>
                  </div>
                </div>

                <div className="pt-8 flex justify-end">
                  <button 
                    onClick={() => alert('Settings successfully saved to your profile! (Mock Mode)')}
                    className="bg-violet-600 hover:bg-violet-500 px-8 py-2 rounded-lg font-bold transition flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5" /> Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
