'use client';

import { HTMLMotionProps, motion } from 'framer-motion';
import { forwardRef } from 'react';

interface BrowserMockupProps extends HTMLMotionProps<'div'> {
  url?: string;
  children: React.ReactNode;
  variant?: 'light' | 'dark';
}

export const BrowserMockup = forwardRef<HTMLDivElement, BrowserMockupProps>(
  ({ url = 'turpilot.com.tr', children, variant = 'light', className = '', ...props }, ref) => {
    const isDark = variant === 'dark';

    return (
      <motion.div
        ref={ref}
        className={`overflow-hidden rounded-[28px] border ${isDark ? 'border-white/10 bg-[#0f1728]' : 'border-[rgba(15,32,56,0.08)] bg-white'} ${className}`}
        {...props}
      >
        <div
          className={`flex items-center gap-3 border-b px-4 py-3.5 ${
            isDark ? 'border-white/10 bg-[#111b2d]' : 'border-[rgba(15,32,56,0.08)] bg-[#f7fafc]'
          }`}
        >
          <div className="flex gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff8b7b]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#f4c95d]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#55d6a1]" />
          </div>

          <div
            className={`ml-1 flex flex-1 items-center rounded-full px-4 py-2 text-xs ${
              isDark ? 'bg-white/8 text-white/55' : 'border border-[rgba(15,32,56,0.08)] bg-white text-muted'
            }`}
          >
            <span className="truncate">{url}</span>
          </div>
        </div>

        <div className="relative overflow-hidden">{children}</div>
      </motion.div>
    );
  }
);

BrowserMockup.displayName = 'BrowserMockup';
