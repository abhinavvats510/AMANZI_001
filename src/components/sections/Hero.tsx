import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen lg:h-screen bg-white overflow-hidden flex items-center pt-28 lg:pt-0">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-[0.03]" viewBox="0 0 100 100">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="black" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 lg:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Left Column: Strategic Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-medium text-[#1A1A1A] leading-[1.1] md:leading-[1.05] tracking-tight mb-6">
              Empower your <br className="hidden sm:block" />
              <span className="italic text-black/40">excellence</span> for <br />
              Strategic Growth
            </h1>

            <p className="text-sm md:text-base text-black/60 max-w-lg mb-8 leading-relaxed font-light">
              Wherever you are should not be a factor in what you do.
              Brilliant well-being and productivity at one time will change the way the world works.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 items-center"
            >
              <motion.button
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                  window.location.hash = '#services';
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#1F51FF] text-white px-8 py-3.5 rounded-xl font-display font-bold text-base shadow-[0_10px_25px_-5px_rgba(31,81,255,0.25)] hover:shadow-[0_15px_30px_-5px_rgba(31,81,255,0.35)] transition-all"
              >
                Explore Our Services
              </motion.button>

              <div
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  window.location.hash = '#contact';
                }}
                className="flex items-center gap-3 text-primary/80 group cursor-pointer hover:text-black transition-colors"
              >
                <div className="w-10 h-10 rounded-full border border-black/20 bg-black/5 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all shadow-sm">
                  <ArrowRight className="w-4 h-4 text-primary/80 group-hover:text-white transition-colors" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Talk To Our Experts</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Premium Collage Frame */}
          <div className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] w-full mt-12 lg:mt-0">
            {/* Artistic Connectivity Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 600">
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.1 }}
                transition={{ duration: 2, delay: 0.5 }}
                d="M320 80 L500 450 M100 420 L480 500 M400 120 L180 520"
                stroke="black" strokeWidth="1" fill="none"
              />
              <circle cx="320" cy="80" r="3" fill="black" opacity="0.1" />
              <circle cx="500" cy="450" r="3" fill="black" opacity="0.1" />
              <circle cx="100" cy="420" r="3" fill="black" opacity="0.1" />
            </svg>

            {/* Main Collage Item (Top Right) */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotate: 2 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="absolute top-0 right-0 w-[70%] sm:w-[65%] h-[55%] rounded-[2rem] sm:rounded-[3rem] overflow-hidden border-4 sm:border-8 border-white shadow-2xl z-20"
            >
              <img src="/assets/images/hero_collage_1.png" alt="Strategic Mandates" className="w-full h-full object-cover" />
            </motion.div>

            {/* Supporting Item (Middle Left) */}
            <motion.div
              initial={{ opacity: 0, x: -50, rotate: -2 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="absolute top-[25%] sm:top-[30%] left-0 w-[60%] sm:w-[55%] h-[50%] rounded-[2rem] sm:rounded-[3rem] overflow-hidden border-4 sm:border-8 border-white shadow-2xl z-10"
            >
              <img src="/assets/images/hero_collage_2.png" alt="Collaboration" className="w-full h-full object-cover" />
            </motion.div>

            {/* Action Item (Bottom Offset) */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              className="absolute bottom-2 sm:bottom-5 right-[5%] sm:right-[10%] w-[55%] sm:w-[50%] h-[40%] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border-4 sm:border-8 border-white shadow-2xl z-30 transform hover:scale-105 transition-transform duration-700"
            >
              <img src="/assets/images/hero_collage_3.png" alt="Leadership" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20"
      >
        <div className="w-px h-12 bg-black" />
        <span className="text-[8px] font-black uppercase tracking-[0.3em] rotate-180 [writing-mode:vertical-lr]">Scroll</span>
      </motion.div>
    </section>
  );
};
