"use client";

import React, { useState, useEffect } from "react";

export default function Experience() {
  const [hoveredCardIndex, setHoveredCardIndex] = useState(-1);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Create intersection observer to trigger animation when section comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // Only trigger once
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: "0px",
      }
    );

    // Observe the experience section
    const experienceSection = document.getElementById("experience");
    if (experienceSection) {
      observer.observe(experienceSection);
    }

    return () => {
      if (experienceSection) {
        observer.unobserve(experienceSection);
      }
    };
  }, []);

  // Define preview content and links for each hoverable card
  // Updated order: Courtex AI, Dun & Bradstreet, Get a Job, NBA Intern, Cinema AI
  const previewContent = [
    { type: "video", src: "/demos/courtexdemo.mp4" }, // 0: Courtex AI
    { type: "text", message: "Coming Soon..." }, // 1: Dun & Bradstreet
    { type: "video", src: "/demos/getajobdemo.mp4" }, // 2: Get a Job
    { type: "video", src: "/demos/nbainterndemo.mp4" }, // 3: NBA Intern
    { type: "video", src: "/demos/cinemademo.mp4" }, // 4: Cinema AI
    { type: "video", src: "/demos/pickleballaidemo.mp4" }, // 5: Pickleball AI Project
    {
      type: "text",
      message: "Click to read!",
      href: "/papers/djtransitionpaper.pdf",
    }, // 6: DJ Transition Paper
    {
      type: "text",
      message: "Click to read!",
      href: "/papers/basketballpaper.pdf",
    }, // 7: Basketball Shot Paper
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      className="min-h-screen relative flex flex-col md:flex-row px-8 py-16 text-[#E8E8E8] overflow-hidden"
      id="experience"
      onMouseMove={handleMouseMove}
    >
      {/* Left Side - Experience */}
      <div className="w-full md:w-1/2 md:pr-8 flex flex-col justify-center mb-8 md:mb-0">
        <h2
          className={`text-4xl md:text-5xl font-serif mb-12 tracking-wide text-[#F0F0F0] transition-all duration-1000 ease-out transform ${
            isVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          }`}
          style={{ transitionDelay: "0ms" }}
        >
          EXPERIENCE
        </h2>

        <div className="space-y-6 bg-black">
          {/* Courtex AI */}
          <div
            className={`bg-[#121212] rounded-xl p-6 hover:bg-[#1A1A1A] transition-all duration-1000 ease-out transform ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
            }`}
            style={{ transitionDelay: "100ms" }}
            onMouseEnter={() => setHoveredCardIndex(0)}
            onMouseLeave={() => setHoveredCardIndex(-1)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center">
                  <img
                    src="/icons/courtexicon.png"
                    alt="Courtex AI Icon"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-serif text-[#F0F0F0]">
                    COURTEX AI
                  </h3>
                  <p className="text-xs md:text-sm tracking-wide text-[#E8E8E8]">
                    COLLEGIATE SPORTS ANALYTICS | 20+ D1 SCHOOLS ON WAITLIST
                  </p>
                </div>
              </div>
              <div className="text-right text-sm tracking-wide text-[#B8B8B8]">
                <div>COFOUNDER</div>
                <div>2025</div>
              </div>
            </div>
          </div>

          {/* Dun & Bradstreet */}
          <div
            className={`bg-[#121212] rounded-xl p-6 hover:bg-[#1A1A1A] transition-all duration-1000 ease-out transform ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
            onMouseEnter={() => setHoveredCardIndex(1)}
            onMouseLeave={() => setHoveredCardIndex(-1)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center">
                  <img
                    src="/icons/dnbicon.png"
                    alt="Dun & Bradstreet Icon"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-serif text-[#F0F0F0]">
                    DUN & BRADSTREET
                  </h3>
                  <p className="text-xs md:text-sm tracking-wide text-[#E8E8E8]">
                    LLM VALID. & OPTIM. | DATASET ANNOTATION PLATFORM
                  </p>
                </div>
              </div>
              <div className="text-right text-sm tracking-wide text-[#B8B8B8]">
                <div>OFFICE OF THE CTO INTERN</div>
                <div>2025</div>
              </div>
            </div>
          </div>

          {/* Get a Job */}
          <div
            className={`bg-[#121212] rounded-xl p-6 hover:bg-[#1A1A1A] transition-all duration-1000 ease-out transform ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
            }`}
            style={{ transitionDelay: "300ms" }}
            onMouseEnter={() => setHoveredCardIndex(2)}
            onMouseLeave={() => setHoveredCardIndex(-1)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center">
                  <img
                    src="/icons/getajobicon.png"
                    alt="Get a Job Icon"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-serif text-[#F0F0F0]">
                    GET A JOB
                  </h3>
                  <p className="text-xs md:text-sm tracking-wide text-[#E8E8E8]">
                    DAILY JOB SCRAPING NEWSLETTER
                  </p>
                </div>
              </div>
              <div className="text-right text-sm tracking-wide text-[#B8B8B8]">
                <div>FOUNDER</div>
                <div>2025</div>
              </div>
            </div>
          </div>

          {/* NBA Intern */}
          <div
            className={`bg-[#121212] rounded-xl p-6 hover:bg-[#1A1A1A] transition-all duration-1000 ease-out transform ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
            onMouseEnter={() => setHoveredCardIndex(3)}
            onMouseLeave={() => setHoveredCardIndex(-1)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center">
                  <img
                    src="/icons/nbaicon.png"
                    alt="NBA Intern Icon"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-serif text-[#F0F0F0]">
                    NBA INTERN
                  </h3>
                  <p className="text-xs md:text-sm tracking-wide text-[#E8E8E8]">
                    DATA ANALYTICS AND VISUALIZATIONS
                  </p>
                </div>
              </div>
              <div className="text-right text-sm tracking-wide text-[#B8B8B8]">
                <div>SOFTWARE ENGINEER INTERN</div>
                <div>2025</div>
              </div>
            </div>
          </div>

          {/* Cinema AI */}
          <div
            className={`bg-[#121212] rounded-xl p-6 hover:bg-[#1A1A1A] transition-all duration-1000 ease-out transform ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
            }`}
            style={{ transitionDelay: "500ms" }}
            onMouseEnter={() => setHoveredCardIndex(4)}
            onMouseLeave={() => setHoveredCardIndex(-1)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center">
                  <img
                    src="/icons/cinemaicon.png"
                    alt="Cinema AI Icon"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-serif text-[#F0F0F0]">
                    CINEMA AI
                  </h3>
                  <p className="text-xs md:text-sm tracking-wide text-[#E8E8E8]">
                    AUTOMATED VIDEO EDITING IN THE BROWSER
                  </p>
                </div>
              </div>
              <div className="text-right text-sm tracking-wide text-[#B8B8B8]">
                <div>SOFTWARE ENGINEER</div>
                <div>2025</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Projects */}
      <div className="w-full md:w-1/2 md:pl-8 flex flex-col justify-center space-y-6">
        {/* Projects Section */}
        <div>
          <h2
            className={`text-4xl md:text-5xl font-serif mb-12 tracking-wide text-[#F0F0F0] transition-all duration-1000 ease-out transform ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            PROJECTS
          </h2>
          <div className="space-y-6">
            {/* Pickleball AI */}
            <div
              className={`bg-[#121212] rounded-xl p-6 hover:bg-[#1A1A1A] transition-all duration-1000 ease-out transform ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
              onMouseEnter={() => setHoveredCardIndex(5)}
              onMouseLeave={() => setHoveredCardIndex(-1)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center">
                    <img
                      src="/icons/pickleballaiicon.png"
                      alt="Pickleball AI Icon"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-serif text-[#F0F0F0]">
                      PICKLEBALL AI
                    </h3>
                    <p className="text-xs md:text-sm tracking-wide text-[#E8E8E8]">
                      OPENCV • TENSORFLOW • PYTHON
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* DJ Transition Paper */}
            <div>
              <a
                href={previewContent[6].href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className={`bg-[#121212] rounded-xl p-6 hover:bg-[#1A1A1A] transition-all duration-1000 ease-out transform ${
                    isVisible
                      ? "translate-x-0 opacity-100"
                      : "translate-x-full opacity-0"
                  }`}
                  style={{ transitionDelay: "300ms" }}
                  onMouseEnter={() => setHoveredCardIndex(6)}
                  onMouseLeave={() => setHoveredCardIndex(-1)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center">
                        <img
                          src="/icons/djtransitionicon.png"
                          alt="DJ Transition Icon"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-serif text-[#F0F0F0]">
                          A MATHEMATICAL APPROACH TO DJ&apos;ING
                        </h3>
                        <p className="text-xs md:text-sm tracking-wide text-[#E8E8E8]">
                          RESEARCH PAPER
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            {/* Basketball Shot Paper */}
            <div>
              <a
                href={previewContent[7].href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className={`bg-[#121212] rounded-xl p-6 hover:bg-[#1A1A1A] transition-all duration-1000 ease-out transform ${
                    isVisible
                      ? "translate-x-0 opacity-100"
                      : "translate-x-full opacity-0"
                  }`}
                  style={{ transitionDelay: "400ms" }}
                  onMouseEnter={() => setHoveredCardIndex(7)}
                  onMouseLeave={() => setHoveredCardIndex(-1)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center">
                        <img
                          src="/icons/basketballicon.png"
                          alt="Basketball Shot Icon"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-serif text-[#F0F0F0]">
                          THE FINGERPRINT OF A SHOT
                        </h3>
                        <p className="text-xs md:text-sm tracking-wide text-[#E8E8E8]">
                          RESEARCH PAPER
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Philosophy Image */}
        <div
          className={`bg-[#121212] rounded-xl p-6 hover:bg-[#1A1A1A] transition-all duration-1000 ease-out transform ${
            isVisible
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <div className="relative h-40 rounded-lg overflow-hidden">
            {/* Background Image */}
            <img
              src="/images/dome.jpeg"
              alt="Philosophy background image"
              className="w-full h-full object-cover opacity-80"
            />
            {/* Centered Monogram */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
              <div className="text-2xl font-serif mb-1 text-[#F0F0F0]">
                追求卓越
              </div>
              <div className="text-xs tracking-widest text-[#E8E8E8]">
                PURSUE EXCELLENCE
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Preview */}
      <div
        className={`fixed w-64 h-40 pointer-events-none transition-opacity duration-300 ease-in-out ${
          hoveredCardIndex !== -1 ? "opacity-100" : "opacity-0"
        }`}
        style={{
          top: cursorPosition.y,
          left: cursorPosition.x,
          transform: "translate(-50%, -50%)",
        }}
      >
        {hoveredCardIndex !== -1 &&
          previewContent[hoveredCardIndex].type === "video" && (
            <div className="relative w-full h-full flex items-center justify-center text-center">
              <video
                preload="auto"
                src={previewContent[hoveredCardIndex].src}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover rounded-md z-10"
              />
              <div className="absolute inset-0 w-full h-full bg-black text-white text-xs flex items-center justify-center rounded-md z-0 p-4">
                I&apos;m on Vercel free plan 😢, please refresh to see preview
              </div>
            </div>
          )}
        {hoveredCardIndex !== -1 &&
          previewContent[hoveredCardIndex].type === "text" && (
            <div className="w-full h-full bg-black text-white flex items-center justify-center rounded-md">
              {previewContent[hoveredCardIndex].message}
            </div>
          )}
      </div>
    </section>
  );
}
