"use client";

import ModelViewer from "../components/ModelViewer";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Experience from "../components/Experience";
import NewFooter from "../components/NewFooter";

gsap.registerPlugin(ScrollTrigger);

const FLOAT_ITEMS = [
  { content: "{ }",                               duration: 22 },
  { content: "</>",                               duration: 28 },
  { content: "🏀",                                duration: 25 },
  { content: "π",                                 duration: 32 },
  { content: 'const hometown = "jax, fl"',        duration: 32 },
  { content: "🇺🇸 🇨🇦",                           duration: 27 },
  { content: "∑",                                 duration: 29 },
  { content: "const school = \"MIT '27\"",        duration: 30 },
  { content: "🎹",                                duration: 24 },
  { content: "const coffee = false",              duration: 27 },
  { content: 'const fav_food = "salmon 🍣"',      duration: 30 },
  { content: "🎾",                                duration: 25 },
  { content: "const fav_number = 0",              duration: 28 },
  { content: "👟",                                duration: 26 },
  { content: 'const high_school = "Atlanta, GA"', duration: 34 },
  { content: "🥊",                                duration: 23 },
  { content: "const naps = true",                 duration: 26 },
  { content: "const i_love_lego = true",          duration: 28 },
  { content: "=>",                                duration: 25 },
];

const GALLERY_IMAGES = [
  "/images/IMG_8351.jpg",
  "/images/IMG_8864.jpg",
  "/images/img.png",
  "/images/download.jpg",
  "/images/IMG_7932.jpg",
  "/images/IMG_9550.jpg",
  "/images/IMG_9906.jpg",
  "/images/newimage.jpg",
  "/images/IMG_8783.jpg",
  "/images/image.jpg",
  "/images/IMG_9328.jpg",
];

