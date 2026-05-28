/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { FeaturedServices } from './components/sections/FeaturedServices';
import { TechnologyExpertise } from './components/sections/TechnologyExpertise';
import { ProcessSection } from './components/sections/ProcessSection';
import { StatsSection } from './components/sections/StatsSection';
import { WhyChooseUsSection } from './components/sections/WhyChooseUsSection';
import { GallerySection } from './components/sections/GallerySection';
import { ContactSection } from './components/sections/ContactSection';
import { ActiveMandatesSection } from './components/sections/ActiveMandatesSection';
import { CyberSecurityPage } from './components/pages/CyberSecurityPage';
import { ATSPage } from './components/pages/ATSPage';
import { AssessmentToolPage } from './components/pages/AssessmentToolPage';
import { AdminPanel } from './components/AdminPanel';
import { Job } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'admin') {
        setCurrentView('admin');
        window.scrollTo(0, 0);
      } else if (hash === 'careers') {
        setCurrentView('careers');
        window.scrollTo(0, 0);
      } else if (hash === 'cyber-security') {
        setCurrentView('cyber-security');
        window.scrollTo(0, 0);
      } else if (hash === 'ats') {
        setCurrentView('ats');
        window.scrollTo(0, 0);
      } else if (hash === 'assessment-tool') {
        setCurrentView('assessment-tool');
        window.scrollTo(0, 0);
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    // Fetch jobs from backend API
    fetch('/api/jobs.php')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setJobs(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching jobs:', err);
        setLoading(false);
      });

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (currentView === 'home' && window.location.hash) {
      const targetId = window.location.hash.replace('#', '');
      const validHomeHashes = ['expertise', 'services', 'approach', 'careers'];
      if (validHomeHashes.includes(targetId)) {
        const timer = setTimeout(() => {
          document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [currentView]);

  return (
    <div className="relative bg-white selection:bg-accent/20">
      {currentView !== 'admin' && <Navbar />}

      <main className={currentView === 'careers' ? 'pt-20' : ''}>
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero />
              <FeaturedServices />
              <div className="relative"><TechnologyExpertise /></div>
              <ProcessSection />
              <StatsSection />
              <WhyChooseUsSection />
              <GallerySection />
              <ContactSection />
            </motion.div>
          )}

          {currentView === 'careers' && (
            <motion.div
              key="careers"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ActiveMandatesSection jobs={jobs} />
            </motion.div>
          )}

          {currentView === 'cyber-security' && (
            <motion.div
              key="cyber-security"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <CyberSecurityPage />
            </motion.div>
          )}

          {currentView === 'ats' && (
            <motion.div
              key="ats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ATSPage />
            </motion.div>
          )}

          {currentView === 'assessment-tool' && (
            <motion.div
              key="assessment-tool"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <AssessmentToolPage />
            </motion.div>
          )}

          {currentView === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative bg-dark-bg min-h-screen pt-20"
            >
              <div className="fixed top-6 left-6 z-[100]">
                <button
                  onClick={() => { window.location.hash = ''; }}
                  className="flex items-center gap-2 text-white/50 hover:text-white transition-colors uppercase tracking-widest text-[10px] font-black"
                >
                  <ChevronRight className="rotate-180 w-4 h-4" /> Back to Site
                </button>
              </div>
              <AdminPanel jobs={jobs} setJobs={setJobs} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {currentView !== 'admin' && <Footer />}
    </div>
  );
}
