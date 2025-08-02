"use client";

import React, { forwardRef, useRef } from "react";

// Define the props expected by the Pictures component
interface PicturesProps {
  galleryRef: React.RefObject<HTMLDivElement | null>;
}

// Use forwardRef to allow the parent component to pass a ref
const Pictures = forwardRef<HTMLElement, PicturesProps>(
  ({ galleryRef }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
      <section
        ref={ref}
        className="min-h-screen relative flex flex-col justify-center px-8 py-16 bg-gray-900 text-white overflow-hidden z-20"
        id="pictures"
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
        <div
          className="flex justify-center items-center mb-16 w-full z-30"
          ref={containerRef}
        >
          <div className="flex gap-4 no-scrollbar" ref={galleryRef}>
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
    );
  }
);

Pictures.displayName = "Pictures"; // Add a display name for easier debugging

export default Pictures;
