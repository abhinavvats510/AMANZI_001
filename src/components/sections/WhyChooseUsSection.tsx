import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const WhyChooseUsSection = () => {
  return (
    <section id="why-choose-us" className="bg-white py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Section Title Card (Col 1, Row 1) */}
          <div className="md:col-span-2 lg:col-span-1 flex flex-col justify-center pr-6 min-h-[200px] lg:min-h-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold font-display text-primary leading-[1.1] tracking-tight mb-4">
                Why Choose<br className="hidden lg:block" /> Amanzi
              </h2>
              <p className="text-[#475569] text-base leading-relaxed font-light">
                We bridge the gap between visionary companies and global elite talent with reliable and elite service.
              </p>
            </motion.div>
          </div>

          {/* Card 2: Precision Sourcing (Col 2, Row 1) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-[#FAF9F5] rounded-3xl p-8 flex flex-col justify-between min-h-[260px] border border-black/[0.08] shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <h3 className="text-xl font-bold text-primary font-display leading-tight mb-4">
              Precision Talent Sourcing
            </h3>
            <p className="text-primary/70 text-sm leading-relaxed font-light">
              We target and engage the top 1% of passive candidates, tailored specifically to your company's technical stack, domain, and cultural DNA.
            </p>
          </motion.div>

          {/* Card 3: Rigorous Vetting (Col 3, Row 1) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#F5F5F7] to-[#EDEDF0] rounded-3xl p-8 flex flex-col justify-between min-h-[260px] border border-black/[0.08] shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <h3 className="text-xl font-bold text-primary font-display leading-tight mb-4">
              Rigorous Multi-Layer Vetting
            </h3>
            <p className="text-primary/70 text-sm leading-relaxed font-light">
              Every candidate undergoes multiple technical evaluation rounds led by domain experts, validating coding capability and design depth.
            </p>
          </motion.div>

          {/* Card 4: Accelerated Hiring Speed (Col 1 & 2, Row 2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="md:col-span-2 lg:col-span-2 relative overflow-hidden rounded-3xl min-h-[280px] p-8 flex flex-col justify-between group shadow-lg border border-white/10"
          >
            <img src="/assets/images/grid-3.png" alt="Accelerated Velocity" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
            
            <h3 className="relative z-10 text-xl md:text-2xl font-bold text-white font-display leading-tight mb-4">
              Accelerated Hiring Velocity
            </h3>
            <p className="relative z-10 text-white/80 text-sm leading-relaxed font-light max-w-xl">
              Our average time-to-fill is just 18 days. We streamline candidate screening with AI-assisted verification to keep your pipeline moving fast.
            </p>
          </motion.div>

          {/* Card 5: Expansive Global Network (Col 3, Row 2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="md:col-span-1 lg:col-span-1 relative overflow-hidden rounded-3xl min-h-[280px] p-8 flex flex-col justify-between group shadow-lg border border-white/10"
          >
            <img src="/assets/images/grid-1.png" alt="Global Network" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

            <h3 className="relative z-10 text-xl font-bold text-white font-display leading-tight mb-4">
              Expansive Global Network
            </h3>
            <p className="relative z-10 text-white/80 text-sm leading-relaxed font-light">
              Our active reach spans multiple continents, enabling you to build top-tier distributed teams or hire regional leaders.
            </p>
          </motion.div>

          {/* Card 6: Specialized Technical Expertise (Col 1 & 2, Row 3) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-1 lg:col-span-2 relative overflow-hidden rounded-3xl min-h-[280px] p-8 flex flex-col justify-between group shadow-lg border border-white/10"
          >
            <img src="/assets/images/grid-2.png" alt="Technical Expertise" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

            <h3 className="relative z-10 text-xl md:text-2xl font-bold text-white font-display leading-tight mb-4">
              Specialized Technical Expertise
            </h3>
            <p className="relative z-10 text-white/80 text-sm leading-relaxed font-light max-w-xl">
              Our recruiters speak your language. We specialize in deep tech verticals including Artificial Intelligence, Cloud Engineering, FinTech, and Cyber Security.
            </p>
          </motion.div>

          {/* Card 7: CTA Card (Col 3, Row 3) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-2 lg:col-span-1 bg-accent rounded-3xl p-8 flex flex-col justify-between min-h-[280px] shadow-lg shadow-accent/10 border border-transparent group hover:scale-[1.01] transition-transform duration-300"
          >
            <div>
              <h3 className="text-xl font-bold text-white font-display leading-tight mb-3">
                Ready to Scale?
              </h3>
              <p className="text-white/85 text-sm leading-relaxed font-light">
                Start building your elite engineering team with our premium talent consulting today.
              </p>
            </div>
            
            <button
              onClick={() => {
                window.location.hash = '#contact';
                setTimeout(() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }, 10);
              }}
              className="w-full bg-white text-accent py-4 rounded-2xl font-bold text-sm hover:bg-white/95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              Talk to Our Experts <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
