import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Sparkles, Globe, Target } from 'lucide-react';
import { Job } from '../../types';
import { ApplyModal } from '../shared/ApplyModal';

interface ActiveMandatesSectionProps {
  jobs: Job[];
}

export const ActiveMandatesSection = ({ jobs }: ActiveMandatesSectionProps) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 9;

  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const currentJobs = jobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

  return (
    <>
      <ApplyModal
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        jobTitle={selectedJob?.title || ''}
      />
      <section id="careers" className="bg-[#FBFBFB] pb-24 overflow-hidden relative snap-start">
        {/* Modern grid background for the entire section */}
        <div className="absolute inset-0 grid-pattern opacity-[0.02] pointer-events-none" />

        {/* Top-right decorative accent */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="section-container !pt-16 md:!pt-20 relative z-10 w-full">
          <div className="mb-12 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-semibold mb-3 tracking-tight text-primary">
                Active <span className="text-accent">Mandates</span>
              </h2>
              <p className="text-muted/60 text-base leading-relaxed max-w-xl mx-auto">
                We bridge the gap between elite talent and industry-shaping organizations.
              </p>
            </motion.div>
          </div>

          <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
            {jobs.length === 0 ? (
              <div className="bg-[#F9FAFB] border border-black/5 rounded-[3.5rem] py-24 text-center shadow-sm">
                <Sparkles className="w-12 h-12 text-accent/20 mx-auto mb-6" />
                <p className="text-muted/60 text-base italic text-primary/40">Exclusive strategic mandates are currently being finalized.</p>
                <p className="text-muted/40 text-[10px] font-black uppercase tracking-widest mt-4">Check back shortly for premium opportunities.</p>
              </div>
            ) : (
              <>
                {currentJobs.map((job, idx) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: idx * 0.08,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    viewport={{ once: true }}
                    className="group relative mb-6 last:mb-0"
                  >
                    <div className="relative bg-white hover:bg-[#F8FAFF] border border-black/[0.04] hover:border-accent/10 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-[0_8px_24px_-8px_rgba(31,81,255,0.08)] hover:-translate-y-0.5">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex flex-col gap-3 flex-1">
                          <div className="flex items-center gap-3">
                            <span className="px-2.5 py-1 rounded-full bg-accent/5 text-accent text-[10px] font-semibold uppercase tracking-wider border border-accent/10">
                              Open Role
                            </span>
                          </div>

                          <h3 className="text-xl md:text-2xl font-semibold text-primary tracking-tight group-hover:text-accent transition-colors duration-200">
                            {job.title}
                          </h3>

                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
                            <span className="flex items-center gap-1.5">
                              <Globe className="w-3.5 h-3.5" />
                              {job.mode}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-muted/30" />
                            <span className="flex items-center gap-1.5">
                              <Target className="w-3.5 h-3.5" />
                              {job.location}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => setSelectedJob(job)}
                            className="bg-accent text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-accent/90 hover:shadow-lg transition-all duration-200 whitespace-nowrap"
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-6 mt-12 mb-4">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-white transition-all"
                    >
                      <ArrowLeft className="w-5 h-5 text-gray-900" />
                    </button>
                    <span className="text-[15px] font-medium text-gray-500">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-white transition-all"
                    >
                      <ArrowRight className="w-5 h-5 text-gray-900" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
