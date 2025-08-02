"use client";

import ModelViewer from "../components/ModelViewer";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Experience from "../components/Experience";
import NewFooter from "../components/NewFooter";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const picturesRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [picturesVisible, setPicturesVisible] = useState(false);

  // Handle fade-in and fade-out animation for pictures section
  useEffect(() => {
    if (picturesRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.95) {
              setPicturesVisible(true);
            } else if (
              !entry.isIntersecting ||
              entry.intersectionRatio < 0.95
            ) {
              setPicturesVisible(false);
            }
          });
        },
        {
          threshold: 0.95, // Trigger when 95% of the section is visible (essentially full view)
          rootMargin: "0px",
        }
      );

      observer.observe(picturesRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  // Handle horizontal scrolling via overall vertical scroll position
  useEffect(() => {
    // Pin the pictures section and horizontally scroll the image gallery
    if (picturesRef.current && galleryRef.current) {
      const picturesSection = picturesRef.current;
      const gallery = galleryRef.current;
      const galleryImages = gallery.children as HTMLCollectionOf<HTMLElement>;
      const firstImage = galleryImages[0];
      const lastImage = galleryImages[galleryImages.length - 1];
      const containerWidth = picturesSection.offsetWidth;

      console.log("Gallery setup:", {
        containerWidth,
        galleryImagesLength: galleryImages.length,
        firstImage: !!firstImage,
        lastImage: !!lastImage,
        galleryScrollWidth: gallery.scrollWidth,
      });

      if (!firstImage || !lastImage) {
        console.log("Images not loaded yet");
        return; // Ensure images are loaded
      }

      // Calculate the horizontal translation to align the left edge of the first image with the center of the container
      const firstImageLeftAlignedToCenter =
        containerWidth / 2 - firstImage.offsetLeft;

      // Calculate the horizontal translation to align the right edge of the last image with the center of the container
      const lastImageRightAlignedToCenter =
        containerWidth / 2 - (lastImage.offsetLeft + lastImage.offsetWidth);

      // Calculate the vertical scroll distance needed to scroll horizontally through the gallery.
      // This is often the total scroll width of the gallery minus the width of the container.
      const galleryScrollWidth = gallery.scrollWidth;
      const verticalScrollDuration = Math.max(
        0,
        galleryScrollWidth - containerWidth
      );

      // Factor to increase vertical scroll resistance (higher value means more resistance)
      const scrollResistanceFactor = 2.5;
      const resistantVerticalScrollDuration =
        verticalScrollDuration * scrollResistanceFactor;

      console.log("Scroll calculations:", {
        firstImageLeftAlignedToCenter,
        lastImageRightAlignedToCenter,
        verticalScrollDuration,
        resistantVerticalScrollDuration,
      });

      // Animate the gallery horizontally from the position where the first image is centered
      // to the position where the last image's right edge is aligned with the container's center, driven by scroll.
      gsap.to(gallery, {
        x: lastImageRightAlignedToCenter,
        ease: "none", // Linear movement
        immediateRender: false, // Do not render the end state immediately
        scrollTrigger: {
          trigger: picturesSection,
          start: "top top", // Start the animation when the top of the trigger hits the top of the viewport
          end: () => `+=${resistantVerticalScrollDuration}`, // Use the calculated vertical scroll duration with resistance factor
          pin: true, // Pin the section while scrolling
          scrub: 1, // Link the animation to the scroll position
          onUpdate: (self) => {
            console.log("ScrollTrigger progress:", self.progress);
          },
        },
      });

      // Set the initial position using GSAP to ensure it's correct before the scroll starts
      gsap.set(gallery, { x: firstImageLeftAlignedToCenter });

      console.log("GSAP animation set up successfully");
    } else {
      console.log("Refs not available:", {
        picturesRef: !!picturesRef.current,
        galleryRef: !!galleryRef.current,
      });
    }

    // No cleanup needed for ScrollTrigger with pin: true, it handles removal
    return () => {
      // Cleanup ScrollTrigger instance on unmount
      ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) =>
        trigger.kill()
      );
    };
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="relative">
      <ModelViewer />

      {/* Empty space for first page - just the model */}
      <div className="h-screen"></div>

      {/* Pictures section - rendered directly like Welcome section */}
      <div
        ref={picturesRef}
        className="relative z-20 min-h-screen text-white overflow-hidden"
        data-pictures-section
      >
        <section
          className={`min-h-screen relative flex flex-col justify-center px-8 py-16 transition-opacity duration-1000 ease-out ${
            picturesVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Top Right Text */}
          <div className="absolute top-8 right-8 text-right text-gray-300 z-30 hidden md:block">
            <div className="text-lg md:text-xl tracking-widest font-light mb-2">
              STUDYING{" "}
              <span className="font-serif text-white">
                COMP SCI & FINANCE @ MIT
              </span>
            </div>
            <div className="text-lg md:text-xl tracking-widest font-light">
              BUILDING{" "}
              <span className="font-serif text-white">SOFTWARE @ D&B</span>
            </div>
          </div>

          {/* Photo Gallery Container */}
          <div className="flex justify-center items-center mb-16 w-full z-30">
            <div
              className="flex gap-4 no-scrollbar"
              ref={galleryRef}
              data-gallery
            >
              {[
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
              ].map((imagePath, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-64 h-80 md:w-72 md:h-96 bg-gray-800 rounded-lg overflow-hidden shadow-lg"
                >
                  <img
                    src={imagePath}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Text */}
          <div className="text-left max-w-4xl mx-auto z-30 pl-8">
            <p className="text-xl md:text-3xl lg:text-4xl font-serif leading-relaxed tracking-wide text-white">
              {"YOU'LL CATCH ME BUILDING PROJECTS,"}
              <br />
              {"PLAYING BASKETBALL, PIANO,"}
              <br />
              {"TENNIS, AND COLLECTING SHOES"}
            </p>
          </div>
        </section>
      </div>

      {/* Experience Section */}
      <div className="relative z-20 min-h-screen">
        <Experience />
      </div>

      {/* Footer Section */}
      <div className="relative z-20">
        <NewFooter />
      </div>
    </div>
  );
}
