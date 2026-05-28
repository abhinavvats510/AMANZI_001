import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react';
import { NAV_LINKS } from '../../constants';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeDropdownLabel, setActiveDropdownLabel] = useState<string | null>(null);

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
            <img src="/assets/images/logo.png" alt="Amanzi Logo" className="h-10 w-auto object-contain transition-transform group-hover:scale-105" />
          </a>

          <div
            className={`hidden md:flex flex-col absolute left-1/2 top-1/2 bg-black border border-white/10 px-3 py-1.5 shadow-[0_8px_30px_-12px_rgba(31,81,255,0.15)] transition-all duration-300 ease-in-out overflow-hidden w-max ${
              isDropdownOpen
                ? (NAV_LINKS.find(l => l.label === activeDropdownLabel)?.megaMenu 
                    ? `rounded-t-[2rem] rounded-b-[1.5rem] ${NAV_LINKS.find(l => l.label === activeDropdownLabel)?.megaMenu?.length === 1 ? 'h-[140px]' : 'h-[280px]'}` 
                    : 'rounded-t-[2rem] rounded-b-[1.5rem] h-[92px]')
                : 'rounded-[2rem] h-[48px]'
            }`}
            style={{ transform: 'translate(-50%, -24px)' }}
            onMouseLeave={() => {
              setIsDropdownOpen(false);
              setActiveDropdownLabel(null);
            }}
          >
            {/* Top Row: Main Nav Links */}
            <div className="flex items-center justify-center gap-2 h-[36px] min-w-max w-full">
              {NAV_LINKS.map((link) => (
                (link.subLinks || link.megaMenu) ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => {
                      setIsDropdownOpen(true);
                      setActiveDropdownLabel(link.label);
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        if (isDropdownOpen && activeDropdownLabel === link.label) {
                          setIsDropdownOpen(false);
                          setActiveDropdownLabel(null);
                        } else {
                          setIsDropdownOpen(true);
                          setActiveDropdownLabel(link.label);
                        }
                      }}
                      className={`flex items-center gap-1.5 text-[15px] font-medium px-4 py-2 rounded-full transition-all duration-300 pointer-events-auto relative z-10 ${
                        isDropdownOpen && activeDropdownLabel === link.label
                          ? 'text-white bg-white/10'
                          : 'text-white hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {link.label}
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isDropdownOpen && activeDropdownLabel === link.label ? 'rotate-180 text-blue-500' : ''}`} />
                    </a>
                  </div>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      setIsDropdownOpen(false);
                      setActiveDropdownLabel(null);
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
                    onMouseEnter={() => {
                      setIsDropdownOpen(false);
                      setActiveDropdownLabel(null);
                    }}
                    className="text-[15px] font-medium text-white hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-all duration-300 pointer-events-auto relative z-10"
                  >
                    {link.label}
                  </a>
                )
              ))}
            </div>

            {/* Bottom Row: Dropdown options */}
            <div className={`transition-all duration-300 w-full ${isDropdownOpen ? 'opacity-100 mt-4' : 'opacity-0 pointer-events-none'}`}>
              {/* Simple SubLinks */}
              {NAV_LINKS.find((l) => l.label === activeDropdownLabel)?.subLinks && (
                <div className="flex justify-center items-center gap-6 py-1.5 border-t border-white/10 pt-4">
                  {NAV_LINKS.find((l) => l.label === activeDropdownLabel)?.subLinks?.map((subLink) => (
                    <a
                      key={subLink.label}
                      href={subLink.href}
                      onClick={(e) => {
                        setIsDropdownOpen(false);
                        setActiveDropdownLabel(null);
                        const targetId = subLink.href.replace('#', '');
                        if (targetId) {
                          e.preventDefault();
                          const element = document.getElementById(targetId);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                          window.location.hash = targetId;
                        }
                      }}
                      className="flex items-center gap-1.5 px-5 py-1 text-[13px] font-semibold text-white/70 hover:text-blue-400 hover:bg-white/5 rounded-xl transition-all duration-300 cursor-pointer"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                      {subLink.label}
                    </a>
                  ))}
                </div>
              )}

              {/* Mega Menu */}
              {NAV_LINKS.find((l) => l.label === activeDropdownLabel)?.megaMenu && (
                <div className={`grid gap-8 px-8 py-6 border-t border-white/10 w-full ${NAV_LINKS.find((l) => l.label === activeDropdownLabel)?.megaMenu?.length === 1 ? 'grid-cols-1' : 'grid-cols-3'}`}>
                  {NAV_LINKS.find((l) => l.label === activeDropdownLabel)?.megaMenu?.map((column, idx) => (
                    <div key={idx} className="flex flex-col text-left">
                      {column.title && <h4 className="text-[11px] font-bold tracking-widest text-white/50 uppercase mb-4">{column.title}</h4>}
                      <div className="flex flex-col gap-3">
                        {column.links.map(subLink => (
                          <a
                            key={subLink.label}
                            href={subLink.href}
                            onClick={(e) => {
                              setIsDropdownOpen(false);
                              setActiveDropdownLabel(null);
                              const targetId = subLink.href.replace('#', '');
                              if (targetId) {
                                e.preventDefault();
                                const element = document.getElementById(targetId);
                                if (element) {
                                  element.scrollIntoView({ behavior: 'smooth' });
                                }
                                window.location.hash = targetId;
                              }
                            }}
                            className="text-[14px] font-medium text-white hover:text-blue-400 transition-colors flex items-center justify-between group"
                          >
                            {subLink.label}
                            <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-blue-400 transition-colors" />
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
              <img src="/assets/images/logo.png" alt="Amanzi Logo" className="h-10 w-auto object-contain" />
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
                          className="text-[17px] font-medium text-gray-600 hover:text-blue-600 transition-colors"
                          onClick={(e) => {
                            setIsMobileMenuOpen(false);
                            const targetId = subLink.href.replace('#', '');
                            if (targetId) {
                              e.preventDefault();
                              const element = document.getElementById(targetId);
                              setTimeout(() => {
                                if (element) {
                                  element.scrollIntoView({ behavior: 'smooth' });
                                }
                              }, 300);
                              window.location.hash = targetId;
                            }
                          }}
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
