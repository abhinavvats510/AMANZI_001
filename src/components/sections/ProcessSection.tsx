import React, { useRef, useEffect, useState } from 'react';
import { motion, useTransform, useSpring, useMotionValue, useInView, animate } from 'motion/react';
import { PROCESS_STEPS } from '../../constants';

const ProcessStep = ({ step, index, progress }: { step: any, index: number, progress: any, key?: React.Key }) => {
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
      className="relative group cursor-default p-5 rounded-[2rem] bg-accent border border-white/5 shadow-lg hover:shadow-2xl hover:shadow-accent/30 transition-all duration-700"
    >
      <motion.div
        style={{ y: numberY, opacity: numberOpacity }}
        className="text-[6rem] sm:text-[9rem] font-display font-black text-white absolute -top-12 sm:-top-20 -left-5 sm:-left-10 -z-10 pointer-events-none"
      >
        {step.id}
      </motion.div>

      <div className="relative z-10">
        <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center mb-4 shadow-lg shadow-black/20">
          <span className="font-display font-bold text-base">{step.id}</span>
        </div>
        <h3 className="text-lg md:text-xl font-display font-bold mb-2 text-white tracking-tight leading-tight">
          {step.title}
        </h3>
        <p className="text-white/80 leading-relaxed text-[12px] md:text-xs font-light">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
};

export const ProcessSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.2, once: true });
  const [hasStarted, setHasStarted] = useState(false);

  const autoProgress = useMotionValue(0);
  const cardsProgress = useSpring(autoProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  });

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);
      animate(autoProgress, 1, {
        duration: 8, // 8 seconds to complete the full sequence
        ease: "linear"
      });
    }
  }, [isInView, hasStarted, autoProgress]);

  return (
    <section id="approach" className="relative bg-[#FBFBFB] py-16 md:py-20" ref={containerRef}>
      <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
      <div className="section-container !py-0 relative flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12 relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Intelligent Multi-Level Candidate Screening Process.
          </h2>
          <p className="text-muted text-base max-w-xl mx-auto">
            At Amanzi, we follow a structured and technology-driven recruitment screening process designed to identify the most suitable talent with speed, accuracy, and quality assurance. Our multi-stage evaluation methodology ensures that every candidate is assessed thoroughly before reaching the final hiring stage.
          </p>
        </motion.div>

        <div className="relative w-full max-w-[1000px] mx-auto">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 relative z-10 w-full">
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
    </section>
  );
};
