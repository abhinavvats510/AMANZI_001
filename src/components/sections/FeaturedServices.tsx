import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const FeaturedServices = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === 'left'
        ? scrollLeft - clientWidth / 2
        : scrollLeft + clientWidth / 2;
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
      title: 'Global Capability Center (GCC) Support',
      label: 'GCC SUPPORT',
      description: 'We provide comprehensive GCC support services to help businesses establish, streamline, and scale their Global Capability Centers efficiently. Our solutions are designed to support organizations with operational management, talent enablement, business coordination, client engagement, and strategic execution through a reliable and professional approach.',
      image: '/assets/images/gcc.png',
      color: 'bg-accent',
      imagePosition: 'object-left'
    },
    {
      title: 'Business Consulting',
      label: 'STRATEGIC ADVISORY',
      description: 'Customized business consulting services assisting organizations to optimize operations, design scalable growth strategies, navigate complex digital transformations, and achieve operational excellence.',
      image: '/assets/images/business_consulting.jpg',
      color: 'bg-accent',
      imagePosition: 'object-left'
    }
  ];

  return (
    <section id="services" className="bg-white pt-12 pb-4 relative overflow-hidden">
      <div className="section-container !py-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 relative z-10 gap-6">
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

          {/* Navigation Arrows */}
          <div className="flex gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all cursor-pointer"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all cursor-pointer"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 pb-6 no-scrollbar snap-x snap-mandatory scroll-smooth"
        >
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              id={`service-${service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] aspect-[4/5] overflow-hidden rounded-[3rem] cursor-pointer shadow-xl shadow-black/5 hover:shadow-[0_40px_80px_-20px_rgba(31,81,255,0.25)] transition-all duration-700 transform-gpu will-change-transform snap-start"
            >
              {/* Background Image with Zoom Effect */}
              <div className="absolute inset-0 transition-transform duration-[1.2s] ease-out group-hover:scale-110">
                <img
                  src={service.image}
                  alt={service.title}
                  className={`w-full h-full object-cover ${(service as any).imagePosition || 'object-center'}`}
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700 z-20" />
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
                      <h3 className="text-white text-xl md:text-2xl font-display font-bold leading-[1.1] transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 opacity-0 group-hover:opacity-100">
                        {service.title}
                      </h3>
                      <p className="text-white/80 text-xs md:text-sm mt-3 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100 opacity-0 group-hover:opacity-100 line-clamp-6 leading-relaxed">
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
