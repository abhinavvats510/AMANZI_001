import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'motion/react';

interface AnimatedCounterProps {
  value: string;
  suffix: string;
}

export const AnimatedCounter = ({ value, suffix }: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

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
