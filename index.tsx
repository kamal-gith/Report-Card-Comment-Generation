import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import { Loader2, Copy, Check, Sparkles, GraduationCap, RefreshCcw, BookOpen, Wand2, X, Sun, Moon } from 'lucide-react';


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
  behaviour: 'polite and attentive',
  notes: 'steady improvement this term'
};

const App = () => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const hasOutput = Boolean(generatedComment);
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

  const fillExample = () => {
  const isExampleLoaded =
    formData.name === EXAMPLE_DATA.name &&
    formData.strengths === EXAMPLE_DATA.strengths &&
    formData.weaknesses === EXAMPLE_DATA.weaknesses;

  if (isExampleLoaded) {
    setFormData({
      name: '',
      strengths: '',
      weaknesses: '',
      
    });
  } else {
    setFormData(EXAMPLE_DATA);
  }

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
    setError('Please fill in at least the Name, Strengths and Area for Improvement fields to generate a report.');
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

    if (!response.ok) {
      throw new Error("Server error");
    }

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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-100 selection:text-indigo-900 transition-colors duration-200">
        {/* Header */}
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10 transition-colors duration-200">
  <div className="max-w-5xl mx-auto px-4 py-3">
    
    {/* Top row */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
        <BookOpen className="w-6 h-6" />
        <h1 className="text-lg sm:text-xl font-bold tracking-tight">
          Report Comment Assistant
        </h1>
      </div>

      {/* Theme toggle stays with title */}
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        aria-label="Toggle theme"
      >
        {theme === 'light'
          ? <Moon className="w-5 h-5" />
          : <Sun className="w-5 h-5" />
        }
      </button>
    </div>

    {/* Second row: stacks under title on mobile */}
    <div className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2 sm:justify-end">
      <Sparkles className="w-4 h-4 text-amber-500" />
      <span>… from Spring Ed Consulting</span>
    </div>

  </div>
</header>


        <main className={`max-w-5xl mx-auto p-4 md:p-8 gap-8 pb-24 ${
            hasOutput? 'grid md:grid-cols-2' : 'flex justify-center'}`}>
            {/* Input Form */}
            <div className={`space-y-6 w-full ${!hasOutput ? 'max-w-xl' : ''}`}>
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 transition-colors duration-200">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                <GraduationCap className="w-5 h-5" />
                            </div>
                            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Student Details</h2>
                        </div>
                        <button 
                            onClick={fillExample}
                            className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
                        >
                            {formData.name === EXAMPLE_DATA.name ? (
                                <>
                                    <X className="w-3 h-3" />
                                    Clear Example
                                </>
                                 ) : (
                                    <> 
                                        <Wand2 className="w-3 h-3" /> 
                                        Load Example 
                                    </>)}
                        </button>
                    </div>
                    
                    
                    

                    <div className="space-y-5">
                    
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="e.g. Jalaludeen Adobanyi"
                                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-500 transition-all text-sm dark:text-slate-100"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Strengths *</label>
                            <textarea
                                name="strengths"
                                value={formData.strengths}
                                onChange={handleInputChange}
                                rows={2}
                                placeholder="e.g. good reading pace, active participation..."
                                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-500 transition-all resize-none text-sm dark:text-slate-100"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Areas for Improvement*</label>
                            <textarea
                                name="weaknesses"
                                value={formData.weaknesses}
                                onChange={handleInputChange}
                                rows={2}
                                placeholder="e.g. needs better handwriting, sometimes rushes tasks..."
                                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-500 transition-all resize-none text-sm dark:text-slate-100"
                            />
                        </div>

                         
                    </div>
                </div>


                <div>
                    <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
                        Comment tone
                    </label>
                    <select
                        value={tone}
                        onChange={(e) => setTone(e.target.value)}
                        className="w-full border border-slate-200 dark:border-slate-700 rounded px-3 py-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    >
                        <option value="encouraging">Encouraging</option>
                        <option value="firm-supportive">Firm but supportive</option>
                        <option value="outstanding">Outstanding performance</option>
                        <option value="needs-improvement">Needs improvement</option>
                    </select>
                </div>


                 <button
                    onClick={generateReport}
                    disabled={loading || !formData.name}
                    className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-medium rounded-xl shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Writing Comment...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-5 h-5" />
                            Generate Report Comment
                        </>
                    )}
                </button>
                {error && <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg text-center border border-red-100 dark:border-red-900/30">{error}</div>}
            </div>

                {/* Output Section */}
    {generatedComment && (
    <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 h-full flex flex-col relative overflow-hidden transition-colors duration-200">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

        <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Generated Comment</h2>
            <button
            onClick={handleCopy}
            className="text-xs flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 px-3 py-1.5 rounded-full transition-colors font-medium border border-indigo-100 dark:border-indigo-900/30"
            >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
            </button>
        </div>

        <div className="flex-grow">
            <div className="prose prose-slate dark:prose-invert max-w-none">
            <div className="p-6 bg-slate-50 dark:bg-slate-950/50 rounded-xl border border-slate-100 dark:border-slate-800 relative">
                <div className="absolute -top-3 left-4 bg-white dark:bg-slate-900 px-2 text-slate-400 dark:text-slate-500">
                <span className="text-2xl font-serif">“</span>
                </div>
                <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 font-medium italic">
                {generatedComment}
                </p>
                <div className="absolute -bottom-5 right-4 bg-white dark:bg-slate-900 px-2 text-slate-400 dark:text-slate-500">
                <span className="text-2xl font-serif">”</span>
                </div>
            </div>
            </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-400 font-medium">
            <span>{generatedComment.split(' ').length} words</span>
            <button
            onClick={generateReport}
            className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
            <RefreshCcw className="w-3.5 h-3.5" />
            Regenerate
            </button>
        </div>
        </div>
    </div>
    )}
            
        </main>
    {showConfetti && <Confetti />}

{showToast && (
  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 dark:bg-slate-700 text-slate-100 text-sm shadow-lg border border-slate-800 dark:border-slate-600">
      <Check className="w-4 h-4 text-emerald-400" />
      <span>Comment generated</span>
    </div>
  </div>
)}
 
        <footer className="sticky bottom-0 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors duration-200">
        <div className="max-w-5xl mx-auto px-4 py-4 text-center text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <p>
            Privacy note: This tool does not collect, store, or retain any user data.
            All information entered is used only to generate the report comment and is
            not saved or shared.
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