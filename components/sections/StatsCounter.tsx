'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

interface StatsCounterProps {
  items: StatItem[];
  className?: string;
}

function useCountUp(target: number, start: boolean, duration = 1500) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    const step = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [start, target, duration]);

  return value;
}

function Stat({ item, start }: { item: StatItem; start: boolean }) {
  const count = useCountUp(item.value, start);
  return (
    <div>
      <p className="font-display text-4xl md:text-5xl">
        {item.prefix}
        {count}
        {item.suffix}
      </p>
      <p className="mt-1 text-sm uppercase tracking-[0.12em] text-white/80">{item.label}</p>
    </div>
  );
}

export function StatsCounter({ items, className }: StatsCounterProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn('grid grid-cols-1 gap-6 sm:grid-cols-3', className)}>
      {items.map((item) => (
        <Stat key={item.label} item={item} start={start} />
      ))}
    </div>
  );
}
