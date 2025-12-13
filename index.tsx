import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

import { Loader2, Copy, Check, Sparkles, GraduationCap, RefreshCcw, BookOpen, Wand2 } from 'lucide-react';


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


const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    className: '',
    strengths: '',
    weaknesses: '',
    behaviour: '',
    notes: ''
  });
  const [generatedComment, setGeneratedComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [tone, setTone] = useState('encouraging');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const hasOutput = Boolean(generatedComment);
  const [showToast, setShowToast] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const fillExample = () => {
    setFormData({
      name: 'Jalaludeen Adobanyi',
      className: 'Primary 1',
      strengths: 'good reading pace, active participation',
      weaknesses: 'needs better handwriting, sometimes rushes tasks',
      behaviour: 'polite and attentive',
      notes: 'steady improvement this term'
    });
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
    Class: ${formData.className}
    Strengths: ${formData.strengths}
    Areas for improvement: ${formData.weaknesses}
    Behaviour/attitude: ${formData.behaviour}
    Other notes: ${formData.notes}

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
      if (data.text) {
        setGeneratedComment(data.text.trim().replace(/^"|"$/g, ''));
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 1800);
    }
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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
            <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2 text-indigo-600">
                    <BookOpen className="w-6 h-6" />
                    <h1 className="text-xl font-bold tracking-tight">Report Comment AI</h1>
                </div>
                <div className="text-sm text-slate-500 hidden sm:flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    A Product of Kaso Global Technologies
                </div>
            </div>
        </header>

        <main className={`max-w-5xl mx-auto p-4 md:p-8 gap-8 ${
            hasOutput? 'grid md:grid-cols-2' : 'flex justify-center'}`}>
            {/* Input Form */}
            <div className={`space-y-6 w-full ${!hasOutput ? 'max-w-xl' : ''}`}>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                                <GraduationCap className="w-5 h-5" />
                            </div>
                            <h2 className="text-lg font-semibold text-slate-800">Student Details</h2>
                        </div>
                        <button 
                            onClick={fillExample}
                            className="text-xs font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
                        >
                            <Wand2 className="w-3 h-3" />
                            Load Example
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="e.g. Jalaludeen Adobanyi"
                                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Class</label>
                            <input
                                type="text"
                                name="className"
                                value={formData.className}
                                onChange={handleInputChange}
                                placeholder="e.g. Primary 1"
                                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                            />
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Strengths *</label>
                            <textarea
                                name="strengths"
                                value={formData.strengths}
                                onChange={handleInputChange}
                                rows={2}
                                placeholder="e.g. good reading pace, active participation..."
                                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none text-sm"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Areas for Improvement*</label>
                            <textarea
                                name="weaknesses"
                                value={formData.weaknesses}
                                onChange={handleInputChange}
                                rows={2}
                                placeholder="e.g. needs better handwriting, sometimes rushes tasks..."
                                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none text-sm"
                            />
                        </div>

                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                             <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Behaviour</label>
                                <input
                                    type="text"
                                    name="behaviour"
                                    value={formData.behaviour}
                                    onChange={handleInputChange}
                                    placeholder="e.g. polite and attentive"
                                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Other Notes</label>
                                <input
                                    type="text"
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                    placeholder="e.g. steady improvement"
                                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>


                <div>
                    <label className="block text-sm font-medium mb-1">
                        Comment tone
                    </label>
                    <select
                        value={tone}
                        onChange={(e) => setTone(e.target.value)}
                        className="w-full border rounded px-3 py-2"
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
                    className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium rounded-xl shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2"
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
                {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center">{error}</div>}
            </div>

                {/* Output Section */}
    {generatedComment && (
    <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-full flex flex-col relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

        <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-800">Generated Comment</h2>
            <button
            onClick={handleCopy}
            className="text-xs flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-full transition-colors font-medium border border-indigo-100"
            >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
            </button>
        </div>

        <div className="flex-grow">
            <div className="prose prose-slate max-w-none">
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 relative">
                <div className="absolute -top-3 left-4 bg-white px-2 text-slate-400">
                <span className="text-2xl font-serif">“</span>
                </div>
                <p className="text-lg leading-relaxed text-slate-700 font-medium italic">
                {generatedComment}
                </p>
                <div className="absolute -bottom-5 right-4 bg-white px-2 text-slate-400">
                <span className="text-2xl font-serif">”</span>
                </div>
            </div>
            </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400 font-medium">
            <span>{generatedComment.split(' ').length} words</span>
            <button
            onClick={generateReport}
            className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors"
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
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-slate-100 text-sm shadow-lg">
      <Check className="w-4 h-4 text-emerald-400" />
      <span>Comment generated</span>
    </div>
  </div>
)}


    </div>
  );
};

const container = document.getElementById('root') || document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
