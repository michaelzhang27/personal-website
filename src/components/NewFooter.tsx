"use client";

import React from "react";

export default function NewFooter() {
  return (
    <section className="relative flex flex-col" id="footer">
      {/* Banner Image Section */}
      <div className="flex justify-center items-center p-8 min-h-[60vh]">
        <div className="relative">
          <img
            src="/images/banner.jpg"
            alt="Footer banner"
            className="object-contain max-w-full max-h-full"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#F5F5F5] text-6xl md:text-8xl font-serif italic font-bold">
            MZ
          </div>
        </div>
      </div>

      {/* Footer Bar */}
      <footer className="w-full bg-[#0A0A0A] py-8">
        <div className="container mx-auto flex flex-col items-center md:flex-row md:justify-between text-[#E8E8E8] text-sm font-serif tracking-wide">
          <span className="hidden md:block">JACKSONVILLE, FL</span>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="mailto:mmz@mit.edu" className="hover:underline">
              EMAIL
            </a>
            <a
              href="https://x.com/michael_mzhang"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              X
            </a>
            <a
              href="https://www.linkedin.com/in/michaelmingenzhang/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LINKEDIN
            </a>
            <a
              href="https://www.instagram.com/__michaelzhang/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              INSTAGRAM
            </a>
          </div>
          <span className="hidden md:block">COPYRIGHT 2025</span>
        </div>
      </footer>
    </section>
  );
}
