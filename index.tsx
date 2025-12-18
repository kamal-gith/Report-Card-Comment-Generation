
import React, { useState, useEffect } from 'react';
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
            backgroundColor: ['#714B67', '#017E84', '#8F8F8F'][i % 3],
            animationDelay: `${Math.random() * 0.6}s`
          }}
        />
      ))}
    </div>
  );
};

const EXAMPLE_DATA = {
  name: 'Jalaludeen Adobanyi',
  strengths: 'excellent group work, deep analytical skills',
  weaknesses: 'should focus on meeting deadlines, needs more drafting time',
};

const STEPS = [
  { id: 'name', title: 'Student Name', icon: User, description: 'Enter the pupil name' },
  { id: 'strengths', title: 'Strengths', icon: Zap, description: 'What are they good at?' },
  { id: 'weaknesses', title: 'Focus Areas', icon: Target, description: 'Where can they improve?' },
  { id: 'tone', title: 'Voice', icon: MessageSquare, description: 'Pick a report style' },
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
    setCurrentStep(3);
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
      setError('Missing information. Please complete all steps.');
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
    if (currentStep === 1) return formData.strengths.trim().length > 2;
    if (currentStep === 2) return formData.weaknesses.trim().length > 2;
    return true;
  };

  const renderStepContent = () => {
    const activeStepId = STEPS[currentStep].id;
    const animationClass = direction === 'forward' ? 'animate-slideInRight' : 'animate-slideInLeft';

    switch (activeStepId) {
      case 'name':
        return (
          <div className={`space-y-3 ${animationClass}`}>
            <label className="block text-[10px] font-bold text-brand-gray uppercase tracking-widest">Student Full Name</label>
            <input
              autoFocus
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === 'Enter' && isStepValid() && nextStep()}
              placeholder="e.g. Jalaludeen Adobanyi"
              className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-brand-gray/30 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all text-sm dark:text-white"
            />
          </div>
        );
      case 'strengths':
        return (
          <div className={`space-y-3 ${animationClass}`}>
            <label className="block text-[10px] font-bold text-brand-gray uppercase tracking-widest">Notable Strengths</label>
            <textarea
              autoFocus
              name="strengths"
              value={formData.strengths}
              onChange={handleInputChange}
              rows={3}
              placeholder="What have they done well?"
              className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-brand-gray/30 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all resize-none text-sm dark:text-white"
            />
          </div>
        );
      case 'weaknesses':
        return (
          <div className={`space-y-3 ${animationClass}`}>
            <label className="block text-[10px] font-bold text-brand-gray uppercase tracking-widest">Areas for growth</label>
            <textarea
              autoFocus
              name="weaknesses"
              value={formData.weaknesses}
              onChange={handleInputChange}
              rows={3}
              placeholder="What needs a bit more work?"
              className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-brand-gray/30 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all resize-none text-sm dark:text-white"
            />
          </div>
        );
      case 'tone':
        return (
          <div className={`space-y-3 ${animationClass}`}>
            <label className="block text-[10px] font-bold text-brand-gray uppercase tracking-widest">Report Tone</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'encouraging', label: 'Motivating' },
                { id: 'firm-supportive', label: 'Direct' },
                { id: 'outstanding', label: 'Outstanding' },
                { id: 'needs-improvement', label: 'Constructive' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTone(t.id)}
                  className={`p-3 text-center rounded-xl border transition-all text-xs font-semibold ${
                    tone === t.id 
                      ? 'bg-brand-primary border-brand-primary text-white shadow-md' 
                      : 'bg-white dark:bg-zinc-900 border-brand-gray/20 dark:border-zinc-800 text-brand-gray dark:text-zinc-400 hover:border-brand-primary'
                  }`}
                >
                  {t.label}
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
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-brand-primary dark:text-zinc-100 font-sans transition-colors duration-200">
      {/* Header */}
      <header className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-brand-gray/10 sticky top-0 z-50 transition-colors">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center gap-2 text-brand-primary dark:text-zinc-100 cursor-pointer group"
              onClick={() => {
                setView('home');
                setCurrentStep(0);
                setGeneratedComment('');
              }}
            >
              <div className="bg-brand-primary/10 p-1.5 rounded-lg">
                <BookOpen className="w-5 h-5 text-brand-primary" />
              </div>
              <h1 className="text-lg font-extrabold tracking-tight">
                specAI
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-brand-gray/5 text-brand-gray transition-all active:scale-90"
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {view === 'home' ? (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4 py-12 text-center">
          <div className="max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/5 text-brand-primary text-[10px] font-bold mb-6 border border-brand-primary/10">
              <Sparkles className="w-3 h-3" />
              <span>BY SPRING ED CONSULTING</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-brand-primary dark:text-white mb-6 leading-tight">
              The Smartest Way<br /><span className="text-brand-secondary">to Write Comments.</span>
            </h2>
            <p className="text-base text-brand-gray dark:text-zinc-400 mb-10 leading-relaxed max-w-md mx-auto">
              Draft personalized, professional end-of-term comments in minutes, not hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setView('app')}
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-brand-primary hover:opacity-90 text-white font-bold rounded-xl shadow-xl shadow-brand-primary/20 transition-all hover:scale-[1.02] active:scale-95 text-base"
              >
                Launch Builder
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <main className="max-w-xl mx-auto p-4 md:p-8 pt-12">
          
          {/* Step Meta */}
          {!generatedComment && (
            <div className="mb-6 animate-in fade-in duration-500">
               <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-brand-primary/5 flex items-center justify-center">
                   {React.createElement(STEPS[currentStep].icon, { className: "w-5 h-5 text-brand-primary" })}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-brand-primary dark:text-zinc-100 uppercase tracking-widest">{STEPS[currentStep].title}</h3>
                  <p className="text-brand-gray text-[10px] font-medium">{STEPS[currentStep].description}</p>
                </div>
              </div>
              
              <div className="h-1 w-full bg-brand-gray/10 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-brand-primary transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}

          {/* Stepper Card */}
          {!generatedComment ? (
            <div className="bg-brand-muted dark:bg-brand-darkMuted rounded-2xl border border-brand-gray/10 p-6 md:p-8 transition-all duration-300">
              
              <div className="mb-6">
                {renderStepContent()}
              </div>

              <div className="flex items-center justify-between gap-4 pt-2">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs transition-all ${
                    currentStep === 0 
                      ? 'opacity-0 cursor-default' 
                      : 'text-brand-gray hover:text-brand-primary hover:bg-brand-primary/5'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                {currentStep === STEPS.length - 1 ? (
                  <button
                    onClick={generateReport}
                    disabled={loading || !isStepValid()}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary hover:opacity-90 disabled:bg-brand-gray/20 disabled:text-brand-gray text-white font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-95 text-xs"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    {loading ? 'Drafting...' : 'Build Comment'}
                  </button>
                ) : (
                  <button
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary hover:opacity-90 disabled:bg-brand-gray/20 disabled:text-brand-gray text-white font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-95 text-xs"
                  >
                    Continue
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Result Section */
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-6">
              <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl shadow-brand-primary/5 border border-brand-primary/10 p-8 relative overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-secondary/10 flex items-center justify-center text-brand-secondary">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-sm font-black text-brand-primary dark:text-white uppercase tracking-tighter">Drafted Report</h2>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                      copied 
                        ? 'bg-brand-secondary text-white' 
                        : 'bg-brand-primary/5 text-brand-primary hover:bg-brand-primary/10'
                    }`}
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>

                <div className="p-6 bg-brand-muted dark:bg-zinc-800 rounded-2xl border border-brand-primary/5">
                  <p className="text-lg leading-relaxed text-brand-primary dark:text-zinc-200 font-medium italic">
                    "{generatedComment}"
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-brand-gray/10 pt-6">
                  <div className="flex items-center gap-4 text-[10px] text-brand-gray font-bold uppercase tracking-widest">
                    <span>{formData.name}</span>
                    <span className="w-1 h-1 rounded-full bg-brand-gray/30" />
                    <span>{generatedComment.split(' ').length} words</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setGeneratedComment('');
                        setCurrentStep(0);
                      }}
                      className="px-4 py-2 rounded-lg text-brand-gray hover:text-brand-primary text-xs font-bold transition-all"
                    >
                      New Student
                    </button>
                    <button
                      onClick={generateReport}
                      className="flex items-center gap-2 px-4 py-2 bg-brand-primary/5 border border-brand-primary/10 rounded-lg text-brand-primary text-xs font-bold hover:bg-brand-primary/10 transition-all group"
                    >
                      <RefreshCcw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                      Rewrite
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-600 text-xs font-bold rounded-xl text-center border border-red-100">
              {error}
            </div>
          )}
        </main>
      )}

      {showConfetti && <Confetti />}

      <footer className="fixed bottom-0 left-0 w-full border-t border-brand-gray/10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm transition-colors z-40">
        <div className="max-w-5xl mx-auto px-4 py-3 text-center text-[9px] text-brand-gray font-bold uppercase tracking-[0.2em]">
          <p>
            Secure Assistant • Spring Ed Consulting • specAI
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
