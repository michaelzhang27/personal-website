"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { Suspense, useRef, useEffect, useState } from "react";
import * as THREE from "three";

function Model({
  scrollProgress,
  screenHeight,
  galleryScrollComplete,
  galleryStartScrollY,
}: {
  scrollProgress: number;
  screenHeight: number;
  galleryScrollComplete: boolean;
  galleryStartScrollY: number;
}) {
  const { scene } = useGLTF("/character.glb");
  const modelRef = useRef<THREE.Group>(null);
  const entranceRef = useRef(0);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => { scrollYRef.current = window.scrollY; };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(() => {
    if (!modelRef.current) return;

    const isMobile = window.innerWidth < 768;
    entranceRef.current = Math.min(entranceRef.current + 0.04, 1);
    const entranceX = -10 + entranceRef.current * 10;

    const scrollY = scrollYRef.current;
    const targetRotationAtPage1End = 5.8;
    const dynamicRotationRate = targetRotationAtPage1End / screenHeight;
    const baseScale = 4;
    const targetScaleAtPage1End = 6.2;

    let rotationY: number;
    let moveX: number;
    let currentScale: number;

    if (scrollProgress < 1) {
      rotationY = scrollY * dynamicRotationRate;
      moveX = isMobile ? Math.min(scrollY * 0.002, 6) : Math.min(scrollY * 0.004, 10);
      currentScale = baseScale + scrollProgress * (targetScaleAtPage1End - baseScale);
    } else if (!galleryScrollComplete) {
      rotationY = targetRotationAtPage1End;
      moveX = isMobile ? Math.min(screenHeight * 0.002, 6) : Math.min(screenHeight * 0.004, 10);
      currentScale = targetScaleAtPage1End;
    } else {
      const frozenPosition = isMobile
        ? Math.min(screenHeight * 0.002, 6)
        : Math.min(screenHeight * 0.004, 10);
      const thirdPageScroll = scrollY - galleryStartScrollY;
      // Exit completes in 50% of screen height — fast, dramatic
      const thirdPageProgress = Math.min(thirdPageScroll / (screenHeight * 0.5), 1);

      // 3x spin rate during exit for dramatic effect
      rotationY = targetRotationAtPage1End + thirdPageScroll * dynamicRotationRate * 3;
      // Ease-in scale-down (feels like it's being sucked in)
      currentScale = Math.max(0, targetScaleAtPage1End * Math.pow(1 - thirdPageProgress, 1.3));
      // Faster lateral sweep
      moveX = frozenPosition + Math.min(thirdPageScroll * 0.02, 15);
    }

    modelRef.current.rotation.y = rotationY;
    modelRef.current.position.x = entranceX - moveX;
    modelRef.current.scale.set(currentScale, currentScale, currentScale);
  });

  return <primitive ref={modelRef} object={scene} scale={[4, 4, 4]} />;
}

