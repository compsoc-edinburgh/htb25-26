"use client";

import React from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

type RegisterButtonProps = {
  className?: string;
};

/**
 * RegisterButton
 * - Uses the provided SVG artwork
 * - Hover: background (shape) turns black, text becomes white
 * - Mouse press: scales down while pressed, returns on release
 * - Click or press Enter (when this section is in view): navigates to /apply
 */
export default function RegisterButton({ className }: RegisterButtonProps) {
  const router = useRouter();
  // Sentinel stays in normal flow (not the fixed portal) so IO works even when the button portals
  const sentinelRef = React.useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const [inView, setInView] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  // Navigate helper
  const go = React.useCallback(() => {
    router.push("/apply");
  }, [router]);

  // Mark mounted and set initial viewport breakpoint
  React.useEffect(() => {
    setMounted(true);
    const mql = window.matchMedia("(min-width: 768px)");
    const onChange = () => setIsMobile(!mql.matches);
    onChange();
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);

  // Observe visibility (using sentinel) to enable Enter hotkey only when in view
  React.useEffect(() => {
    if (!sentinelRef.current) return;
    const el = sentinelRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === el) {
            setInView(entry.isIntersecting && entry.intersectionRatio > 0.25);
          }
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Enter key hotkey when the component (hero area) is in view
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!inView) return;
      if (e.repeat) return; // avoid repeats on key hold
      if (e.key === "Enter") {
        e.preventDefault();
        go();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [inView, go]);

  const scale = pressed ? 0.99 : 1;

  const buttonEl = (
    <button
        type="button"
        aria-label="Register"
        onClick={go}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setPressed(false);
        }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        className="inline-block focus:outline-none w-full md:w-auto md:mt-6"
        style={{
          // Colors controlled via CSS variables consumed inside the SVG
          // Default (idle): transparent bg, black stroke/text
          // Hover: black bg, white text
          ["--stroke" as any]: "#000",
          ["--fill" as any]: hovered ? "#000" : "transparent",
          ["--text" as any]: hovered ? "#fff" : "#000",
          transform: `scale(${scale})`,
          transition:
            "transform 150ms ease, filter 200ms ease, opacity 150ms ease",
          cursor: "pointer",
        }}
      >
        <svg
          width="100%"
          viewBox="0 0 305 74"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          style={{ height: "auto" }}
          preserveAspectRatio="xMidYMid meet"
        >
          <title>Register</title>
          <desc>Click to go to the application form</desc>
          <path
            d="M304.5 24.9609V55C304.5 59.6944 300.694 63.5 296 63.5L9 63.5C4.30556 63.5 0.5 59.6944 0.5 55V9C0.5 4.30558 4.30556 0.5 9 0.5L176.099 0.5C177.712 0.5 179.293 0.95925 180.655 1.82422L201.376 14.9814C202.898 15.948 204.664 16.4609 206.468 16.4609L296 16.4609C300.694 16.4609 304.5 20.2666 304.5 24.9609Z"
            stroke="var(--stroke)"
            fill="var(--fill)"
          />
          <text
            fill="var(--text)"
            xmlSpace="preserve"
            style={{
              whiteSpace: "pre",
              fontFamily: "Whyte Inktrap, sans-serif",
            }}
            fontSize="23"
            fontWeight={950}
            letterSpacing="0em"
          >
            <tspan x="40" y="39.927">
              Register
            </tspan>
          </text>
          {/* Desktop label (md and up) */}
          <text
            className="hidden md:inline"
            fill="var(--text)"
            xmlSpace="preserve"
            style={{
              whiteSpace: "pre",
              fontFamily:
                'IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            }}
            fontSize="9"
            fontWeight={500}
            letterSpacing="0em"
          >
            <tspan x="180" y="56.875">
              Press Enter To Start ↵
            </tspan>
          </text>
          {/* Mobile label (below md) */}
          <text
            className="md:hidden"
            fill="var(--text)"
            xmlSpace="preserve"
            style={{
              whiteSpace: "pre",
              fontFamily:
                'IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            }}
            fontSize="9"
            fontWeight={500}
            letterSpacing="0em"
          >
            <tspan x="180" y="56.875">
              Start your Journey
            </tspan>
          </text>
        </svg>
      </button>
  );

  return (
    <>
      {/* Sentinel in normal flow for IO to know when hero is visible */}
      <div ref={sentinelRef} className={className}>
        {/* Desktop renders inline; mobile uses portal */}
        {!isMobile && buttonEl}
      </div>
      {mounted && isMobile
        ? createPortal(
            <div
              className="absolute inset-x-4 bottom-6 z-10"
              style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            >
              {buttonEl}
            </div>,
            document.body
          )
        : null}
    </>
  );
}
