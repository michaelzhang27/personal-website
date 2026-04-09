"use client";

import { useEffect, useRef, useState } from "react";

const SYMBOLS = [
  "MIT '27", "{ }", "π", "</>", "∑",
  "🎹", "👟", "🎾", "🥊", "🍣",
  "🏀", "∞", "=>", "MZ", "DJ",
];

interface Props {
  isLoaded: boolean;
  onDone: () => void;
}

export default function LoadingPortal({ isLoaded, onDone }: Props) {
  const [phase, setPhase] = useState<"loading" | "opening" | "gone">("loading");
  const [symIdx, setSymIdx] = useState(0);
  const [dots, setDots] = useState("");
  const [particles, setParticles] = useState<
    { x: number; size: number; dur: number; delay: number }[]
  >([]);
  const mountTime = useRef(Date.now());

  // Generate floating particles client-side only (avoids SSR hydration mismatch)
  useEffect(() => {
    setParticles(
      Array.from({ length: 14 }, () => ({
        x: Math.random() * 88 + 4,
        size: Math.random() * 1.5 + 0.8,
        dur: Math.random() * 14 + 10,
        delay: -(Math.random() * 18),
      }))
    );
  }, []);

  // Cycle symbols inside portal
  useEffect(() => {
    const id = setInterval(() => setSymIdx((i) => (i + 1) % SYMBOLS.length), 650);
    return () => clearInterval(id);
  }, []);

  // Animate "LOADING..." dots
  useEffect(() => {
    const id = setInterval(
      () => setDots((d) => (d.length >= 3 ? "" : d + ".")),
      380
    );
    return () => clearInterval(id);
  }, []);

  // Trigger opening once the 3D model signals it's loaded
  useEffect(() => {
    if (!isLoaded) return;
    const elapsed = Date.now() - mountTime.current;
    const minShow = 900; // always show at least 900ms so it doesn't flash
    const wait = Math.max(0, minShow - elapsed);
    const t1 = setTimeout(() => setPhase("opening"), wait);
    const t2 = setTimeout(() => {
      setPhase("gone");
      onDone();
    }, wait + 1100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isLoaded, onDone]);

  if (phase === "gone") return null;

  const opening = phase === "opening";

  return (
    <>
      <style>{`
        @keyframes lp-cw  { to { transform: rotate(360deg);  } }
        @keyframes lp-ccw { to { transform: rotate(-360deg); } }
        @keyframes lp-glow {
          0%,100% { box-shadow: 0 0 18px 2px rgba(212,175,55,.28), 0 0 60px 0 rgba(212,175,55,.08); }
          50%      { box-shadow: 0 0 38px 8px rgba(212,175,55,.6),  0 0 110px 0 rgba(212,175,55,.2); }
        }
        @keyframes lp-sym {
          0%   { opacity:0; transform:translate(-50%,-50%) scale(.55); }
          25%  { opacity:1; transform:translate(-50%,-50%) scale(1.08); }
          75%  { opacity:1; transform:translate(-50%,-50%) scale(1); }
          100% { opacity:0; transform:translate(-50%,-50%) scale(1.12); }
        }
        @keyframes lp-scan {
          0%   { top:8%;  opacity:0; }
          8%   { opacity:.55; }
          92%  { opacity:.55; }
          100% { top:92%; opacity:0; }
        }
        @keyframes lp-float {
          0%   { transform:translateY(0)     scale(1);   opacity:.55; }
          100% { transform:translateY(-100vh) scale(.4); opacity:0;   }
        }
        @keyframes lp-breathe {
          0%,100% { opacity:.22; }
          50%      { opacity:.55; }
        }
      `}</style>

      {/* ── Full-screen overlay ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "#000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          opacity: opening ? 0 : 1,
          transition: opening ? "opacity 0.7s ease 0.3s" : "none",
        }}
      >
        {/* Subtle grid — matches the main page */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: [
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            ].join(","),
            backgroundSize: "40px 40px",
          }}
        />

        {/* Floating ambient particles */}
        {particles.map((p, i) => (
          <div
            key={i}
            aria-hidden
            style={{
              position: "absolute",
              bottom: 0,
              left: `${p.x}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background:
                i % 3 === 0
                  ? "rgba(212,175,55,0.7)"
                  : "rgba(255,255,255,0.28)",
              animation: `lp-float ${p.dur}s ${p.delay}s infinite linear`,
            }}
          />
        ))}

        {/* ── Portal circle (scales up to swallow the screen on open) ── */}
        <div
          style={{
            position: "relative",
            width: 300,
            height: 300,
            flexShrink: 0,
            transform: opening ? "scale(18)" : "scale(1)",
            transition: opening
              ? "transform 0.9s cubic-bezier(0.55, 0, 0.8, 0.1)"
              : "none",
          }}
        >
          {/* Ring 1 — fast CW, gold/orange conic gradient */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background:
                "conic-gradient(from 0deg, #D4AF37 0%, #FF8C00 22%, #7B3F00 48%, transparent 62%, #D4AF37 100%)",
              animation: "lp-cw 2.3s linear infinite",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 9,
                borderRadius: "50%",
                background: "#000",
              }}
            />
          </div>

          {/* Ring 2 — slow CCW, dimmer accent */}
          <div
            style={{
              position: "absolute",
              inset: 15,
              borderRadius: "50%",
              background:
                "conic-gradient(from 200deg, transparent 35%, rgba(212,175,55,.4) 52%, transparent 68%)",
              animation: "lp-ccw 4.2s linear infinite",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 6,
                borderRadius: "50%",
                background: "#000",
              }}
            />
          </div>

          {/* Glow border ring */}
          <div
            style={{
              position: "absolute",
              inset: 25,
              borderRadius: "50%",
              border: "1px solid rgba(212,175,55,0.38)",
              animation: "lp-glow 2.4s ease-in-out infinite",
            }}
          />

          {/* ── Inner void ── */}
          <div
            style={{
              position: "absolute",
              inset: 29,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 42% 38%, #080510 55%, #120930 100%)",
              overflow: "hidden",
            }}
          >
            {/* Scan line sweeping through the void */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                height: 1,
                background:
                  "linear-gradient(90deg, transparent, rgba(212,175,55,.45), transparent)",
                animation: "lp-scan 3.8s ease-in-out infinite",
              }}
            />

            {/* Inner orbit ring (CW, fast) — 6 bright dots */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                animation: "lp-cw 3.6s linear infinite",
              }}
            >
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: 3.5,
                    height: 3.5,
                    marginTop: -1.75,
                    marginLeft: -1.75,
                    borderRadius: "50%",
                    background: i % 2 === 0 ? "#D4AF37" : "#FF8C00",
                    opacity: 0.9,
                    transform: `rotate(${i * 60}deg) translateX(66px)`,
                  }}
                />
              ))}
            </div>

            {/* Inner orbit ring (CCW, slow) — 4 dimmer dots */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                animation: "lp-ccw 6.5s linear infinite",
              }}
            >
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: 5,
                    height: 5,
                    marginTop: -2.5,
                    marginLeft: -2.5,
                    borderRadius: "50%",
                    background: "rgba(212,175,55,0.5)",
                    transform: `rotate(${i * 90 + 22}deg) translateX(88px)`,
                  }}
                />
              ))}
            </div>

            {/* Cycling symbol */}
            <div
              key={symIdx}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                fontSize: 28,
                fontFamily: "Georgia, serif",
                color: "#D4AF37",
                animation: "lp-sym 0.65s ease-in-out forwards",
                whiteSpace: "nowrap",
                letterSpacing: "0.08em",
                textAlign: "center",
                maxWidth: "75%",
                pointerEvents: "none",
              }}
            >
              {SYMBOLS[symIdx]}
            </div>
          </div>
        </div>

        {/* ── Text below portal ── */}
        <div
          style={{
            marginTop: 44,
            textAlign: "center",
            opacity: opening ? 0 : 1,
            transition: opening ? "opacity 0.2s ease" : "none",
          }}
        >
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 10,
              letterSpacing: "0.48em",
              color: "rgba(255,255,255,0.22)",
              marginBottom: 10,
              textTransform: "uppercase",
            }}
          >
            Michael M. Zhang
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 10,
              letterSpacing: "0.32em",
              color: "rgba(212,175,55,0.6)",
              minWidth: 90,
            }}
          >
            LOADING{dots}
          </div>
        </div>
      </div>
    </>
  );
}
