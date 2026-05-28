import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, X, Plus, ArrowRight } from 'lucide-react';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
}

export const ApplyModal = ({ isOpen, onClose, jobTitle }: ApplyModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('message', formData.message);
      data.append('jobTitle', jobTitle);
      if (file) {
        data.append('resume', file);
      }

      const response = await fetch('/api/apply.php', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
        setFile(null);
        onClose();
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white border border-black/5 p-8 md:p-12 rounded-[3rem] max-w-xl w-full relative shadow-2xl overflow-hidden"
      >
        {isSubmitted ? (
          <div className="py-12 text-center">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-3xl font-display font-medium text-primary mb-2">Application Sent</h3>
            <p className="text-muted/60">Our strategic team will review your profile for {jobTitle}.</p>
          </div>
        ) : (
          <>
            <button
              onClick={onClose}
              className="absolute top-8 right-8 p-2 rounded-full hover:bg-black/5 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mb-10">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-4 inline-block">Direct Application</span>
              <h3 className="text-3xl font-display font-medium text-primary tracking-tight">Applying for <br /><span className="italic text-muted/40 font-light">{jobTitle}</span></h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-2">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-black/5 border border-transparent focus:border-accent focus:bg-white rounded-2xl px-6 py-4 text-sm transition-all outline-none"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-2">Email</label>
                  <input
                    required
                    type="email"
                    placeholder="john@company.com"
                    className="w-full bg-black/5 border border-transparent focus:border-accent focus:bg-white rounded-2xl px-6 py-4 text-sm transition-all outline-none"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-2">Resume / CV</label>
                <div className="relative group">
                  <input
                    required
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                  <div className={`w-full bg-black/5 border-2 border-dashed ${file ? 'border-accent' : 'border-black/10'} group-hover:border-accent/40 rounded-2xl px-6 py-8 text-center transition-all`}>
                    <Plus className={`w-6 h-6 ${file ? 'text-accent' : 'text-muted'} group-hover:text-accent mx-auto mb-2 transition-colors`} />
                    <p className="text-xs text-muted/60 font-medium">
                      {file ? file.name : 'Upload PDF, DOCX (Max 10MB)'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-2">Strategic Cover Message</label>
                <textarea
                  rows={4}
                  placeholder="Briefly highlight your value proposition..."
                  className="w-full bg-black/5 border border-transparent focus:border-accent focus:bg-white rounded-2xl px-6 py-4 text-sm transition-all outline-none resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

              <button
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-accent transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Submit Application'} <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};
