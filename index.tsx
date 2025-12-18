
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

import { 
  Loader2, 
  Copy, 
  Check, 
  Sparkles, 
  GraduationCap, 
  RefreshCcw, 
  BookOpen, 
  Wand2, 
  X, 
  Sun, 
  Moon, 
  ArrowRight, 
  ArrowLeft,
  ChevronRight,
  User,
  Zap,
  Target,
  MessageSquare
} from 'lucide-react';


const Confetti = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {Array.from({ length: 24 }).map((_, i) => (
        <span
          key={i}
          className="absolute top-0 w-2 h-2 rounded-full animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: ['#6366f1', '#a855f7', '#ec4899', '#22c55e'][i % 4],
            animationDelay: `${Math.random() * 0.6}s`
          }}
        />
      ))}
    </div>
  );
};

const EXAMPLE_DATA = {
  name: 'Jalaludeen Adobanyi',
  strengths: 'good reading pace, active participation',
  weaknesses: 'needs better handwriting, sometimes rushes tasks',
};

const STEPS = [
  { id: 'name', title: 'Student Name', icon: User, description: 'Who are we writing about?' },
  { id: 'strengths', title: 'Strengths', icon: Zap, description: 'What did they excel at this term?' },
  { id: 'weaknesses', title: 'Focus Areas', icon: Target, description: 'What can they improve upon?' },
  { id: 'tone', title: 'Voice', icon: MessageSquare, description: 'Choose the tone of the comment.' },
];