export default function ModelViewer() {
  const [scrollY, setScrollY] = useState(0);
  const [galleryScrollComplete, setGalleryScrollComplete] = useState(false);
  const [galleryStartScrollY, setGalleryStartScrollY] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [entranceComplete, setEntranceComplete] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLoaded(true), 100);
    // After the longest entrance animation finishes (700ms delay + 700ms duration + buffer)
    const t2 = setTimeout(() => setEntranceComplete(true), 1600);

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const check = () => {
      const picturesSection = document.querySelector("[data-pictures-section]") as HTMLElement | null;
      if (!picturesSection) return;
      const rect = picturesSection.getBoundingClientRect();
      const isPinned = rect.top <= 0 && rect.bottom >= window.innerHeight;
      if (isPinned && !galleryScrollComplete) setGalleryStartScrollY(window.scrollY);
      setGalleryScrollComplete(!isPinned);
    };
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [galleryScrollComplete]);

  const screenHeight = typeof window !== "undefined" ? window.innerHeight : 800;
  const scrollProgress = scrollY / screenHeight;
  const textExit = Math.max(0, 1 - scrollProgress);

  // Corner labels: CSS `translate` property drives entrance, opacity tracks scroll
  const cornerStyle = (fromRight: boolean, delay = 300): React.CSSProperties => ({
    // CSS individual transform property — composes with transform, has its own transition
    translate: loaded ? "0" : `${fromRight ? "60px" : "-60px"}`,
    opacity: loaded ? textExit : 0,
    transition: entranceComplete
      ? "none"
      : `translate 0.55s cubic-bezier(0.16,1,0.3,1) ${delay}ms, opacity 0.4s ease ${delay}ms`,
  });

  // MICHAEL / ZHANG: entrance via `translate`, scroll exit via `transform` (no transition after entrance)
  // These two CSS properties compose — final position = translate + transform combined.
  const nameStyle = (fromRight: boolean, delay: number): React.CSSProperties => ({
    translate: loaded ? "0" : `${fromRight ? "100px" : "-100px"}`,
    transform: `translateX(${fromRight ? scrollProgress * 520 : -scrollProgress * 520}px)`,
    opacity: loaded ? 0.92 * textExit : 0,
    transition: entranceComplete
      ? "none"
      : `translate 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms, opacity 0.5s ease ${delay}ms`,
  });

  return (
    <div className="w-full h-screen fixed top-0 left-0 z-10">
      <Canvas
        camera={{ position: [8, 0, 8], fov: 35 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
        onCreated={({ gl, scene }) => {
          gl.setClearAlpha(0);
          scene.background = null;
        }}
      >
        <Suspense fallback={null}>
          <Model
            scrollProgress={scrollProgress}
            screenHeight={screenHeight}
            galleryScrollComplete={galleryScrollComplete}
            galleryStartScrollY={galleryStartScrollY}
          />
          <Environment preset="sunset" />
        </Suspense>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
      </Canvas>

      {/* Corner labels */}
      <div className="absolute top-7 right-7 text-white text-sm font-serif tracking-widest z-20" style={cornerStyle(true)}>
        {"{ MICHAEL M. ZHANG }"}
      </div>
      <div className="absolute top-7 left-7 text-white text-lg font-serif italic z-20" style={cornerStyle(false)}>
        MZ
      </div>
      <div className="absolute bottom-7 right-7 text-white text-xs font-serif tracking-widest z-20" style={cornerStyle(true)}>
        COPYRIGHT 2026
      </div>
      <div className="absolute bottom-7 left-7 text-white text-xs font-serif tracking-widest z-20" style={cornerStyle(false)}>
        JACKSONVILLE, FL
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20"
        style={{ opacity: textExit * (loaded ? 1 : 0), transition: "opacity 0.4s ease" }}
      >
        <div className="text-[10px] tracking-[0.25em] text-white/40 font-sans">SCROLL</div>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </div>

      {/* MICHAEL — Desktop */}
      <div
        className="hidden md:block absolute font-serif text-white z-0"
        style={{
          top: "min(35vh, 40%)",
          left: "min(19vw, 25%)",
          fontSize: "min(12vw, 9rem)",
          maxWidth: "40vw",
          lineHeight: 0.85,
          ...nameStyle(false, 500),
        }}
      >
        <div>MICHAEL</div>
        <div className="font-serif text-center mt-3" style={{ fontSize: "min(2vw, 1.1rem)", letterSpacing: "0.25em", opacity: 0.6 }}>
          STUDENT · ATHLETE
        </div>
      </div>

      {/* ZHANG — Desktop */}
      <div
        className="hidden md:block absolute font-serif text-white z-0"
        style={{
          bottom: "min(35vh, 40%)",
          right: "min(19vw, 25%)",
          fontSize: "min(12vw, 9rem)",
          maxWidth: "40vw",
          lineHeight: 0.85,
          ...nameStyle(true, 700),
        }}
      >
        <div>ZHANG</div>
        <div className="font-serif text-center mt-3" style={{ fontSize: "min(2vw, 1.1rem)", letterSpacing: "0.25em", opacity: 0.6 }}>
          DEVELOPER · FOUNDER
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden absolute inset-0 flex flex-col justify-center items-center text-white font-serif z-0 gap-6">
        <div
          style={{
            translate: loaded ? "0" : "-100px",
            transform: `translateX(${-scrollProgress * 400}px)`,
            opacity: loaded ? 0.92 * textExit : 0,
            transition: entranceComplete ? "none" : "translate 0.75s cubic-bezier(0.16,1,0.3,1) 500ms, opacity 0.5s ease 500ms",
            lineHeight: 0.85,
          } as React.CSSProperties}
          className="text-8xl sm:text-9xl text-center"
        >
          MICHAEL
          <div className="text-base tracking-[0.25em] text-center mt-2 opacity-60">STUDENT · ATHLETE</div>
        </div>
        <div
          style={{
            translate: loaded ? "0" : "100px",
            transform: `translateX(${scrollProgress * 400}px)`,
            opacity: loaded ? 0.92 * textExit : 0,
            transition: entranceComplete ? "none" : "translate 0.75s cubic-bezier(0.16,1,0.3,1) 700ms, opacity 0.5s ease 700ms",
            lineHeight: 0.85,
          } as React.CSSProperties}
          className="text-8xl sm:text-9xl text-center"
        >
          ZHANG
          <div className="text-base tracking-[0.25em] text-center mt-2 opacity-60">DEVELOPER · FOUNDER</div>
        </div>
      </div>
    </div>
  );
}