export default function Home() {
  const picturesRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [picturesVisible, setPicturesVisible] = useState(false);

  // Generated client-side only (useEffect) to avoid SSR/client hydration mismatch.
  // Jittered uniform distribution: divides the x-axis into equal segments then
  // picks a random point within each, shuffled so content order ≠ position order.
  type FloatItem = { content: string; duration: number; x: number; delay: number };
  const [floatItems, setFloatItems] = useState<FloatItem[]>([]);
  useEffect(() => {
    const count = FLOAT_ITEMS.length;
    const xs = Array.from({ length: count }, (_, i) => {
      const seg = 82 / count;
      return 3 + i * seg + Math.random() * seg * 0.85;
    }).sort(() => Math.random() - 0.5);
    setFloatItems(FLOAT_ITEMS.map((item, i) => ({ ...item, x: xs[i], delay: -(Math.random() * item.duration) })));
  }, []);

  useEffect(() => {
    if (!picturesRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setPicturesVisible(entry.isIntersecting && entry.intersectionRatio >= 0.9);
        });
      },
      { threshold: 0.9 }
    );
    observer.observe(picturesRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!picturesRef.current || !galleryRef.current) return;

    const section = picturesRef.current;
    const gallery = galleryRef.current;
    const images = gallery.children as HTMLCollectionOf<HTMLElement>;
    const first = images[0];
    const last = images[images.length - 1];
    if (!first || !last) return;

    const containerWidth = section.offsetWidth;
    const firstCenterOffset = containerWidth / 2 - first.offsetLeft;
    const lastCenterOffset = containerWidth / 2 - (last.offsetLeft + last.offsetWidth);
    const scrollDistance = Math.max(0, gallery.scrollWidth - containerWidth);

    gsap.set(gallery, { x: firstCenterOffset });
    gsap.to(gallery, {
      x: lastCenterOffset,
      ease: "none",
      immediateRender: false,
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${scrollDistance * 2.5}`,
        pin: true,
        scrub: 1.2,
      },
    });

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <div className="relative">
      {/* Global animated background layer — sits behind the transparent canvas */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
        style={{ zIndex: 3 }}
      >
        {/* Grid lines + dot intersections */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: [
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            ].join(", "),
            backgroundSize: "40px 40px, 40px 40px",
          }}
        />

        {/* Basketball court watermark */}
        <svg
          viewBox="0 0 940 500"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="absolute"
          style={{
            width: "82vw",
            height: "auto",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0.1,
          }}
        >
          {/* Court outline */}
          <rect x="1" y="1" width="938" height="498" />
          {/* Half-court line */}
          <line x1="470" y1="0" x2="470" y2="500" />
          {/* Center circle */}
          <circle cx="470" cy="250" r="60" />

          {/* ── Left side ── */}
          {/* Key / paint */}
          <rect x="0" y="168" width="190" height="164" />
          {/* Free throw circle — front half solid, back half dashed */}
          <path d="M 190 190 A 60 60 0 0 1 190 310" />
          <path d="M 190 190 A 60 60 0 0 0 190 310" strokeDasharray="7 5" />
          {/* Basket */}
          <circle cx="52" cy="250" r="8" />
          {/* Restricted area */}
          <path d="M 52 210 A 40 40 0 0 1 52 290" />
          {/* Three-point line */}
          <line x1="0" y1="30" x2="143" y2="30" />
          <path d="M 143 30 A 238 238 0 0 1 143 470" />
          <line x1="143" y1="470" x2="0" y2="470" />

          {/* ── Right side ── */}
          <rect x="750" y="168" width="190" height="164" />
          <path d="M 750 190 A 60 60 0 0 0 750 310" />
          <path d="M 750 190 A 60 60 0 0 1 750 310" strokeDasharray="7 5" />
          <circle cx="888" cy="250" r="8" />
          <path d="M 888 210 A 40 40 0 0 0 888 290" />
          <line x1="940" y1="30" x2="797" y2="30" />
          <path d="M 797 30 A 238 238 0 0 0 797 470" />
          <line x1="797" y1="470" x2="940" y2="470" />
        </svg>

        {/* Floating symbols */}
        {floatItems.map((item, i) => (
          <div
            key={i}
            className="absolute bottom-0 font-mono select-none"
            style={{
              left: `${item.x}%`,
              fontSize: 13,
              animation: `floatUp ${item.duration}s ${item.delay}s infinite linear backwards`,
            }}
          >
            {item.content}
          </div>
        ))}
      </div>

      <ModelViewer />

      {/* Hero spacer */}
      <div className="h-screen" />

      {/* Gallery / About section */}
      <div
        ref={picturesRef}
        className="relative z-20 min-h-screen text-white overflow-hidden"
        data-pictures-section
      >
        <section
          className={`min-h-screen flex flex-col px-8 pt-10 pb-10 transition-opacity duration-700 ease-out ${
            picturesVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Top row — info text, in-flow so it doesn't bleed over gallery */}
          <div className="flex justify-end mb-10 flex-shrink-0">
            <div className="text-right hidden md:block space-y-2">
              <div className="flex items-baseline justify-end gap-3">
                <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase">Studying</span>
                <span className="text-sm tracking-widest font-serif text-white">COMP SCI &amp; FINANCE @ MIT</span>
              </div>
              <div className="flex items-baseline justify-end gap-3">
                <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase">Incoming</span>
                <span className="text-sm tracking-widest font-serif text-white">SOFTWARE ENGINEER @ GOLDMAN SACHS</span>
              </div>
            </div>
          </div>

          {/* Gallery — fills available vertical space */}
          <div className="flex-1 flex items-center justify-center overflow-hidden">
            <div className="flex gap-5 no-scrollbar" ref={galleryRef} data-gallery>
              {GALLERY_IMAGES.map((src, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-56 h-72 md:w-64 md:h-80 overflow-hidden"
                >
                  <img
                    src={src}
                    alt={`Gallery image ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Scroll hint */}
          <div
            className="flex-shrink-0 flex flex-col items-center gap-1 pb-2 mt-6"
            style={{ opacity: picturesVisible ? 1 : 0, transition: "opacity 0.6s ease" }}
          >
            <div className="text-[10px] tracking-[0.25em] text-white/30 font-sans">SCROLL</div>
            <div className="w-px h-7 bg-gradient-to-b from-white/30 to-transparent" />
          </div>
        </section>
      </div>

      {/* Experience section — no bg-black so model can be seen spinning into it */}
      <div className="relative z-20 min-h-screen">
        <Experience />
      </div>

      {/* Footer */}
      <div className="relative z-20">
        <NewFooter />
      </div>
    </div>
  );
}
