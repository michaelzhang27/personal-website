"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import { Suspense, useRef, useEffect, useState } from "react";
import * as THREE from "three";

function Model({
  url,
  scrollProgress,
  screenHeight,
  galleryScrollComplete,
  galleryStartScrollY,
}: {
  url: string;
  scrollProgress: number;
  screenHeight: number;
  galleryScrollComplete: boolean;
  galleryStartScrollY: number;
}) {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);
  const [scrollY, setScrollY] = useState(0);
  const [entranceAnimation, setEntranceAnimation] = useState(0);

  useEffect(() => {
    // Entrance animation - slide in from left (faster)
    const animateEntrance = () => {
      setEntranceAnimation((prev) => {
        if (prev < 1) {
          return prev + 0.05; // Increased from 0.02 to 0.05
        }
        return 1;
      });
    };

    const entranceInterval = setInterval(animateEntrance, 16); // ~60fps

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(entranceInterval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useFrame(() => {
    if (modelRef.current) {
      // Check if we're on mobile
      const isMobile = window.innerWidth < 768;

      // Entrance animation - start from left (-10) and move to center (0)
      const entranceX = -10 + entranceAnimation * 10;

      // Rotation logic - pause during second page (gallery scroll), resume after
      // Calculate rotation rate based on screen size to achieve consistent final rotation
      const targetRotationAtPage1End = 5.8; // Target rotation in radians at end of page 1
      const dynamicRotationRate = targetRotationAtPage1End / screenHeight; // Adjust rate based on actual screen height

      let rotationY;
      if (scrollProgress < 1) {
        // First page - normal rotation (dynamic rate based on screen size)
        rotationY = scrollY * dynamicRotationRate;
        console.log(
          "Page 1 - scrollY:",
          scrollY,
          "rotationY:",
          rotationY,
          "rate:",
          dynamicRotationRate
        );
      } else if (scrollProgress >= 1 && !galleryScrollComplete) {
        // Second page - freeze rotation during gallery scroll
        rotationY = targetRotationAtPage1End; // Always freeze at the same target rotation
        console.log(
          "Page 2 - frozen rotationY:",
          rotationY,
          "scrollProgress:",
          scrollProgress,
          "galleryComplete:",
          galleryScrollComplete
        );
      } else {
        // Third page and beyond - resume rotation from frozen position
        const frozenRotation = targetRotationAtPage1End;
        const additionalRotation =
          (scrollY - galleryStartScrollY) * dynamicRotationRate;
        rotationY = frozenRotation + additionalRotation;
        console.log(
          "Page 3+ - frozenRotation:",
          frozenRotation,
          "additionalRotation:",
          additionalRotation,
          "totalRotation:",
          rotationY,
          "scrollProgress:",
          scrollProgress,
          "galleryComplete:",
          galleryScrollComplete,
          "galleryStartScrollY:",
          galleryStartScrollY
        );
      }

      // Unified animation logic - all properties stop/start together
      const baseScale = 4;
      const targetScaleAtPage1End = 6.2; // Target scale at end of page 1
      let moveX, currentScale;

      if (scrollProgress < 1) {
        // First page - all animations active
        // On mobile, move less to the left so it lands more to the right
        moveX = isMobile
          ? Math.min(scrollY * 0.002, 6) // Mobile: less movement, max 6 instead of 10
          : Math.min(scrollY * 0.004, 10); // Desktop: original movement
        const scaleIncrease =
          scrollProgress * (targetScaleAtPage1End - baseScale);
        currentScale = baseScale + scaleIncrease;
      } else if (scrollProgress >= 1 && !galleryScrollComplete) {
        // Second page - all animations frozen during gallery scroll
        moveX = isMobile
          ? Math.min(screenHeight * 0.002, 6) // Mobile: less movement
          : Math.min(screenHeight * 0.004, 10); // Desktop: original movement
        currentScale = targetScaleAtPage1End; // Lock scale
      } else {
        // Third page and beyond - animation to bottom left corner
        const frozenPosition = isMobile
          ? Math.min(screenHeight * 0.002, 6) // Mobile: less movement
          : Math.min(screenHeight * 0.004, 10); // Desktop: original movement
        const frozenScale = targetScaleAtPage1End;

        // Calculate progress through the third page (one screen height)
        const thirdPageScroll = scrollY - galleryStartScrollY;
        const thirdPageProgress = Math.min(thirdPageScroll / screenHeight, 1);

        if (thirdPageProgress < 1) {
          // During third page - scale to 0 while continuing rotation and movement

          // Scale down to 0
          currentScale = frozenScale * (1 - thirdPageProgress);

          // Move further left
          const additionalMovement = Math.min(thirdPageScroll * 0.008, 10);
          moveX = frozenPosition + additionalMovement;

          // Continue spinning (slower rate)
          const additionalRotation =
            thirdPageScroll * (dynamicRotationRate * 0.6);
          rotationY = targetRotationAtPage1End + additionalRotation;
        } else {
          // After third page - stay at scale 0
          currentScale = 0; // Completely invisible
          moveX = frozenPosition + Math.min(thirdPageScroll * 0.008, 10);
          rotationY =
            targetRotationAtPage1End +
            thirdPageScroll * (dynamicRotationRate * 0.3); // Keep spinning slower
        }
      }

      modelRef.current.rotation.y = rotationY;
      modelRef.current.position.x = entranceX - moveX;
      modelRef.current.scale.set(currentScale, currentScale, currentScale);
    }
  });

  return <primitive ref={modelRef} object={scene} scale={[4, 4, 4]} />;
}

export default function ModelViewer() {
  const [michaelAnimation, setMichaelAnimation] = useState(0);
  const [zhangAnimation, setZhangAnimation] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [cornerAnimation, setCornerAnimation] = useState(0);
  const [galleryScrollComplete, setGalleryScrollComplete] = useState(false);
  const [galleryStartScrollY, setGalleryStartScrollY] = useState(0);

  useEffect(() => {
    // Corner text animation starts after model entrance (0.5 seconds)
    const cornerTimer = setTimeout(() => {
      const animateCorner = () => {
        setCornerAnimation((prev) => {
          if (prev < 1) {
            return prev + 0.1; // Fast animation
          }
          return 1;
        });
      };
      const cornerInterval = setInterval(animateCorner, 16);
      return () => clearInterval(cornerInterval);
    }, 500);

    // Michael animation starts after model entrance (0.5 seconds - even faster)
    const michaelTimer = setTimeout(() => {
      const animateMichael = () => {
        setMichaelAnimation((prev) => {
          if (prev < 1) {
            return prev + 0.12; // Increased from 0.08 to 0.12
          }
          return 1;
        });
      };
      const michaelInterval = setInterval(animateMichael, 16);
      return () => clearInterval(michaelInterval);
    }, 500); // Reduced from 1000 to 500

    // Zhang animation starts after Michael animation (0.3 seconds later - even faster)
    const zhangTimer = setTimeout(() => {
      const animateZhang = () => {
        setZhangAnimation((prev) => {
          if (prev < 1) {
            return prev + 0.12; // Increased from 0.08 to 0.12
          }
          return 1;
        });
      };
      const zhangInterval = setInterval(animateZhang, 16);
      return () => clearInterval(zhangInterval);
    }, 800); // Reduced from 1500 to 800

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(cornerTimer);
      clearTimeout(michaelTimer);
      clearTimeout(zhangTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Track when gallery scroll is complete and vertical scrolling resumes
  useEffect(() => {
    const checkGalleryScroll = () => {
      const picturesSection = document.querySelector(
        "[data-pictures-section]"
      ) as HTMLElement;
      if (picturesSection) {
        // Check if the pictures section is still pinned (meaning gallery scroll is active)
        const rect = picturesSection.getBoundingClientRect();
        const isPinned = rect.top <= 0 && rect.bottom >= window.innerHeight;

        if (isPinned && !galleryScrollComplete) {
          // Gallery just started - capture the scroll position
          setGalleryStartScrollY(window.scrollY);
        }

        setGalleryScrollComplete(!isPinned);
      }
    };

    window.addEventListener("scroll", checkGalleryScroll);
    return () => window.removeEventListener("scroll", checkGalleryScroll);
  }, [galleryScrollComplete]);

  // Calculate text animations based on scroll
  const screenHeight = typeof window !== "undefined" ? window.innerHeight : 800;
  const scrollProgress = scrollY / screenHeight; // 0 to N over multiple pages
  const textExitAnimation = Math.max(0, 1 - scrollProgress); // Text slides out and fades out as you scroll

  return (
    <div className="w-full h-screen fixed top-0 left-0 z-10">
      <Canvas
        camera={{ position: [8, 0, 8], fov: 35 }}
        style={{ background: "black" }}
      >
        <Suspense fallback={null}>
          <Model
            url="/character.glb"
            scrollProgress={scrollProgress}
            screenHeight={screenHeight}
            galleryScrollComplete={galleryScrollComplete}
            galleryStartScrollY={galleryStartScrollY}
          />
          <Environment preset="sunset" />
        </Suspense>
        <OrbitControls
          enablePan={true}
          enableZoom={false}
          enableRotate={true}
          autoRotate={false}
        />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
      </Canvas>

      {/* Corner text elements */}
      {/* Top right - { MICHAEL M. ZHANG } */}
      <div
        className="absolute top-6 right-6 text-white text-lg font-serif z-20"
        style={{
          transform: `translateX(${(1 - cornerAnimation) * 200}px)`,
          opacity: cornerAnimation * textExitAnimation,
          transition: "opacity 0.5s ease-out",
        }}
      >
        {"{ MICHAEL M. ZHANG }"}
      </div>

      {/* Top left - MZ */}
      <div
        className="absolute top-6 left-6 text-white text-xl font-serif italic z-20"
        style={{
          transform: `translateX(${(cornerAnimation - 1) * 200}px)`,
          opacity: cornerAnimation * textExitAnimation,
          transition: "opacity 0.5s ease-out",
        }}
      >
        MZ
      </div>

      {/* Bottom right - COPYRIGHT 2025 */}
      <div
        className="absolute bottom-6 right-6 text-white text-sm font-serif z-20"
        style={{
          transform: `translateX(${(1 - cornerAnimation) * 200}px)`,
          opacity: cornerAnimation * textExitAnimation,
          transition: "opacity 0.5s ease-out",
        }}
      >
        COPYRIGHT 2025
      </div>

      {/* Bottom left - JACKSONVILLE, FL */}
      <div
        className="absolute bottom-6 left-6 text-white text-sm font-serif z-20"
        style={{
          transform: `translateX(${(cornerAnimation - 1) * 200}px)`,
          opacity: cornerAnimation * textExitAnimation,
          transition: "opacity 0.5s ease-out",
        }}
      >
        JACKSONVILLE, FL
      </div>

      {/* Michael text - positioned close to model, slides out to left and fades out (Desktop only) */}
      <div
        className="hidden md:block absolute text-white font-serif z-0"
        style={{
          top: "min(35vh, 40%)",
          left: "min(19vw, 25%)",
          fontSize: "min(12vw, 9rem)",
          maxWidth: "40vw",
          transform: `translateX(${
            (michaelAnimation - 1) * 200 - scrollProgress * 600
          }px)`,
          opacity: michaelAnimation * 0.9 * textExitAnimation,
          transition: "all 0.5s ease-out",
        }}
      >
        <div style={{ lineHeight: "0.8" }}>MICHAEL</div>
        <div
          className="font-serif mt-4 text-center"
          style={{ fontSize: "min(2.5vw, 1.5rem)" }}
        >
          STUDENT | ATHLETE
        </div>
      </div>

      {/* Zhang text - positioned close to model, slides out to right and fades out (Desktop only) */}
      <div
        className="hidden md:block absolute text-white font-serif z-0"
        style={{
          bottom: "min(35vh, 40%)",
          right: "min(19vw, 25%)",
          fontSize: "min(12vw, 9rem)",
          maxWidth: "40vw",
          transform: `translateX(${
            (1 - zhangAnimation) * 200 + scrollProgress * 600
          }px)`,
          opacity: zhangAnimation * 0.9 * textExitAnimation,
          transition: "all 0.5s ease-out",
        }}
      >
        <div style={{ lineHeight: "0.8" }}>ZHANG</div>
        <div
          className="font-serif mt-4 text-center"
          style={{ fontSize: "min(2.5vw, 1.5rem)" }}
        >
          DEVELOPER | FOUNDER
        </div>
      </div>

      {/* Mobile Stacked Layout - only visible on small screens */}
      <div className="md:hidden absolute inset-0 flex flex-col justify-center items-center text-white font-serif z-0">
        {/* Michael - top, slides out to left */}
        <div
          className="text-8xl sm:text-9xl text-center"
          style={{
            transform: `translateX(${
              (michaelAnimation - 1) * 200 - scrollProgress * 400
            }px)`,
            opacity: michaelAnimation * 0.9 * textExitAnimation,
            transition: "all 0.5s ease-out",
          }}
        >
          MICHAEL
          <div className="text-xl sm:text-2xl text-center">
            STUDENT | ATHLETE
          </div>
        </div>

        {/* Zhang - bottom, slides out to right */}
        <div
          className="text-8xl sm:text-9xl text-center mt-6"
          style={{
            transform: `translateX(${
              (1 - zhangAnimation) * 200 + scrollProgress * 400
            }px)`,
            opacity: zhangAnimation * 0.9 * textExitAnimation,
            transition: "all 0.5s ease-out",
          }}
        >
          ZHANG
          <div className="text-xl sm:text-2xl mt-2 text-center">
            DEVELOPER | FOUNDER
          </div>
        </div>
      </div>
    </div>
  );
}
