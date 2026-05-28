import React from 'react';
import { STATS } from '../../constants';
import { AnimatedCounter } from '../shared/AnimatedCounter';

export const StatsSection = () => {
  return (
    <section className="bg-white py-16 md:py-20 border-y border-black/[0.03]">
      <div className="section-container !py-0 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <div className="text-3xl md:text-4xl font-display font-medium text-primary mb-1 tracking-tighter">
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
