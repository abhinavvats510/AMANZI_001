/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Menu, 
  X, 
  ChevronRight, 
  Quote,
  ExternalLink,
  Linkedin,
  Twitter,
  Mail,
  Users
} from 'lucide-react';
import { 
  NAV_LINKS, 
  SERVICES, 
  PAIN_POINTS, 
  PROCESS_STEPS, 
  STATS, 
  CASE_STUDIES, 
  TESTIMONIALS 
} from './constants';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white rotate-45" />
          </div>
          <span className="text-xl font-display font-bold tracking-tighter">AMANZI</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              className="text-sm font-medium text-primary/70 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-accent transition-all">
            Strategy Call
          </button>
        </div>

        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-white z-[60] p-6 flex flex-col"
          >
            <div className="flex justify-end">
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex flex-col gap-8 mt-12">
              {NAV_LINKS.map((link) => (
                <a 
                  key={link.label} 
                  href={link.href} 
                  className="text-3xl font-display font-bold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <button className="btn-primary w-full justify-center">
                Strategy Call
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-surface">
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-accent/10 to-transparent blur-3xl -z-10" 
      />
      
      <div className="section-container grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            Strategic Talent Acquisition
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-8">
            Hiring Isn’t About Filling Roles. <br />
            <span className="text-accent">It’s About Building Winning Teams.</span>
          </h1>
          <p className="text-xl text-muted max-w-xl mb-10 leading-relaxed">
            Amanzi Consulting is a strategic hiring partner for enterprises that refuse to settle for "good enough." We connect high-performance talent with ambitious business goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="btn-primary">
              Schedule Strategy Call <ArrowRight className="w-4 h-4" />
            </button>
            <button className="btn-secondary">
              View Solutions
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://picsum.photos/seed/corporate/1200/1600" 
              alt="Professional Team" 
              className="w-full aspect-[4/5] object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white p-8 rounded-xl shadow-xl z-20 max-w-xs">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">94%</div>
                <div className="text-xs text-muted font-medium uppercase tracking-wider">Client Retention</div>
              </div>
            </div>
            <p className="text-sm text-muted">Our focus on cultural alignment ensures long-term success for every placement.</p>
          </div>
          <div className="absolute -top-6 -right-6 w-32 h-32 border-4 border-accent/20 rounded-full -z-10 animate-spin-slow" />
        </motion.div>
      </div>
    </section>
  );
};

const ProblemSection = () => {
  return (
    <section className="bg-white py-24 border-y border-black/5">
      <div className="section-container">
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">The Hidden Cost of Average Hiring.</h2>
          <p className="text-lg text-muted">Generic agencies focus on volume. We focus on impact. If you're facing these challenges, your current hiring strategy is costing you more than just time.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {PAIN_POINTS.map((point, idx) => (
            <motion.div 
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-surface border border-black/5"
            >
              <point.icon className="w-10 h-10 text-accent mb-6" />
              <h3 className="text-xl font-bold mb-4">{point.title}</h3>
              <p className="text-muted leading-relaxed">{point.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="section-container grid lg:grid-cols-2 gap-20 items-center">
      <div className="order-2 lg:order-1">
        <div className="relative">
          <img 
            src="https://picsum.photos/seed/strategy/1000/1200" 
            alt="Strategic Discussion" 
            className="rounded-2xl shadow-2xl"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-accent/10 rounded-2xl" />
        </div>
      </div>
      
      <div className="order-1 lg:order-2">
        <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
          We Connect Ambition <br /> With Capability.
        </h2>
        <p className="text-xl text-muted mb-8 leading-relaxed">
          Amanzi Consulting was founded on a simple premise: recruitment is a consulting function, not a transactional one. We don't just "find people"—we engineer teams.
        </p>
        <div className="space-y-6 mb-10">
          {[
            'Deep-dive understanding of client business models',
            'Rigorous multi-layer screening process',
            'Focus on long-term performance, not just placement',
            'Strategic advisory on talent market trends'
          ].map((item) => (
            <div key={item} className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-1" />
              <span className="text-lg font-medium">{item}</span>
            </div>
          ))}
        </div>
        <button className="btn-primary">
          Learn Our Philosophy <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      }
    }
  };

  return (
    <section id="solutions" className="bg-surface py-32 overflow-hidden">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-primary">Outcome-Driven <br /> Talent Solutions.</h2>
              <p className="text-muted text-lg">We provide specialized hiring models tailored to the complexity of your requirements and the speed of your industry.</p>
            </motion.div>
          </div>
          <motion.button 
            whileHover={{ x: 5 }}
            className="text-primary border-b-2 border-accent pb-2 font-bold flex items-center gap-2 hover:text-accent transition-colors"
          >
            View All Services <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {SERVICES.map((service) => (
            <motion.div 
              key={service.title}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group p-10 rounded-3xl bg-white border border-black/5 shadow-sm hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500"
            >
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                <service.icon className="w-7 h-7 text-accent group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-primary">{service.title}</h3>
              <p className="text-muted mb-8 leading-relaxed">{service.description}</p>
              <ul className="space-y-3">
                {service.features.map(f => (
                  <li key={f} className="text-sm font-medium flex items-center gap-2 text-primary/70">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="bg-white py-32">
      <div className="section-container grid lg:grid-cols-2 gap-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Let’s Start a <br /> Conversation.</h2>
          <p className="text-xl text-muted mb-12 leading-relaxed">
            Whether you're looking to scale a team or secure a visionary leader, we're ready to help you navigate the talent landscape.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <div>
                <div className="text-sm font-bold text-muted uppercase tracking-widest">Email Us</div>
                <div className="text-lg font-bold">hello@amanzi.consulting</div>
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
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted">Full Name</label>
                <input type="text" className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted">Email Address</label>
                <input type="email" className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors" placeholder="john@company.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-muted">Company</label>
              <input type="text" className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors" placeholder="Company Name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-muted">Message</label>
              <textarea rows={4} className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors resize-none" placeholder="Tell us about your hiring needs..."></textarea>
            </div>
            <button className="btn-primary w-full justify-center py-5 text-lg">
              Send Message <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

const ProcessSection = () => {
  return (
    <section id="approach" className="section-container">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">A Structured Path to Excellence.</h2>
        <p className="text-xl text-muted">Our process is designed to eliminate guesswork and deliver high-intent, high-capability talent every single time.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        {PROCESS_STEPS.map((step, idx) => (
          <div key={step.id} className="relative">
            <div className="text-8xl font-display font-black text-black/5 absolute -top-10 -left-4 -z-10">
              {step.id}
            </div>
            <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
            <p className="text-muted leading-relaxed">{step.description}</p>
            {idx < PROCESS_STEPS.length - 1 && (
              <div className="hidden lg:block absolute top-1/4 -right-6 w-12 h-px bg-black/10" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const StatsSection = () => {
  return (
    <section className="bg-surface py-24">
      <div className="section-container grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <div className="text-5xl md:text-6xl font-display font-bold text-primary mb-2">
              {stat.value}{stat.suffix}
            </div>
            <div className="text-sm font-bold text-muted uppercase tracking-widest">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const CaseStudiesSection = () => {
  return (
    <section id="cases" className="section-container">
      <div className="flex justify-between items-end mb-16">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Impact Stories.</h2>
          <p className="text-xl text-muted">Real-world examples of how we've helped organizations transform through strategic talent acquisition.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {CASE_STUDIES.map((study) => (
          <div key={study.title} className="group cursor-pointer">
            <div className="rounded-3xl overflow-hidden mb-8 relative">
              <img 
                src={study.image} 
                alt={study.title} 
                className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                {study.company}
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors">{study.title}</h3>
            <p className="text-muted mb-6 line-clamp-2">{study.challenge}</p>
            <div className="p-6 bg-surface rounded-2xl border border-black/5">
              <div className="text-xs font-bold text-accent uppercase tracking-widest mb-2">The Result</div>
              <p className="font-medium">{study.result}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  return (
    <section className="bg-primary text-white py-32">
      <div className="section-container">
        <div className="text-center mb-20">
          <Quote className="w-16 h-16 text-accent mx-auto mb-8 opacity-50" />
          <h2 className="text-4xl md:text-6xl font-bold">Trusted by Visionaries.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="p-10 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-between">
              <p className="text-xl italic text-white/80 mb-10 leading-relaxed">"{t.content}"</p>
              <div>
                <div className="font-bold text-lg">{t.name}</div>
                <div className="text-accent text-sm font-medium">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="section-container">
      <div className="bg-accent rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-bold mb-8">Ready To Build Your Next High-Performing Team?</h2>
          <p className="text-xl text-white/80 mb-12 leading-relaxed">
            Stop settling for resumes. Start hiring for impact. Let’s discuss your growth objectives and how we can help you reach them.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-accent px-10 py-5 rounded-full font-bold text-lg hover:bg-primary hover:text-white transition-all shadow-xl">
              Schedule a Strategy Call
            </button>
            <button className="bg-transparent border-2 border-white/30 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
              Our Solutions
            </button>
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
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-primary rotate-45" />
            </div>
            <span className="text-2xl font-display font-bold tracking-tighter">AMANZI</span>
          </div>
          <p className="text-white/50 leading-relaxed mb-8">
            Strategic talent acquisition for high-growth enterprises and visionary startups.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent transition-colors">
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
            <li><a href="#" className="hover:text-accent transition-colors">Permanent Staffing</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Executive Search</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Contract Staffing</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Bulk Hiring</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">RPO Solutions</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-8 text-lg">Company</h4>
          <ul className="space-y-4 text-white/50">
            <li><a href="#" className="hover:text-accent transition-colors">Our Approach</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Case Studies</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
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

export default function App() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <AboutSection />
        <ServicesSection />
        <ProcessSection />
        <StatsSection />
        <CaseStudiesSection />
        <TestimonialsSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
