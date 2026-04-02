/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useReducedMotion, useInView, useMotionValue, animate } from 'motion/react';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Quote,
  ExternalLink,
  Linkedin,
  Twitter,
  Mail,
  Users,
  Instagram,
  Facebook,
  Youtube,
  Search,
  Brain,
  Target,
  Plus,
  Zap,
  Cpu,
  Database,
  Globe,
  ArrowUpRight,
  Briefcase,
  Phone,
  MessageSquare,
  Rocket,
  Sparkle,
  Sparkles,
  History,
  TrendingUp,
  FileText,
  Layers,
  Shield,
  Star
} from 'lucide-react';
import {
  NAV_LINKS,
  SERVICES,
  PAIN_POINTS,
  PROCESS_STEPS,
  STATS,
  CASE_STUDIES,
  TESTIMONIALS,
  WHY_CHOOSE_US
} from './constants';
import { AdminPanel, Job } from './components/AdminPanel';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed w-full z-[100] transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-black/5 py-3' : 'bg-white/10 backdrop-blur-md md:bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative">
          <a href="#" className="flex items-center gap-2 group relative z-10" onClick={() => (window.location.hash = '')}>
            <img src="/logo.png" alt="Amanzi Logo" className="h-10 w-auto object-contain transition-transform group-hover:scale-105" />
          </a>

          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-2 bg-white border border-accent/20 px-3 py-1.5 rounded-[2rem] shadow-[0_8px_30px_-12px_rgba(31,81,255,0.15)]">
            {NAV_LINKS.map((link) => (
              link.subLinks ? (
                <div key={link.label} className="relative group">
                  <a
                    href={link.href}
                    className="flex items-center gap-1.5 text-[15px] font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50/80 px-4 py-2 rounded-full transition-all duration-300 pointer-events-auto relative z-10"
                  >
                    {link.label}
                    <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </a>
                  <div className="absolute top-[120%] left-1/2 -translate-x-1/2 mt-2 w-56 bg-white/95 backdrop-blur-xl border border-blue-100/50 rounded-3xl shadow-[0_20px_40px_-15px_rgba(37,99,235,0.15)] opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:top-full transition-all duration-400 p-2 overflow-hidden">
                    {link.subLinks.map((subLink) => (
                      <a
                        key={subLink.label}
                        href={subLink.href}
                        target="_blank"
                        rel="noreferrer"
                        className="block px-5 py-3 text-[14px] font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-2xl transition-all duration-300"
                      >
                        {subLink.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    const targetId = link.href.replace('#', '');
                    if (targetId) {
                      e.preventDefault();
                      const element = document.getElementById(targetId);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                      window.location.hash = targetId;
                    } else if (targetId === '') {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      window.location.hash = '';
                    }
                  }}
                  className="text-[15px] font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50/80 px-4 py-2 rounded-full transition-all duration-300 pointer-events-auto relative z-10"
                >
                  {link.label}
                </a>
              )
            ))}
          </div>

          <div className="flex items-center gap-4 relative z-10 flex-shrink-0">
            <a
              href="#admin"
              className="hidden md:block bg-black text-white px-8 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-black/80 transition-all shadow-lg text-center ml-1"
            >
              Login
            </a>
            <button 
              className="md:hidden bg-white p-2 rounded-xl text-black shadow-md border border-black/5" 
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[150] p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <img src="/logo.png" alt="Amanzi Logo" className="h-10 w-auto object-contain" />
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-8 h-8 text-black" />
              </button>
            </div>
            <div className="flex flex-col gap-6 mt-16 items-center w-full">
              {NAV_LINKS.map((link) => (
                <div key={link.label} className="flex flex-col items-center gap-2 w-full">
                  <a
                    href={link.href}
                    className="text-xl font-medium text-gray-700 flex items-center gap-2 hover:text-blue-600 transition-colors"
                    onClick={(e) => {
                      if (!link.subLinks) {
                        e.preventDefault();
                        setIsMobileMenuOpen(false);
                        const targetId = link.href.replace('#', '');
                        if (targetId) {
                          const element = document.getElementById(targetId);
                          // Use a slight delay for mobile menu transitions
                          setTimeout(() => {
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                            }
                          }, 300);
                          window.location.hash = targetId;
                        } else {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                          window.location.hash = '';
                        }
                      }
                    }}
                  >
                    {link.label} {link.subLinks && <ChevronDown className="w-5 h-5 text-blue-500" />}
                  </a>
                  {link.subLinks && (
                    <div className="flex flex-col items-center gap-3 mt-2 bg-blue-50/50 w-full py-4 rounded-3xl">
                      {link.subLinks.map(subLink => (
                        <a
                          key={subLink.label}
                          href={subLink.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[17px] font-medium text-gray-600 hover:text-blue-600 transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subLink.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <a
                href="#admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-black text-white w-full max-w-xs py-5 rounded-full text-lg font-bold uppercase tracking-widest mt-6 hover:bg-black/80 transition-colors shadow-lg text-center"
              >
                Login
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const AnimatedCounter = ({ value, suffix }: { value: string, suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 }); // Changed once: true to false

  // Extract number and non-number parts
  const numberMatch = value.match(/\d+/);
  const prefixMatch = value.match(/^[^\d]+/);
  const suffixInValueMatch = value.match(/[^\d]+$/);

  const targetNumber = numberMatch ? parseInt(numberMatch[0]) : 0;
  const prefixContent = prefixMatch ? prefixMatch[0] : '';
  const internalSuffix = suffixInValueMatch ? suffixInValueMatch[0] : '';

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      // Animate up from 0 to target
      animate(count, targetNumber, {
        duration: 2,
        ease: "easeOut",
      });
    } else {
      // Reset back to 0 when it goes out of view
      count.set(0);
    }
  }, [isInView, targetNumber, count]);

  return (
    <span ref={ref}>
      {prefixContent}
      <motion.span>{rounded}</motion.span>
      {internalSuffix}
      {suffix}
    </span>
  );
};

const Hero = () => {
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-[#1A1A1A] leading-[1.1] md:leading-[1.05] tracking-tight mb-6 md:mb-8">
              Empower your <br className="hidden sm:block" />
              <span className="italic text-black/40">excellence</span> for <br />
              Strategic Growth
            </h1>

            <p className="text-base md:text-lg text-black/60 max-w-lg mb-12 leading-relaxed font-light">
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
                className="bg-[#1F51FF] text-white px-10 py-4 rounded-2xl font-serif font-bold text-lg shadow-[0_15px_30px_-10px_rgba(31,81,255,0.3)] hover:shadow-[0_20px_40px_-10px_rgba(31,81,255,0.4)] transition-all"
              >
                Explore Our Services
              </motion.button>

              <div 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  window.location.hash = '#contact';
                }}
                className="flex items-center gap-3 text-black/30 group cursor-pointer hover:text-black transition-colors"
              >
                <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all">
                  <ArrowRight className="w-4 h-4 group-hover:text-white" />
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
              <img src="/hero_collage_1.png" alt="Strategic Mandates" className="w-full h-full object-cover" />
            </motion.div>

            {/* Supporting Item (Middle Left) */}
            <motion.div
              initial={{ opacity: 0, x: -50, rotate: -2 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="absolute top-[25%] sm:top-[30%] left-0 w-[60%] sm:w-[55%] h-[50%] rounded-[2rem] sm:rounded-[3rem] overflow-hidden border-4 sm:border-8 border-white shadow-2xl z-10"
            >
              <img src="/hero_collage_2.png" alt="Collaboration" className="w-full h-full object-cover" />
            </motion.div>

            {/* Action Item (Bottom Offset) */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              className="absolute bottom-2 sm:bottom-5 right-[5%] sm:right-[10%] w-[55%] sm:w-[50%] h-[40%] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border-4 sm:border-8 border-white shadow-2xl z-30 transform hover:scale-105 transition-transform duration-700"
            >
              <img src="/hero_collage_3.png" alt="Leadership" className="w-full h-full object-cover" />
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

const FeaturedServices = () => {
  const services = [
    {
      title: 'AI & Analytics',
      label: 'AI & STRATEGY',
      description: 'Advanced neural networks and predictive modeling.',
      image: '/ai_analytics_service_bg.png',
      color: 'bg-accent'
    },
    {
      title: 'Staffing Solutions',
      label: 'TALENT NETWORK',
      description: 'The top 1% of digital and engineering talent.',
      image: '/staffing_service_bg.png',
      color: 'bg-accent'
    },
    {
      title: 'Industry Domains',
      label: 'DOMAIN MASTERY',
      description: 'Deep expertise in BFSI, Healthcare, and Tech.',
      image: '/industry_expertise_bg.png',
      color: 'bg-accent'
    },
    {
      title: 'Cyber Security',
      label: 'DATA DEFENSE',
      description: 'Elite technical practices for digital fortification.',
      image: '/cyber_security_service_bg.png',
      color: 'bg-accent'
    }
  ];

  return (
    <section id="services" className="bg-white pt-24 pb-12 relative overflow-hidden">
      <div className="section-container !py-0">
        <div className="mb-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-[#1A1A3A]">Our Services.</h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Amanzi Consulting coordinates the flow of talent and data analytics to drive innovation, from raw insights to customer value.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative aspect-[4/5] overflow-hidden rounded-[3rem] cursor-pointer shadow-xl shadow-black/5 hover:shadow-[0_40px_80px_-20px_rgba(64,224,208,0.3)] transition-all duration-700 transform-gpu will-change-transform"
            >
              {/* Background Image with Zoom Effect */}
              <div className="absolute inset-0 transition-transform duration-[1.2s] ease-out group-hover:scale-110">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
              </div>



              {/* Bottom Content Area */}
              <div className="absolute bottom-8 left-8 right-8 z-20 flex flex-col items-start justify-end">
                <motion.div
                  initial={{ x: -10, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className={`inline-flex px-6 py-2.5 rounded-[1.25rem] ${service.color} text-white font-black text-[9px] tracking-[0.2em] shadow-lg relative z-10 self-start`}
                >
                  {service.label}
                </motion.div>

                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-700 w-full">
                  <div className="overflow-hidden">
                    <div className="pt-5">
                      <h3 className="text-white text-2xl md:text-3xl font-display font-bold leading-[1.1] transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 opacity-0 group-hover:opacity-100">
                        {service.title}
                      </h3>
                      <p className="text-white/80 text-sm md:text-[15px] mt-3 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100 opacity-0 group-hover:opacity-100 line-clamp-2 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subtle Inner Border on Hover */}
              <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/10 rounded-[3rem] transition-colors duration-700 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};







/**
 * TechnologyExpertise Section
 * Implements the asymmetrical 'Ethics & Value' layout from reference images
 * utilizing technical expertise data.
 */
const TechnologyExpertise = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const sequence = [0, 1, 2, 3, 2, 1];
    let step = 0;
    const interval = setInterval(() => {
      step = (step + 1) % sequence.length;
      setActiveIndex(sequence[step]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const expertise = [
    {
      title: 'Artificial Intelligence',
      icon: Zap,
      description: 'Advanced neural networks and cognitive computing designed to automate and enhance complex decision-making processes.',
      items: ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Generative AI']
    },
    {
      title: 'Data Engineering',
      icon: Database,
      description: 'Architecting robust data foundations that ensure high availability, security, and real-time processing capabilities.',
      items: ['Cloud Platforms', 'ETL Pipelines', 'Data Warehousing', 'Real-time Processing', 'Governance']
    },
    {
      title: 'Business Intelligence',
      icon: Cpu,
      description: 'Converting raw data into strategic foresight through advanced analytics and high-performance KPI dashboards.',
      items: ['Advanced Analytics', 'Predictive Modeling', 'Visualization', 'KPI Dashboards', 'Report Automation']
    },
    {
      title: 'Cloud & DevOps',
      icon: Layers,
      description: 'Bridging development and operations with scalable infrastructure-as-code and automated CI/CD pipelines.',
      items: ['Infrastructure as Code', 'CI/CD Pipelines', 'Containerization', 'Cloud Migrations', 'Scalability']
    }
  ];

  return (
    <section id="expertise" className="min-h-screen bg-[#FBFBFB] flex flex-col justify-center overflow-hidden relative py-16">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating tech 'chips' */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0.03, 0.08, 0.03],
              rotate: [0, 45, 0]
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute rounded-lg border border-primary/20 bg-primary/5"
            style={{
              width: 40 + i * 20,
              height: 40 + i * 20,
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          />
        ))}
        {/* Tracked Glow Orb that follows active state vaguely */}
        <motion.div
          animate={{
            x: activeIndex * 100,
            opacity: [0.3, 0.5, 0.3]
          }}
          className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full"
        />
      </div>

      <div className="section-container !py-0 mb-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Our Technology Expertise.</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            We combine deep technical knowledge with industry-specific insights to deliver
            engineering solutions that scale with your growth.
          </p>
        </motion.div>
      </div>

      {/* Main Grid Content */}
      <div className="section-container !py-0">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Heading */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -100, filter: 'blur(10px)', scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)', scale: 1 }}
              transition={{
                duration: 1.2,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              viewport={{ once: false, margin: "-50px", amount: 0.1 }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium text-primary tracking-tighter leading-[1.1] md:leading-[0.95] mb-6 md:mb-8">
                We bring <motion.span
                  animate={{ opacity: [0.4, 0.6, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-muted italic"
                >value</motion.span><br />
                to our expertise.
              </h2>
              <p className="text-muted/70 text-base leading-relaxed max-w-sm mb-8 font-light">
                Our consultancy is dedicated to providing high-quality solutions through technical expertise, modern architecture, and a strategic engineering approach.
              </p>
            </motion.div>
          </div>

          {/* Right Cards Grid */}
          <div className="lg:col-span-7 grid md:grid-cols-2 gap-5">
            {expertise.map((exp, idx) => (
              <motion.div
                key={exp.title}
                initial={{ 
                  opacity: 0, 
                  x: idx % 2 === 0 ? -100 : 100, 
                  y: idx < 2 ? -100 : 100, 
                  filter: 'blur(10px)',
                  scale: 0.9 
                }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0, 
                  y: 0, 
                  filter: 'blur(0px)',
                  scale: 1 
                }}
                transition={{
                  duration: 1.2,
                  delay: idx * 0.1 + 0.2,
                  ease: [0.16, 1, 0.3, 1]
                }}
                viewport={{ once: false, margin: "-50px", amount: 0.1 }}
                className={`p-8 rounded-[2rem] flex flex-col h-full shadow-sm border border-black/[0.04] transition-all duration-700 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] transform-gpu will-change-transform ${idx === activeIndex ? 'bg-accent text-white border-transparent shadow-accent/30' : 'bg-white text-primary'
                  }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-6 border ${idx === activeIndex ? 'bg-white/10 border-white/20 text-white' : 'bg-primary/5 border-primary/10 text-primary'
                  }`}>
                  <exp.icon className="w-5 h-5" />
                </div>

                <h3 className="text-xl font-display font-bold mb-3 tracking-tight leading-none">
                  {exp.title}
                </h3>
                <p className={`text-xs leading-relaxed mb-6 font-light flex-1 ${idx === activeIndex ? 'text-white/80' : 'text-muted'
                  }`}>
                  {exp.description}
                </p>

                <div className="space-y-2 pt-4 border-t border-current/10 opacity-60">
                  {exp.items.slice(0, 3).map(item => (
                    <div key={item} className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-wider">
                      <div className="w-1.5 h-1.5 rounded-full bg-current" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', company: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-white py-32">
      <div className="section-container grid lg:grid-cols-2 gap-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Let’s Start a Conversation.</h2>
          <p className="text-muted text-lg mb-12 max-w-2xl">
            Whether you're looking to scale a team or secure a visionary leader, we're ready to help you navigate the talent landscape.
          </p>

          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <div>
                <div className="text-sm font-bold text-muted uppercase tracking-widest">Email Us</div>
                <div className="text-lg font-bold">info@amanzigroup.co.in</div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center">
                <Linkedin className="w-6 h-6 text-accent" />
              </div>
              <div>
                <div className="text-sm font-bold text-muted uppercase tracking-widest">Follow Us</div>
                <div className="text-lg font-bold">linkedin.com/company/amanzi</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-surface p-8 md:p-12 rounded-[2rem] border border-black/5"
        >
          {isSubmitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">Message Received</h3>
              <p className="text-muted/60">We'll get back to you within 24 business hours.</p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted">Full Name</label>
                  <input
                    required
                    type="text"
                    className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted">Email Address</label>
                  <input
                    required
                    type="email"
                    className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted">Company</label>
                <input
                  type="text"
                  className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted">Message</label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Tell us about your hiring needs..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              {error && <p className="text-red-500 text-xs">{error}</p>}

              <button
                disabled={isSubmitting}
                className="btn-primary w-full justify-center py-5 text-lg disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'} <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

const ProcessStep = ({ step, index, progress }: { step: any, index: number, progress: any }) => {
  const start = index * 0.2;
  const end = (index + 1) * 0.2;

  const opacity = useTransform(progress, [start, start + 0.15], [0, 1]);
  const y = useTransform(progress, [start, start + 0.15], [80, 0]);
  const numberY = useTransform(progress, [start, start + 0.2], [120, 0]);
  const numberOpacity = useTransform(progress, [start, start + 0.15], [0, 0.04]);
  const scale = useTransform(progress, [start, start + 0.2], [0.9, 1]);

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="relative group cursor-default p-7 rounded-[2rem] bg-white border border-black/[0.03] shadow-sm hover:shadow-2xl hover:shadow-accent/20 transition-all duration-700"
    >
      <motion.div
        style={{ y: numberY, opacity: numberOpacity }}
        className="text-[6rem] sm:text-[9rem] font-display font-black text-black absolute -top-12 sm:-top-20 -left-5 sm:-left-10 -z-10 pointer-events-none"
      >
        {step.id}
      </motion.div>

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-accent text-white flex items-center justify-center mb-6 shadow-lg shadow-accent/20">
          <span className="font-display font-bold text-lg">{step.id}</span>
        </div>
        <h3 className="text-xl md:text-2xl font-display font-bold mb-3 group-hover:text-accent transition-colors duration-500 tracking-tight leading-tight">
          {step.title}
        </h3>
        <p className="text-muted/70 leading-relaxed text-[13px] md:text-sm font-light">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
};

const ProcessSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const cardsProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="approach" className="relative bg-[#FBFBFB]">
      {/* Increased scroll length to accommodate heading + cards reveal */}
      <div className="h-[200vh] lg:h-[350vh] relative" ref={containerRef}>
        {/* Sticky container pins EVERYTHING (Heading + Cards) */}
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
          <div className="section-container !py-0 relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16 relative z-10"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                Our Process.
              </h2>
              <p className="text-muted text-lg max-w-xl mx-auto">
                Our process eliminates guesswork and delivers high-intent talent every single time.
              </p>
            </motion.div>

            <div className="relative w-full">
              {/* Progressive Line */}
              <div className="hidden lg:block absolute top-[50%] left-0 right-0 h-[2px] bg-black/[0.05] -translate-y-1/2">
                <motion.div
                  className="h-full bg-accent origin-left"
                  style={{ scaleX: cardsProgress }}
                />
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-[3px] border-accent shadow-lg"
                  style={{ left: useTransform(cardsProgress, [0, 1], ["0%", "100%"]), x: "-50%" }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10 w-full">
                {PROCESS_STEPS.map((step, idx) => (
                  <ProcessStep
                    key={step.id}
                    step={step}
                    index={idx}
                    progress={cardsProgress}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  return (
    <section className="bg-white py-24 md:py-32 border-y border-black/[0.03]">
      <div className="section-container !py-0 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <div className="text-4xl md:text-5xl font-display font-medium text-primary mb-1 tracking-tighter">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest text-muted">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const WhyChooseUsSection = () => {
  const points = [
    "Precision Talent Sourcing",
    "Rigorous Multi-Layer Vetting",
    "Accelerated Hiring Velocity",
    "Expansive Global Network",
    "Specialized Technical Expertise"
  ];

  return (
    <section id="why-choose-us" className="min-h-screen bg-white flex flex-col justify-center overflow-hidden snap-start py-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-16 text-center max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Why Choose Us?</h2>
            <p className="text-muted text-lg mx-auto">
              We bridge the gap between visionary companies and global elite talent with reliable and elite service.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          {/* Left Side: Refined Quadrant Image Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 relative">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border border-black/5"
              >
                <img src="/grid-1.png" alt="Global Connectivity" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl border border-black/5"
              >
                <img src="/grid-3.png" alt="Velocity" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </motion.div>
            </div>
            <div className="pt-12 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl border border-black/5"
              >
                <img src="/grid-2.png" alt="Strategy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border border-black/5"
              >
                <img src="/grid-4.png" alt="Future" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </motion.div>
            </div>

            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/[0.02] rounded-full blur-[120px] -z-10" />
          </div>

          {/* Right Side: Narrative & Key Points */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-5xl font-display font-medium text-primary mb-8 leading-[1.1] tracking-tight">
                Navigating the complex landscape of <span className="text-accent italic">Elite Talent.</span>
              </h3>

              <div className="space-y-2 mb-12">
                {points.map((point, idx) => (
                  <motion.div
                    key={point}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="group py-5 flex items-center justify-between cursor-pointer hover:bg-black/[0.01] transition-all px-2 rounded-xl"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-all duration-500 font-display font-bold text-xs">
                        0{idx + 1}
                      </div>
                      <span className="text-lg md:text-xl font-display font-medium text-primary/80 group-hover:text-primary group-hover:translate-x-2 transition-all duration-500">
                        {point}
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-all duration-500">
                      <Plus className="w-4 h-4 text-muted group-hover:text-accent group-hover:rotate-45 transition-all duration-500" />
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                onClick={() => {
                  window.location.hash = '#contact';
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 10);
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
                className="mt-12 group flex items-center gap-4 text-accent"
              >
                <div className="w-12 h-12 rounded-full border border-accent/20 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-500">
                  <ArrowRight className="w-5 h-5" />
                </div>
                <span className="text-sm font-black uppercase tracking-[0.2em]">Our Exclusive Solutions</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const GallerySection = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const images = [
    {
      src: '/gallery_1.png',
      title: 'Global Connectivity',
      category: 'Infrastructure',
      description: 'Powering seamless cross-border communication and data exchange through high-speed edge networks.'
    },
    {
      src: '/gallery_2.png',
      title: 'Digital Research',
      category: 'Innovation',
      description: 'Exploring the boundaries of algorithmic efficiency and neural computing in our dedicated R&D labs.'
    },
    {
      src: '/gallery_3.png',
      title: 'Strategic Hub',
      category: 'Architecture',
      description: 'Designing the blueprint for scalable enterprise ecosystems and robust cloud-native infrastructures.'
    },
    {
      src: '/gallery_4.png',
      title: 'Creative Lab',
      category: 'Culture',
      description: 'Where design thinking meets technical excellence, fostering an environment of rapid prototyping.'
    },
    {
      src: '/gallery_5.png',
      title: 'Network Operations',
      category: 'Defense',
      description: 'Ensuring absolute data integrity and system resilience against evolving global cyber threats.'
    },
    {
      src: '/gallery_6.png',
      title: 'Future Platforms',
      category: 'Systems',
      description: 'Architecting next-generation software platforms that redefine the human-technology interaction.'
    },
    {
      src: '/gallery_3.png',
      title: 'Agile Synergy',
      category: 'Workforce',
      description: 'Dynamically aligning cross-functional elite teams to deliver complex solutions with unmatched speed.'
    },
    {
      src: '/gallery_1.png',
      title: 'Enterprise Growth',
      category: 'Scalability',
      description: 'Leveraging data-driven insights to fuel sustainable expansion and market leadership for our clients.'
    },
    {
      src: '/gallery_2.png',
      title: 'Cloud Resilience',
      category: 'Security',
      description: 'Building self-healing architectures that maintain services even under extreme operational stress.'
    },
    {
      src: '/gallery_4.png',
      title: 'Neural Networks',
      category: 'Intelligence',
      description: 'Integrating deep learning models to predict market shifts and optimize internal workflows.'
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
    <section id="gallery" className="min-h-screen bg-[#F8F9FA] flex flex-col justify-center overflow-hidden relative py-6 snap-start">
      {/* Subtle Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.015] select-none">
        <span className="text-[18vw] font-display font-black tracking-tighter whitespace-nowrap">AMANZI CULTURE</span>
      </div>

      <div className="section-container relative z-10 flex flex-col items-center">
        <div className="mb-12 text-center relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Inside Amanzi.</h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Experience our culture of innovation and collaboration.
            </p>
          </motion.div>
        </div>

        <div className="min-h-[40px]"> {/* More compact metadata container */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl md:text-2xl font-display font-medium text-primary/80 tracking-tight">
                {images[activeIndex].title}
              </h3>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3D Carousel Container - Infinite Loop */}
        <div className="relative w-full max-w-6xl h-[400px] md:h-[480px] flex items-center justify-center perspective-[1200px] transform-style-3d">
          {images.map((img, idx) => {
            // Infinite loop distance logic
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
                  display: Math.abs(distance) > 4 ? 'none' : 'block' // Hide zipping items
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
            className="w-14 h-12 rounded-full bg-[#FF8C32] flex items-center justify-center shadow-xl shadow-[#FF8C32]/20 hover:scale-105 transition-all text-white group"
          >
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
const ApplyModal = ({ isOpen, onClose, jobTitle }: { isOpen: boolean, onClose: () => void, jobTitle: string }) => {
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

      const response = await fetch('/api/apply', {
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

const ActiveMandatesSection = ({ jobs }: { jobs: Job[] }) => {
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
      <section id="careers" className="min-h-screen bg-white pb-12 overflow-hidden relative snap-start">
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block overflow-hidden">
          <img
            src="/careers_bg.png"
            alt="Strategic Careers"
            className="w-full h-full object-cover opacity-10 mix-blend-multiply transition-all duration-1000 grayscale hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white" />
        </div>

        <div className="section-container !pt-4 md:!pt-8 relative z-10 w-full">
          <div className="mb-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight text-primary">
                Active Mandates.
              </h2>
              <p className="text-muted text-lg leading-relaxed max-w-2xl mx-auto">
                We connect global elite talent with visionary companies. Explore our current portfolio of high-impact strategic mandates.
              </p>
            </motion.div>
          </div>

          <div className="w-full max-w-4xl mx-auto flex flex-col pt-4">
            {jobs.length === 0 ? (
              <div className="bg-[#F9FAFB] border border-black/5 rounded-[3.5rem] py-32 text-center shadow-sm">
                <Sparkles className="w-12 h-12 text-accent/20 mx-auto mb-6" />
                <p className="text-muted/60 text-lg font-serif italic text-primary/40">Exclusive strategic mandates are currently being finalized.</p>
                <p className="text-muted/40 text-[10px] font-black uppercase tracking-widest mt-4">Check back shortly for premium opportunities.</p>
              </div>
            ) : (
              <>
                {currentJobs.map((job, idx) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between py-8 border-b border-gray-200 last:border-0 hover:bg-black/[0.02] px-2 sm:px-6 rounded-xl transition-colors gap-6"
                  >
                    <div className="flex flex-col gap-2.5">
                      <h3 className="text-xl md:text-[22px] font-semibold text-gray-900 tracking-tight">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 text-[14.5px] sm:text-[15.5px] text-gray-700">
                        <span>US / {job.mode} ({job.location})</span>
                        <span className="w-1 h-1 rounded-full bg-gray-400" />
                        <span>{job.company && job.company !== 'Amanzi Group' ? job.company : "$135K - $175K"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[14.5px] sm:text-[15.5px] text-gray-700 mt-0.5">
                        <Star className="w-4 h-4 text-gray-700" />
                        <span>3+ years</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="bg-[#111] hover:bg-black text-white px-8 md:px-10 py-3 rounded-xl sm:rounded-full text-sm font-medium shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] whitespace-nowrap self-start sm:self-center transition-all hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5"
                    >
                      Apply Now
                    </button>
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




const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="min-h-screen bg-primary flex flex-col justify-center overflow-hidden relative py-12 snap-start">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/[0.05] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3%3Cfilter id='noiseFilter'%3%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3%3C/filter%3%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3%3C/svg%3")` }} />
      </div>

      <div className="section-container relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Left Column: Typography & Navigation */}
          <div className="lg:col-span-12 xl:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-1.5 rounded-full mb-8"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em]">Institutional Influence</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4"
            >
              The Voice of Impact.
            </motion.h2>

            <div className="flex gap-4 mt-8">
              <button
                onClick={prev}
                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 hover:border-white/30 transition-all duration-500 group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </button>
              <button
                onClick={next}
                className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-primary shadow-xl shadow-accent/20 hover:scale-110 transition-all duration-500 group"
              >
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Hero Slider */}
          <div className="lg:col-span-12 xl:col-span-7 relative pt-8 xl:pt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 1.05 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-white shadow-2xl min-h-[400px] md:min-h-[480px]"
              >
                {/* Visual side */}
                <div className="relative h-64 md:h-auto overflow-hidden">
                  <img
                    src={TESTIMONIALS[current].image}
                    alt={TESTIMONIALS[current].name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-transparent mix-blend-multiply" />
                  <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white z-10">
                    <div className="w-12 h-[1px] bg-accent mb-4" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Strategic Partner</span>
                  </div>
                </div>

                {/* Testimonial side */}
                <div className="p-8 md:p-10 flex flex-col justify-center relative bg-white">
                  <Quote className="absolute top-6 right-6 w-16 h-16 text-black/[0.02] rotate-12" />

                  <div className="relative z-10">
                    <p className="text-xl md:text-2xl font-serif font-medium text-primary leading-relaxed italic mb-6 md:mb-8">
                      "{TESTIMONIALS[current].content}"
                    </p>

                    <div className="mt-auto">
                      <h4 className="text-xl font-bold text-primary mb-0.5">{TESTIMONIALS[current].name}</h4>
                      <p className="text-[9px] font-black uppercase tracking-widest text-muted/60">{TESTIMONIALS[current].role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination dots */}
            <div className="absolute -bottom-8 left-6 flex gap-3">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1 transition-all duration-700 rounded-full ${i === current ? 'w-10 bg-accent' : 'w-2 bg-white/20'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-24 pb-12">
      <div className="section-container grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-8">
            <img src="/logo.png" alt="Amanzi Logo" className="h-12 md:h-16 w-auto object-contain" />
          </div>
          <p className="text-white/50 leading-relaxed mb-8">
            Strategic talent acquisition for high-growth enterprises and visionary startups.
          </p>
          <div className="flex gap-4">
            <a href="https://www.linkedin.com/company/amanzi-technologies/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-8 text-lg">Solutions</h4>
          <ul className="space-y-4 text-white/50">
            <li>Permanent Staffing</li>
            <li>Executive Search</li>
            <li>Contract Staffing</li>
            <li>Bulk Hiring</li>
            <li>RPO Solutions</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-8 text-lg">Company</h4>
          <ul className="space-y-4 text-white/50">
            <li><a href="#approach" className="hover:text-accent transition-colors">Our Approach</a></li>
            <li><a href="#services" className="hover:text-accent transition-colors">Case Studies</a></li>
            <li><a href="#approach" className="hover:text-accent transition-colors">About Us</a></li>
            <li><a href="#careers" className="hover:text-accent transition-colors">Careers</a></li>
            <li><a href="#contact" className="hover:text-accent transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-8 text-lg">Newsletter</h4>
          <p className="text-white/50 mb-6 text-sm">Get strategic hiring insights delivered to your inbox.</p>
          <div className="relative">
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 text-sm focus:outline-none focus:border-accent"
            />
            <button className="absolute right-2 top-1.5 bg-accent p-1.5 rounded-full hover:scale-110 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="section-container py-0 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 pt-12">
        <p className="text-white/30 text-sm">© 2026 Amanzi Consulting. All rights reserved.</p>
        <div className="flex gap-8 text-white/30 text-sm">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

// Removed SmoothScroll as it was conflicting with native position:sticky logic
// and causing gaps in scroll-linked animations.

const CyberSecurityPage = () => (
  <section className="min-h-screen pt-32 pb-20 px-6 bg-[#fbfbfb] flex items-center justify-center">
    <div className="text-center max-w-2xl mx-auto">
      <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-3xl mx-auto flex items-center justify-center mb-8 shadow-xl shadow-blue-500/10">
        <Shield className="w-10 h-10" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 tracking-tight">Enterprise Cyber Security</h1>
      <p className="text-gray-500 text-lg mb-10 leading-relaxed">
        Next-generation protection for your digital assets. Our Cyber Security solutions ensure your infrastructure remains unbreachable and resilient.
      </p>
      <a href="#" className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 hover:shadow-lg transition-all shadow-md">Back to Home</a>
    </div>
  </section>
);

const ATSPage = () => (
  <section className="min-h-screen pt-32 pb-20 px-6 bg-[#fbfbfb] flex items-center justify-center">
    <div className="text-center max-w-2xl mx-auto">
      <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-3xl mx-auto flex items-center justify-center mb-8 shadow-xl shadow-indigo-500/10">
        <Database className="w-10 h-10" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 tracking-tight">Applicant Tracking System (ATS)</h1>
      <p className="text-gray-500 text-lg mb-10 leading-relaxed">
        Streamline your recruitment pipeline with our proprietary AI-driven ATS. Designed for precision hiring and seamless onboarding at scale.
      </p>
      <a href="#" className="bg-indigo-600 text-white px-8 py-3 rounded-full font-medium hover:bg-indigo-700 hover:shadow-lg transition-all shadow-md">Back to Home</a>
    </div>
  </section>
);



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
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    // Fetch jobs from backend API
    fetch('/api/jobs')
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
      const validHomeHashes = ['expertise', 'services', 'approach', 'careers']; // approach and careers are relevant too
      if (validHomeHashes.includes(targetId)) {
        const timer = setTimeout(() => {
          document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
        }, 300); // 300ms is enough for most mounts
        return () => clearTimeout(timer);
      }
    }
  }, [currentView]);

  return (
    <div className="relative bg-white select-none selection:bg-accent/20">
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
              <TestimonialsSection />
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
