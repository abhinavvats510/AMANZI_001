import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const FeaturedServices = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      // Scroll by one card width (card width + gap)
      // w-[200px] on mobile (<640px), w-[240px] on tablet (<768px), w-[280px] on desktop. Gap is 24px (gap-6)
      let cardWidth = 280 + 24;
      if (clientWidth < 640) {
        cardWidth = 200 + 24;
      } else if (clientWidth < 768) {
        cardWidth = 240 + 24;
      }

      const scrollTo = direction === 'left'
        ? scrollLeft - cardWidth
        : scrollLeft + cardWidth;
      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const services = [
    {
      title: 'AI & Analytics',
      label: 'AI & STRATEGY',
      description: 'Advanced neural networks and predictive modeling.',
      image: '/assets/images/ai_analytics_service_bg.png',
      color: 'bg-accent'
    },
    {
      title: 'Staffing Solutions',
      label: 'TALENT NETWORK',
      description: 'The top 1% of digital and engineering talent.',
      image: '/assets/images/staffing_service_bg.png',
      color: 'bg-accent'
    },
    {
      title: 'Industry Domains',
      label: 'DOMAIN MASTERY',
      description: 'Deep expertise in BFSI, Healthcare, and Tech.',
      image: '/assets/images/industry_expertise_bg.png',
      color: 'bg-accent'
    },
    {
      title: 'Cyber Security',
      label: 'DATA DEFENSE',
      description: 'Elite technical practices for digital fortification.',
      image: '/assets/images/cyber_security_service_bg.png',
      color: 'bg-accent'
    },
    {
      title: 'GCC Support',
      label: 'GCC SUPPORT',
      description: 'Establish, streamline, and scale Global Capability Centers.',
      image: '/assets/images/gcc.png',
      color: 'bg-accent',
      imagePosition: 'object-left'
    },
    {
      title: 'Business Consulting',
      label: 'STRATEGIC ADVISORY',
      description: 'Optimize operations, scale growth, and navigate transformation.',
      image: '/assets/images/business_consulting.jpg',
      color: 'bg-accent',
      imagePosition: 'object-left'
    }
  ];

  return (
    <section id="services" className="bg-white pt-12 pb-4 relative overflow-hidden">
      <div className="section-container !py-0">
        <div className="mb-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-left max-w-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-[#1A1A3A]">Our Services.</h2>
            <p className="text-muted text-base">
              Amanzi coordinates the flow of talent and data analytics to drive innovation, from raw insights to customer value.
            </p>
          </motion.div>
        </div>

        <div className="relative group/carousel">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 px-16 lg:px-0 pb-6 no-scrollbar snap-x snap-mandatory scroll-smooth"
          >
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                id={`service-${service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group relative flex-shrink-0 w-[200px] sm:w-[240px] md:w-[280px] aspect-[3/4] overflow-hidden rounded-none cursor-pointer shadow-xl shadow-black/5 md:hover:shadow-[0_40px_80px_-20px_rgba(31,81,255,0.25)] transition-all duration-700 transform-gpu will-change-transform snap-start"
              >
                {/* Background Image with Zoom Effect */}
                <div className="absolute inset-0 transition-transform duration-[1.2s] ease-out md:group-hover:scale-110">
                  <img
                    src={service.image}
                    alt={service.title}
                    className={`w-full h-full object-cover ${(service as any).imagePosition || 'object-center'}`}
                  />
                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 md:from-black/80 md:via-black/20 to-transparent opacity-100 md:opacity-90 md:group-hover:opacity-100 transition-opacity duration-700 z-20" />
                </div>

                <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 z-20 flex flex-col items-start justify-start md:justify-end h-[135px] md:h-auto">
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    className={`inline-flex px-4 py-2 rounded-none ${service.color} text-white font-black text-[9px] tracking-[0.2em] shadow-lg relative z-10 self-start`}
                  >
                    {service.label}
                  </motion.div>

                  <div className="grid grid-rows-[1fr] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] transition-all duration-700 w-full">
                    <div className="overflow-hidden">
                      <div className="pt-4 md:pt-5">
                        <h3 className="text-white text-lg md:text-xl font-display font-bold leading-[1.1] transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-700 opacity-100 md:opacity-0 md:group-hover:opacity-100">
                          {service.title}
                        </h3>
                        <p className="text-white/80 text-[11px] md:text-xs mt-2 md:mt-3 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-700 delay-100 opacity-100 md:opacity-0 md:group-hover:opacity-100 line-clamp-3 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtle Inner Border on Hover */}
                <div className="absolute inset-0 border-2 border-white/0 md:group-hover:border-white/10 rounded-none transition-colors duration-700 pointer-events-none" />
              </motion.div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full ring-2 ring-white bg-primary text-white flex items-center justify-center hover:bg-accent active:bg-accent active:text-white hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg shadow-black/20 hover:shadow-accent/30"
            aria-label="Scroll left"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full ring-2 ring-white bg-primary text-white flex items-center justify-center hover:bg-accent active:bg-accent active:text-white hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg shadow-black/20 hover:shadow-accent/30"
            aria-label="Scroll right"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
