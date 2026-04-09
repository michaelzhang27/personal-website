"use client";

import React from "react";

const LINKS = [
  { label: "EMAIL", href: "mailto:mmz@mit.edu", external: false },
  { label: "X", href: "https://x.com/michael_mzhang", external: true },
  { label: "LINKEDIN", href: "https://www.linkedin.com/in/michaelmingenzhang/", external: true },
  { label: "INSTAGRAM", href: "https://www.instagram.com/__michaelzhang/", external: true },
];

export default function NewFooter() {
  return (
    <section className="relative flex flex-col" id="footer">
      {/* Banner */}
      <div className="flex justify-center items-center p-8" style={{ minHeight: "55vh" }}>
        <div className="relative">
          <img
            src="/images/banner.jpg"
            alt="Footer banner"
            className="object-contain max-w-full max-h-full"
            style={{ opacity: 0.9 }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif italic font-bold select-none"
            style={{
              color: "#F5F5F5",
              fontSize: "clamp(3.5rem, 10vw, 7rem)",
              textShadow: "0 2px 40px rgba(0,0,0,0.5)",
            }}
          >
            MZ
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <footer
        className="w-full py-6"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "#000" }}
      >
        <div className="container mx-auto flex flex-col items-center md:flex-row md:justify-between px-8 gap-4">
          <span className="hidden md:block text-[10px] tracking-[0.3em]" style={{ color: "#444" }}>
            JACKSONVILLE, FL
          </span>

          <div className="flex space-x-8">
            {LINKS.map(({ label, href, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="text-[10px] tracking-[0.25em] transition-colors duration-200"
                style={{ color: "#888" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#F0F0F0")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#888")}
              >
                {label}
              </a>
            ))}
          </div>

          <span className="hidden md:block text-[10px] tracking-[0.3em]" style={{ color: "#444" }}>
            COPYRIGHT 2026
          </span>
        </div>
      </footer>
    </section>
  );
}
