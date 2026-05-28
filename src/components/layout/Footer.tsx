import React from 'react';
import { Linkedin, Facebook, ArrowRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src="/assets/images/logo.png" alt="Amanzi Logo" className="h-10 w-auto object-contain" />
          </div>
          <p className="text-white/50 text-sm leading-relaxed mb-5">
            Strategic talent acquisition for high-growth enterprises and visionary startups.
          </p>
          <div className="flex gap-3 relative z-50">
            <a href="https://www.linkedin.com/company/3787715/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent transition-all hover:scale-105 pointer-events-auto">
              <Linkedin className="w-4.5 h-4.5" />
            </a>
            <a href="https://www.facebook.com/share/17oCjHGhxd/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent transition-all hover:scale-105 pointer-events-auto">
              <Facebook className="w-4.5 h-4.5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider text-white mb-4">Solutions</h4>
          <ul className="space-y-2.5 text-sm text-white/50">
            <li><a href="#service-ai-analytics" className="hover:text-accent transition-colors block">AI and Analytics</a></li>
            <li><a href="#service-staffing-solutions" className="hover:text-accent transition-colors block">Staffing Solutions</a></li>
            <li><a href="#service-industry-domains" className="hover:text-accent transition-colors block">Industry Domains</a></li>
            <li><a href="#service-cyber-security" className="hover:text-accent transition-colors block">Cyber Security</a></li>
            <li><a href="#service-global-capability-center-gcc-support" className="hover:text-accent transition-colors block">GCC Support</a></li>
            <li><a href="#service-business-consulting" className="hover:text-accent transition-colors block">Business Consulting</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider text-white mb-4">Company</h4>
          <ul className="space-y-2.5 text-sm text-white/50">
            <li><a href="#approach" className="hover:text-accent transition-colors">About Us</a></li>
            <li><a href="#approach" className="hover:text-accent transition-colors">Our Approach</a></li>
            <li><a href="#careers" className="hover:text-accent transition-colors">Careers</a></li>
            <li><a href="#contact" className="hover:text-accent transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
