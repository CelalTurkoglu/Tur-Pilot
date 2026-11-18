"use client";

import React, { useState } from "react";
import type { FeatureGroup } from "@/data/content";
import { MinusIcon, PlusIcon } from "./Icons";

export function FeaturesAccordion({
  groups,
  title,
}: {
  groups: FeatureGroup[];
  title: string;
}) {
  // İlk satır açık varsayılan (Görsel 2 stili)
  const [openKey, setOpenKey] = useState<string | null>("0-0");

  return (
    <section
      aria-labelledby="feature-library-heading"
      className="bg-white py-16 sm:py-20"
    >
      <div className="max-w-[1120px] mx-auto px-4 sm:px-8">
        <div className="max-w-[680px]">
          <p className="text-[13px] font-bold uppercase tracking-wider text-[#2457D6]">
            Detaylı Teknik Kapsam
          </p>
          <h2
            id="feature-library-heading"
            className="mt-2 text-[28px] sm:text-[34px] font-bold text-[#15304C] font-display leading-tight"
          >
            {title}
          </h2>
        </div>

        <div className="mt-10 space-y-12">
          {groups.map((group, gIdx) => (
            <div key={group.id} id={group.id} className="scroll-mt-20">
              <div className="mb-3">
                <h3 className="text-[20px] sm:text-[22px] font-bold text-[#15304C] font-condensed">
                  {group.title}
                </h3>
                <p className="mt-1 text-[14px] text-[#5A6472]">
                  {group.summary}
                </p>
              </div>

              <div className="border-t border-[#DDE2E9]">
                {group.items.map((item, iIdx) => {
                  const key = `${gIdx}-${iIdx}`;
                  const isOpen = openKey === key;
                  return (
                    <div key={item.name} className="border-b border-[#DDE2E9]">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenKey(isOpen ? null : key)}
                        className="w-full min-h-[56px] py-4 flex items-center justify-between gap-4 text-left cursor-pointer group"
                      >
                        <span className="text-[16px] font-semibold text-[#15304C] group-hover:text-[#2457D6] transition-colors">
                          {item.name}
                        </span>
                        <span className="shrink-0 w-8 h-8 flex items-center justify-center text-[#15304C]">
                          {isOpen ? (
                            <MinusIcon size={18} />
                          ) : (
                            <PlusIcon size={18} />
                          )}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="pb-6 grid grid-cols-1 md:grid-cols-12 gap-4">
                          <div className="hidden md:block md:col-span-4 text-[13px] font-medium text-[#5A6472]">
                            Operasyonel Karşılık
                          </div>
                          <div className="md:col-span-8">
                            <p className="text-[15px] leading-relaxed text-[#34465A]">
                              {item.detail}
                            </p>
                            <ul className="mt-3 list-disc pl-5 space-y-1.5 text-[14px] text-[#34465A]">
                              {item.bullets.map((b) => (
                                <li key={b}>{b}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
