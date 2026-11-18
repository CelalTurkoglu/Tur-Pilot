"use client";

import React, { useState } from "react";
import type { FaqItem } from "@/data/content";
import { MinusIcon, PlusIcon } from "./Icons";

export function FaqAccordion({
  items,
  heading = "Sık Sorulan Sorular",
  id = "sss",
}: {
  items: FaqItem[];
  heading?: string;
  id?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="bg-white py-16 sm:py-20"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-4">
          <h2
            id={`${id}-heading`}
            className="text-[28px] sm:text-[32px] font-bold text-[#15304C] font-display leading-tight"
          >
            {heading}
          </h2>
          <p className="mt-3 text-[15px] text-[#5A6472] leading-relaxed">
            Kurulum, veri aktarımı, saha kullanımı ve fiyatlandırma hakkında
            acente sahiplerinin en sık sorduğu sorular.
          </p>
        </div>

        <div className="lg:col-span-8 border-t border-[#DDE2E9]">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={item.question} className="border-b border-[#DDE2E9]">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full min-h-[56px] py-4 flex items-center justify-between gap-4 text-left text-[16px] font-semibold text-[#15304C] hover:text-[#2457D6] transition-colors cursor-pointer"
                >
                  <span>{item.question}</span>
                  <span className="shrink-0 w-8 h-8 rounded-[8px] flex items-center justify-center text-[#15304C]">
                    {isOpen ? <MinusIcon size={18} /> : <PlusIcon size={18} />}
                  </span>
                </button>
                {isOpen && (
                  <div className="pb-5 pr-8 text-[15px] leading-relaxed text-[#34465A]">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
