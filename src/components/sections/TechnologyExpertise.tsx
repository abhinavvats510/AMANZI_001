import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Zap, Database, Cpu, Layers } from 'lucide-react';

export const TechnologyExpertise = () => {
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Our Technology Expertise.</h2>
          <p className="text-muted text-base max-w-2xl mx-auto">
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
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-primary tracking-tighter leading-[1.1] md:leading-[0.95] mb-6 md:mb-8">
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
