"use client";

import React, { useState, useEffect } from "react";

interface PreviewContent {
  type: "video" | "text";
  src?: string;
  message?: string;
}

interface Item {
  name: string;
  desc: string;
  role: string;
  year?: string;
  iconSrc?: string;
  iconFallback?: string;
  preview: PreviewContent;
  href?: string;
  badges?: { label: string; style: "incoming" | "default" }[];
}

const experiences: Item[] = [
  {
    name: "NEXUS AI",
    desc: "50+ NCAA D1 USERS · FEATURED ON ESPN",
    role: "COFOUNDER",
    year: "2025",
    iconSrc: "/icons/courtexicon.png",
    preview: { type: "video", src: "/demos/nexusdemo.mp4" },
    href: "https://nexusbasketball.org",
  },
  {
    name: "NBA",
    desc: "DATA ANALYTICS AND VISUALIZATIONS",
    role: "SWE INTERN",
    year: "2025",
    iconSrc: "/icons/nbaicon.png",
    preview: { type: "video", src: "/demos/nbainterndemo.mp4" },
  },
  {
    name: "DUN & BRADSTREET",
    desc: "LLM VALIDATION & OPTIMIZATION · DATASET ANNOTATION",
    role: "OFFICE OF THE CTO INTERN",
    year: "2025",
    iconSrc: "/icons/dnbicon.png",
    preview: { type: "text", message: "Coming Soon..." },
  },
  {
    name: "CINEMA AI",
    desc: "AUTOMATED VIDEO EDITING IN THE BROWSER",
    role: "SOFTWARE ENGINEER",
    year: "2024",
    iconSrc: "/icons/cinemaicon.png",
    preview: { type: "video", src: "/demos/cinemademo.mp4" },
  },
  {
    name: "SNEAKER HEAT",
    desc: "RESOLD EXCLUSIVE & CUSTOM PAINTED SHOES TO 100+ CUSTOMERS ON INSTAGRAM & EBAY",
    role: "FOUNDER",
    year: "2018–2022",
    iconFallback: "SH",
    preview: { type: "text", message: "The OG hustle." },
  },
];

const projects: Item[] = [
  {
    name: "GET A JOB",
    desc: "DAILY JOB SCRAPING NEWSLETTER",
    role: "FOUNDER",
    iconSrc: "/icons/getajobicon.png",
    preview: { type: "video", src: "/demos/getajobdemo.mp4" },
  },
  {
    name: "PADDLE AI",
    desc: "OPENCV · TENSORFLOW · PYTHON",
    role: "DEVELOPER",
    iconSrc: "/icons/pickleballaiicon.png",
    preview: { type: "video", src: "/demos/pickleballaidemo.mp4" },
  },
  {
    name: "A MATHEMATICAL APPROACH TO DJ'ING",
    desc: "RESEARCH PAPER",
    role: "AUTHOR",
    iconSrc: "/icons/djtransitionicon.png",
    preview: { type: "text", message: "Click to read!" },
    href: "/papers/djtransitionpaper.pdf",
  },
  {
    name: "THE FINGERPRINT OF A SHOT",
    desc: "RESEARCH PAPER",
    role: "AUTHOR",
    iconSrc: "/icons/basketballicon.png",
    preview: { type: "text", message: "Click to read!" },
    href: "/papers/basketballpaper.pdf",
  },
];

