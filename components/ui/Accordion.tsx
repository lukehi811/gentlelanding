'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={item.question} className="overflow-hidden rounded-xl border border-black/10 bg-white">
            <button
              className="flex w-full items-center justify-between px-5 py-4 text-left text-text-dark"
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="font-medium">{item.question}</span>
              <ChevronDown className={cn('h-4 w-4 transition', isOpen ? 'rotate-180' : 'rotate-0')} />
            </button>
            <div className={cn('grid transition-all duration-300', isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm text-text-dark/80">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
