"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CloseIcon, MenuIcon, TurPilotMark } from "./Icons";
import { useDemoModal } from "./DemoModal";

interface SiteHeaderProps {
  variant?: "blue" | "light";
  activePath?: "/" | "/ozellikler" | "/sistemini-olustur" | string;
}

export function SiteHeader({
  variant = "light",
  activePath = "/",
}: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openDemoModal } = useDemoModal();
  const isBlue = variant === "blue";

  const navLinks = [
    { href: "/ozellikler", label: "Özellikler" },
    { href: "/sistemini-olustur", label: "Sistemini Oluştur" },
    { href: "/#sss", label: "Sık Sorulanlar" },
  ];

  return (
    <header
      className={
        isBlue
          ? "bg-[#2457D6] text-white"
          : "bg-white text-[#15304C] border-b border-[#DDE2E9]"
      }
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-[72px] flex items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="TurPilot Ana Sayfa"
          className="inline-flex items-center min-h-[44px]"
        >
          <TurPilotMark inverted={isBlue} />
        </Link>

        <nav
          aria-label="Ana menü"
          className="hidden lg:flex items-center gap-7 text-[15px] font-medium"
        >
          {navLinks.map((item) => {
            const isActive = activePath === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isBlue
                    ? `min-h-[44px] inline-flex items-center transition-opacity ${
                        isActive
                          ? "text-white font-semibold underline underline-offset-4"
                          : "text-white/90 hover:text-white"
                      }`
                    : `min-h-[44px] inline-flex items-center transition-colors ${
                        isActive
                          ? "text-[#2457D6] font-semibold"
                          : "text-[#34465A] hover:text-[#2457D6]"
                      }`
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button
            type="button"
            onClick={() => openDemoModal("Üst Menü - Görüşme Planla")}
            className={
              isBlue
                ? "min-h-[44px] px-4 rounded-[10px] border border-white/40 bg-transparent text-white text-[14px] font-semibold hover:bg-white/10 transition-colors cursor-pointer"
                : "min-h-[44px] px-4 rounded-[10px] border border-[#DDE2E9] bg-white text-[#15304C] text-[14px] font-semibold hover:bg-[#F2F4F7] transition-colors cursor-pointer"
            }
          >
            Görüşme Planla
          </button>
          <Link
            href="/sistemini-olustur"
            className="min-h-[44px] px-5 rounded-[10px] bg-[#F2A900] hover:bg-[#dca000] text-[#15304C] text-[14px] font-bold inline-flex items-center justify-center transition-colors"
          >
            Sistemini Oluştur
          </Link>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <Link
            href="/sistemini-olustur"
            className="min-h-[44px] px-3.5 rounded-[10px] bg-[#F2A900] text-[#15304C] text-[13px] font-bold inline-flex items-center justify-center"
          >
            Sistemini Oluştur
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
            className={
              isBlue
                ? "min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-[10px] border border-white/30 text-white cursor-pointer"
                : "min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-[10px] border border-[#DDE2E9] text-[#15304C] cursor-pointer"
            }
          >
            {mobileOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className={
            isBlue
              ? "lg:hidden border-t border-white/15 bg-[#1A43A8] px-4 py-4 space-y-2"
              : "lg:hidden border-t border-[#DDE2E9] bg-white px-4 py-4 space-y-2"
          }
        >
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={
                isBlue
                  ? "flex items-center min-h-[44px] px-3 rounded-[10px] text-[15px] font-medium text-white hover:bg-white/10"
                  : "flex items-center min-h-[44px] px-3 rounded-[10px] text-[15px] font-medium text-[#15304C] hover:bg-[#F2F4F7]"
              }
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                openDemoModal("Mobil Menü - Görüşme Planla");
              }}
              className={
                isBlue
                  ? "w-full min-h-[46px] rounded-[10px] border border-white/40 text-white font-semibold text-[15px] cursor-pointer"
                  : "w-full min-h-[46px] rounded-[10px] border border-[#DDE2E9] text-[#15304C] font-semibold text-[15px] cursor-pointer"
              }
            >
              Görüşme Planla
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