function ItemCard({
  item,
  isVisible,
  slideFrom,
  delay,
  onHover,
  onLeave,
}: {
  item: Item;
  isVisible: boolean;
  slideFrom: "left" | "right";
  delay: number;
  onHover: (item: Item) => void;
  onLeave: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const handleEnter = () => { setHovered(true); onHover(item); };
  const handleLeave = () => { setHovered(false); onLeave(); };

  const card = (
    <div
      className="transition-[transform,opacity] duration-700 ease-out will-change-transform"
      style={{
        transitionDelay: `${delay}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateX(0)"
          : `translateX(${slideFrom === "left" ? "-32px" : "32px"})`,
      }}
    >
      <div
        className="relative flex items-center gap-4 overflow-hidden cursor-pointer transition-colors duration-200"
        style={{
          background: hovered ? "var(--card-hover)" : "var(--card-bg)",
          padding: "18px 20px",
          border: "1px solid var(--border-subtle)",
          borderColor: hovered ? "var(--border-hover)" : "var(--border-subtle)",
        }}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {/* Gold left accent */}
        <div
          className="absolute left-0 top-0 bottom-0 w-0.5 transition-opacity duration-200"
          style={{ background: "var(--accent)", opacity: hovered ? 1 : 0 }}
        />

        {/* Icon */}
        <div
          className="flex-shrink-0 w-10 h-10 flex items-center justify-center overflow-hidden"
          style={{
            background: "#161616",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "6px",
          }}
        >
          {item.iconSrc ? (
            <img src={item.iconSrc} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-xs font-serif font-bold tracking-wide" style={{ color: "var(--accent)" }}>
              {item.iconFallback}
            </span>
          )}
        </div>

        {/* Name + description */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm md:text-base font-serif tracking-wide truncate" style={{ color: "#F0F0F0" }}>
              {item.name}
            </span>
            {item.badges?.map((b) => (
              <span
                key={b.label}
                className="text-[9px] px-2 py-0.5 rounded-full tracking-widest font-sans flex-shrink-0"
                style={
                  b.style === "incoming"
                    ? { border: "1px solid var(--accent)", color: "var(--accent)" }
                    : { background: "#333", color: "#fff" }
                }
              >
                {b.label}
              </span>
            ))}
          </div>
          <p className="text-[10px] tracking-widest mt-0.5 truncate" style={{ color: "var(--muted)" }}>
            {item.desc}
          </p>
        </div>

        {/* Role + year */}
        <div className="flex-shrink-0 text-right ml-2">
          <div className="text-[10px] tracking-widest uppercase" style={{ color: "#B0B0B0" }}>
            {item.role}
          </div>
          {item.year && (
            <div className="text-[10px] tracking-wider mt-0.5" style={{ color: "#555" }}>
              {item.year}
            </div>
          )}
        </div>

        {/* External link arrow */}
        {item.href && (
          <div
            className="flex-shrink-0 transition-opacity duration-200 ml-1"
            style={{ color: "var(--accent)", opacity: hovered ? 1 : 0 }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );

  if (item.href) {
    const isExternal = item.href.startsWith("http");
    return (
      <a href={item.href} target={isExternal ? "_blank" : "_self"} rel={isExternal ? "noopener noreferrer" : undefined} className="block">
        {card}
      </a>
    );
  }
  return card;
}

function SectionHeader({
  label, title, isVisible, slideFrom,
}: {
  label: string; title: string; isVisible: boolean; slideFrom: "left" | "right";
}) {
  return (
    <div
      className="mb-8 transition-[transform,opacity] duration-700 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateX(0)" : `translateX(${slideFrom === "left" ? "-24px" : "24px"})`,
      }}
    >
      <div className="text-[9px] tracking-[0.35em] mb-2 uppercase" style={{ color: "#444" }}>{label}</div>
      <h2 className="text-3xl md:text-4xl font-serif tracking-wide" style={{ color: "#F0F0F0" }}>{title}</h2>
      <div className="mt-3 h-px w-10" style={{ background: "var(--accent)" }} />
    </div>
  );
}

export default function Experience() {
  const [hoveredItem, setHoveredItem] = useState<Item | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    const section = document.getElementById("experience");
    if (section) observer.observe(section);
    return () => { if (section) observer.unobserve(section); };
  }, []);

  return (
    <section
      className="min-h-screen relative flex flex-col md:flex-row px-6 md:px-12 py-20 overflow-hidden gap-8 md:gap-16"
      id="experience"
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      style={{
        // Transparent at top so the 3D model is visible spinning into this section,
        // then fades to solid black as you scroll deeper in
        background: "transparent",
      }}
    >
      {/* Left — Experience */}
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <SectionHeader label="Career" title="EXPERIENCE" isVisible={isVisible} slideFrom="left" />
        <div className="space-y-2">
          {experiences.map((exp, i) => (
            <ItemCard
              key={exp.name}
              item={exp}
              isVisible={isVisible}
              slideFrom="left"
              delay={80 + i * 70}
              onHover={setHoveredItem}
              onLeave={() => setHoveredItem(null)}
            />
          ))}
        </div>
      </div>

      {/* Right — Projects */}
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <SectionHeader label="Work" title="PROJECTS" isVisible={isVisible} slideFrom="right" />
        <div className="space-y-2">
          {projects.map((proj, i) => (
            <ItemCard
              key={proj.name}
              item={proj}
              isVisible={isVisible}
              slideFrom="right"
              delay={80 + i * 70}
              onHover={setHoveredItem}
              onLeave={() => setHoveredItem(null)}
            />
          ))}
        </div>

        {/* Philosophy block */}
        <div
          className="mt-4 transition-[transform,opacity] duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateX(0)" : "translateX(24px)",
            transitionDelay: "520ms",
          }}
        >
          <div className="relative overflow-hidden" style={{ height: "120px", border: "1px solid var(--border-subtle)" }}>
            <img src="/images/dome.jpeg" alt="Philosophy" className="w-full h-full object-cover" style={{ opacity: 0.5 }} />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
              <div className="text-2xl font-serif mb-1" style={{ color: "#F0F0F0" }}>追求卓越</div>
              <div className="text-[9px] tracking-[0.35em]" style={{ color: "#ccc" }}>PURSUE EXCELLENCE</div>
            </div>
          </div>
        </div>
      </div>

      {/* Cursor hover preview */}
      <div
        className="fixed pointer-events-none z-50 transition-all duration-150 ease-out"
        style={{
          width: "300px",
          height: "188px",
          top: cursor.y,
          left: cursor.x,
          transform: `translate(-50%, -115%) scale(${hoveredItem ? 1 : 0.92})`,
          opacity: hoveredItem ? 1 : 0,
        }}
      >
        <div
          className="w-full h-full relative overflow-hidden"
          style={{
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 32px 64px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.04)",
            borderRadius: "10px",
          }}
        >
          {hoveredItem?.preview.type === "video" && hoveredItem.preview.src && (
            <>
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: "#0A0A0A", color: "#444", fontSize: "11px" }}>
                Loading preview...
              </div>
              <video
                key={hoveredItem.preview.src}
                preload="auto"
                src={hoveredItem.preview.src}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-10"
                style={{ borderRadius: "10px" }}
              />
            </>
          )}
          {hoveredItem?.preview.type === "text" && (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2" style={{ background: "#0A0A0A" }}>
              <div className="text-sm font-serif tracking-wide" style={{ color: "#F0F0F0" }}>{hoveredItem.preview.message}</div>
              {hoveredItem.href && (
                <div className="text-[9px] tracking-widest" style={{ color: "var(--accent)" }}>↗ OPEN</div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
