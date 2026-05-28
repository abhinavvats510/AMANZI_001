import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react';

export const GallerySection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const images = [
    {
      src: '/assets/images/gallery_1.png',
      title: 'Collaborative Workspace',
      category: 'Culture',
      description: 'Modern open-plan tech office interior, multiple floors visible, warm lighting, people working at desks, startup culture feel.'
    },
    {
      src: '/assets/images/gallery_2.png',
      title: 'Digital Transformation',
      category: 'Technology',
      description: 'Abstract blue glowing data highway with flowing light streams, digital transformation concept, dark background.'
    },
    {
      src: '/assets/images/gallery_3.png',
      title: 'Executive Coaching',
      category: 'Leadership',
      description: 'Female Asian executive having one-on-one coaching session in cozy modern office corner, warm lighting, professional.'
    },
    {
      src: '/assets/images/gallery_4.png',
      title: 'Global Mandates',
      category: 'Strategy',
      description: 'Diverse team of 6 professionals in strategy meeting, city skyline at night through windows, engaged and dynamic.'
    },
    {
      src: '/assets/images/gallery_5.png',
      title: 'Hiring Dashboards',
      category: 'Analytics',
      description: 'Small team of 3 standing at digital display screen reviewing analytics dashboard, modern office, collaborative.'
    },
    {
      src: '/assets/images/gallery_6.png',
      title: 'Systems & Delivery',
      category: 'Operations',
      description: 'Futuristic tech operations center with multiple monitors showing dashboards, blue lighting, 2-3 professionals working.'
    },
    {
      src: '/assets/images/gallery_7.png',
      title: 'Talent Community',
      category: 'Ecosystem',
      description: 'Busy modern coworking space, multiple teams visible, natural light, energetic startup atmosphere.'
    }
  ];

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % images.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="gallery" className="bg-[#F8F9FA] py-16 overflow-hidden relative">
      {/* Subtle Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.015] select-none">
        <span className="text-[18vw] font-display font-black tracking-tighter whitespace-nowrap">AMANZI CULTURE</span>
      </div>

      <div className="section-container !py-0 relative z-10 flex flex-col items-center">
        <div className="mb-12 text-center relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Inside Amanzi.</h2>
            <p className="text-muted text-base max-w-2xl mx-auto">
              Experience our culture of innovation and collaboration.
            </p>
          </motion.div>
        </div>

        <div className="min-h-[40px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg md:text-xl font-display font-medium text-primary/80 tracking-tight">
                {images[activeIndex].title}
              </h3>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3D Carousel Container - Infinite Loop */}
        <div className="relative w-full max-w-6xl h-[400px] md:h-[480px] flex items-center justify-center perspective-[1200px] transform-style-3d">
          {images.map((img, idx) => {
            let distance = idx - activeIndex;
            if (distance > images.length / 2) distance -= images.length;
            else if (distance < -images.length / 2) distance += images.length;

            const isActive = idx === activeIndex;
            const isVisible = Math.abs(distance) <= 3;

            return (
              <motion.div
                key={idx}
                initial={false}
                animate={{
                  x: isMobile ? distance * 110 : distance * 180,
                  scale: isActive ? 1 : Math.max(0.6, 0.8 - (Math.abs(distance) * 0.1)),
                  rotateY: distance * -35,
                  zIndex: 20 - Math.abs(distance),
                  opacity: isVisible ? 1 - (Math.abs(distance) * 0.2) : 0,
                  pointerEvents: isVisible ? 'auto' : 'none',
                  display: Math.abs(distance) > 4 ? 'none' : 'block'
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 32,
                }}
                className="absolute w-[200px] md:w-[320px] aspect-[3/4] cursor-pointer group"
                onClick={() => setActiveIndex(idx)}
              >
                <div className={`w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700 border-[6px] bg-white relative ${isActive ? 'border-transparent shadow-accent/20' : 'border-white/50 shadow-black/5'}`}>
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />

                  {/* Hover Overlay - Premium Content Reveal */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/40 to-primary opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 md:p-12">
                    <motion.div
                      className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500"
                    >
                      <span className="inline-block px-3 py-1 rounded-full bg-accent text-[9px] font-black uppercase tracking-[0.2em] text-white mb-4">
                        {img.category}
                      </span>
                      <h4 className="text-white text-xl md:text-2xl font-display font-medium leading-tight mb-2">
                        {img.title}
                      </h4>
                      <p className="text-white/70 text-xs md:text-sm font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 line-clamp-2">
                        {img.description}
                      </p>

                      <div className="mt-4 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200">
                        <Plus className="w-4 h-4" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-black/5 bg-white flex items-center justify-center hover:bg-black/5 transition-all text-primary/40 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </button>
          <button
            onClick={handleNext}
            className="w-14 h-12 rounded-full bg-accent flex items-center justify-center shadow-xl shadow-accent/20 hover:scale-105 transition-all text-white group cursor-pointer"
          >
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