const App = () => {
  const [view, setView] = useState<'home' | 'app'>('home');
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [formData, setFormData] = useState({
    name: '',
    strengths: '',
    weaknesses: '',
  });

  const [generatedComment, setGeneratedComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [tone, setTone] = useState('encouraging');
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  const [showToast, setShowToast] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setDirection('forward');
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setDirection('backward');
      setCurrentStep(prev => prev - 1);
    }
  };

  const fillExample = () => {
    setFormData(EXAMPLE_DATA);
    setCurrentStep(3); // Go to final step to show results
    setError('');
  };

  const handleCopy = () => {
    if (!generatedComment) return;
    navigator.clipboard.writeText(generatedComment);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateReport = async () => {
    if (!formData.name || !formData.strengths || !formData.weaknesses) {
      setError('Please ensure all student details are filled before generating.');
      return;
    }

    setError('');
    setLoading(true);
    setGeneratedComment('');

    try {
      const prompt = `
    Task: Write a short end-of-term report comment for a pupil. Use clear and natural English.
    Tone: ${tone.replace('-', ' ')}
    Pupil name: ${formData.name}
    Strengths: ${formData.strengths}
    Areas for improvement: ${formData.weaknesses}
    Guidelines:
    1. Keep the comment between 2 and 4 sentences.
    2. Use the stated tone consistently.
    3. Mention the pupil by name once at the beginning.
    4. Refer to the strengths directly.
    5. Address the areas to improve without sounding harsh.
    6. Avoid exaggerated praise or negative language.
        `.trim();

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, tone }),
      });

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();

      if (data.text) {
        setGeneratedComment(data.text.trim().replace(/^"|"$/g, ''));
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 1800);
      } else {
        setError("No response received from the model.");
      }

    } catch (err) {
      console.error(err);
      setError('Failed to generate comment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isStepValid = () => {
    if (currentStep === 0) return formData.name.trim().length > 0;
    if (currentStep === 1) return formData.strengths.trim().length > 3;
    if (currentStep === 2) return formData.weaknesses.trim().length > 3;
    return true;
  };

  const renderStepContent = () => {
    const activeStepId = STEPS[currentStep].id;
    const animationClass = direction === 'forward' ? 'animate-slideInRight' : 'animate-slideInLeft';

    switch (activeStepId) {
      case 'name':
        return (
          <div className={`space-y-4 ${animationClass}`}>
            <label className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Full Name</label>
            <input
              autoFocus
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === 'Enter' && isStepValid() && nextStep()}
              placeholder="e.g. Jalaludeen Adobanyi"
              className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-base dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-700"
            />
          </div>
        );
      case 'strengths':
        return (
          <div className={`space-y-4 ${animationClass}`}>
            <label className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">What are their strengths?</label>
            <textarea
              autoFocus
              name="strengths"
              value={formData.strengths}
              onChange={handleInputChange}
              rows={3}
              placeholder="e.g. excellent collaboration, strong mathematical reasoning..."
              className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none text-base dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-700"
            />
          </div>
        );
      case 'weaknesses':
        return (
          <div className={`space-y-4 ${animationClass}`}>
            <label className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Areas for growth?</label>
            <textarea
              autoFocus
              name="weaknesses"
              value={formData.weaknesses}
              onChange={handleInputChange}
              rows={3}
              placeholder="e.g. could work on punctuation, needs to participate more in class..."
              className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none text-base dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-700"
            />
          </div>
        );
      case 'tone':
        return (
          <div className={`space-y-4 ${animationClass}`}>
            <label className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Select Comment Tone</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { id: 'encouraging', label: 'Encouraging', desc: 'Positive and motivating' },
                { id: 'firm-supportive', label: 'Firm/Supportive', desc: 'Clear and direct' },
                { id: 'outstanding', label: 'Outstanding', desc: 'Highly celebratory' },
                { id: 'needs-improvement', label: 'Improvement', desc: 'Constructive focus' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTone(t.id)}
                  className={`p-3 text-left rounded-xl border transition-all ${
                    tone === t.id 
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-500/20' 
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-indigo-400'
                  }`}
                >
                  <div className="font-bold text-sm">{t.label}</div>
                  <div className={`text-[10px] ${tone === t.id ? 'text-indigo-100' : 'text-slate-400'}`}>{t.desc}</div>
                </button>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const progressPercentage = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-100 selection:text-indigo-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-200">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 cursor-pointer group"
              onClick={() => {
                setView('home');
                setCurrentStep(0);
                setGeneratedComment('');
              }}
            >
              <div className="bg-indigo-100 dark:bg-indigo-900/40 p-1.5 rounded-lg group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <h1 className="text-lg font-bold tracking-tight">
                Report Assistant
              </h1>
            </div>

            <div className="flex items-center gap-4">
               <div className="hidden sm:flex text-xs text-slate-500 dark:text-slate-400 items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>specAI</span>
              </div>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-90"
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {view === 'home' ? (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4 py-12 text-center">
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-6 border border-indigo-100 dark:border-indigo-800">
              <Sparkles className="w-3 h-3" />
              <span>Personalized for every student</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 leading-[1.1]">
              Write like <br /><span className="text-indigo-600 dark:text-indigo-400 ">You Know Your Students.</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-lg mx-auto">
              Save hours of thinking time. Keep Your Comments Warm and Customised for Each Student.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button
                onClick={() => setView('app')}
                className="group relative inline-flex items-center gap-2 px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95 text-lg"
              >
                Start Writing
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button 
                onClick={fillExample}
                className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 font-semibold transition-colors flex items-center gap-2"
              >
                <Wand2 className="w-4 h-4" />
                See an example
              </button>
            </div>
          </div>
        </div>
      ) : (
        <main className="max-w-2xl mx-auto p-4 md:p-8 pb-32">
          
          {/* Progress Indicator */}
          {!generatedComment && (
            <div className="mb-8 animate-in fade-in duration-700">
              <div className="flex justify-between items-end mb-3">
                <div>
                  <h3 className="text-xl font-bold dark:text-white flex items-center gap-2">
                    {React.createElement(STEPS[currentStep].icon, { className: "w-5 h-5 text-indigo-600" })}
                    {STEPS[currentStep].title}
                  </h3>
                  <p className="text-slate-400 dark:text-slate-500 text-xs">{STEPS[currentStep].description}</p>
                </div>
                <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
                  Step {currentStep + 1} of {STEPS.length}
                </div>
              </div>
              
              <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-500 ease-out rounded-full shadow-[0_0_10px_rgba(79,70,229,0.3)]"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}

          {/* Stepper Card */}
          {!generatedComment ? (
            <div className="bg-slate-100/50 dark:bg-slate-900/50 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 p-6 md:p-8 transition-all duration-300">
              
              <div className="mb-8">
                {renderStepContent()}
              </div>

              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                    currentStep === 0 
                      ? 'opacity-0 cursor-default' 
                      : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                {currentStep === STEPS.length - 1 ? (
                  <button
                    onClick={generateReport}
                    disabled={loading || !isStepValid()}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/10 transition-all hover:scale-[1.02] active:scale-95 text-sm"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    {loading ? 'Writing...' : 'Create Comment'}
                  </button>
                ) : (
                  <button
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/10 transition-all hover:scale-[1.02] active:scale-95 text-sm"
                  >
                    Next Step
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Result Section */
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8">
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-slate-200 dark:shadow-none border-4 border-indigo-50 dark:border-indigo-900/20 p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <Sparkles className="w-32 h-32 text-indigo-600" />
                </div>

                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <Check className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Drafted Comment</h2>
                      <p className="text-xs text-slate-400 uppercase font-semibold tracking-widest">{tone} tone</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold transition-all ${
                      copied 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100'
                    }`}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied' : 'Copy Text'}
                  </button>
                </div>

                <div className="relative">
                  <div className="p-8 bg-slate-50 dark:bg-slate-950/50 rounded-3xl border-2 border-slate-100 dark:border-slate-800/50">
                    <p className="text-xl md:text-2xl leading-relaxed text-slate-700 dark:text-slate-200 font-medium italic">
                      "{generatedComment}"
                    </p>
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-sm text-slate-400 font-medium">
                    <span className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4" /> {formData.name}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span>{generatedComment.split(' ').length} words</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setGeneratedComment('');
                        setCurrentStep(0);
                      }}
                      className="px-6 py-3 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold transition-all"
                    >
                      Start New
                    </button>
                    <button
                      onClick={generateReport}
                      className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl font-bold hover:border-indigo-500 transition-all group"
                    >
                      <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                      Rewrite
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-2xl text-center border-2 border-red-100 dark:border-red-900/30 animate-in shake duration-300">
              {error}
            </div>
          )}
        </main>
      )}

      {showConfetti && <Confetti />}

      <footer className="fixed bottom-0 left-0 w-full border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm transition-colors duration-200 z-40">
        <div className="max-w-5xl mx-auto px-4 py-3 text-center text-[10px] sm:text-xs text-slate-400 dark:text-slate-500">
          <p>
            Private & Secure: Data is only used for generation and never stored. Built for educators by Spring Ed Consulting (spec).
          </p>
        </div>
      </footer>
    </div>
  );
};

const container = document.getElementById('root') || document.getElementById('app');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
