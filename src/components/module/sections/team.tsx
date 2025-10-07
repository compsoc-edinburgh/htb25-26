"use client";

import Image from "next/image";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import SectionHeader from "../section-header";
import { TEAM_MEMBERS, TeamMember } from "~/lib/constants/team";

// Register GSAP plugins
gsap.registerPlugin(ScrambleTextPlugin);

// Team members are centralized in ~/lib/constants/team

// SVG wrappers so we can style them with absolute content overlays
const TopShape: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="relative aspect-[177/178] w-full">
    <svg
      viewBox="0 0 177 178"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <path d="M1 47.5V141" stroke="#E5E5E5" strokeWidth="0.5" />
      <path
        d="M1 53.5V1H142.5L176 39.5V177.5H1V127.5L11 118.5V63.5L1 53.5Z"
        fill="white"
        stroke="#E5E5E5"
        strokeWidth="0.5"
      />
    </svg>
    {children}
  </div>
);

const BottomShape: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="relative aspect-[177/64] w-full">
    <svg
      viewBox="0 0 177 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M1 45.15V0.5H176V63.5H16.9091L1 45.15Z"
        stroke="#E5E5E5"
        strokeWidth="0.5"
        fill="white"
      />
    </svg>
    {children}
  </div>
);

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
const TeamCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const topShapeRef = useRef<HTMLDivElement>(null);
  const bottomShapeRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const roleSquareRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = React.useState(false);

  // Timeline refs
  const hoverTimelineRef = useRef<gsap.core.Timeline>();
  const clickTimelineRef = useRef<gsap.core.Timeline>();

  useEffect(() => {
    const card = cardRef.current;
    const topShape = topShapeRef.current;
    const bottomShape = bottomShapeRef.current;
    const nameElement = nameRef.current;
    const roleElement = roleRef.current;
    const bioElement = bioRef.current;
    const roleSquareElement = roleSquareRef.current;

    if (
      !card ||
      !topShape ||
      !bottomShape ||
      !nameElement ||
      !roleElement ||
      !bioElement ||
      !roleSquareElement
    )
      return;

    // Set initial states
    gsap.set(topShape.querySelector("path:nth-child(2)"), { fill: "white" });
    gsap.set(bottomShape.querySelector("path"), { fill: "white" });
    gsap.set([roleElement, bioElement], { color: "#1f2937" });
    gsap.set(bottomShape, { y: 0 });
    gsap.set(card, { scale: 1 });

    // Create hover timeline
    hoverTimelineRef.current = gsap
      .timeline({
        paused: true,
        defaults: { ease: "power3.inOut", duration: 0.3 },
      })
      .to(
        topShape.querySelector("path:nth-child(1)"),
        {
          x: "+=1.5",
        },
        0
      )
      .to(
        bottomShape,
        {
          y: "-=3",
        },
        0
      );

    // Create click timeline
    clickTimelineRef.current = gsap
      .timeline({
        paused: true,
        defaults: { ease: "power3.inOut", duration: 0.3 },
      })
      .to(card, {
        scale: 0.98,
      })
      .to(
        bottomShape.querySelector("path"),
        {
          fill: "black",
          stroke: "black",
        },
        0
      )
      .to(
        [roleElement, bioElement],
        {
          color: "#ffffff",
        },
        0
      )
      .to(
        [roleSquareElement],
        {
          backgroundColor: "white",
        },
        0
      )
      .to(
        topShape.querySelector("path:nth-child(2)"),
        {
          stroke: "black",
        },
        0
      )
      .to(
        topShape.querySelector("path:nth-child(1)"),
        {
          x: "+=1",
        },
        0
      );

    // Event handlers
    const handleMouseEnter = () => {
      setHovering(true);
      hoverTimelineRef.current?.play();
    };

    const handleMouseLeave = () => {
      setHovering(false);
      hoverTimelineRef.current?.reverse();
    };

    const openLinkIfAny = () => {
      if (member.link) {
        window.open(member.link, "_blank", "noopener,noreferrer");
      }
    };

    const handleMouseDown = () => {
      clickTimelineRef.current?.play();
    };

    const handleMouseUp = () => {
      const tl = clickTimelineRef.current;
      if (member.link && tl) {
        // Attach a one-time reverse complete callback
        const cb = () => {
          openLinkIfAny();
          tl.eventCallback("onReverseComplete", null); // cleanup
        };
        tl.eventCallback("onReverseComplete", cb);
      }
      tl?.reverse();
      if (!tl && member.link) openLinkIfAny();
    };

    // Touch gesture tracking to avoid accidental opens while scrolling
    const touchState = { startX: 0, startY: 0, moved: false };
    const MOVE_THRESHOLD = 10; // px

    const handleTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      touchState.startX = t.clientX;
      touchState.startY = t.clientY;
      touchState.moved = false;
      clickTimelineRef.current?.play();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchState.moved) return;
      const t = e.touches[0];
      if (!t) return;
      const dx = Math.abs(t.clientX - touchState.startX);
      const dy = Math.abs(t.clientY - touchState.startY);
      if (dx > MOVE_THRESHOLD || dy > MOVE_THRESHOLD) {
        touchState.moved = true;
      }
    };

    const handleTouchEnd = () => {
      const tl = clickTimelineRef.current;
      // If the finger moved significantly, treat as scroll; just reverse without opening.
      const shouldOpen = !touchState.moved;
      if (shouldOpen && member.link && tl) {
        const cb = () => {
          openLinkIfAny();
          tl.eventCallback("onReverseComplete", null);
        };
        tl.eventCallback("onReverseComplete", cb);
      } else if (!shouldOpen) {
        // ensure any previously scheduled callback is cleared
        tl?.eventCallback("onReverseComplete", null);
      }
      tl?.reverse();
      if (shouldOpen && !tl && member.link) openLinkIfAny();
    };

    // Use GSAP MatchMedia for responsive behavior
    const mm = gsap.matchMedia();

    // Desktop and tablet hover animations (768px and above)
    mm.add("(min-width: 768px)", () => {
      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    });

    // Click/touch animations for all devices
    card.addEventListener("mousedown", handleMouseDown);
    card.addEventListener("mouseup", handleMouseUp);
    card.addEventListener("touchstart", handleTouchStart, { passive: true });
    card.addEventListener("touchmove", handleTouchMove, { passive: true });
    card.addEventListener("touchend", handleTouchEnd);

    return () => {
      card.removeEventListener("mousedown", handleMouseDown);
      card.removeEventListener("mouseup", handleMouseUp);
      card.removeEventListener("touchstart", handleTouchStart as any);
      card.removeEventListener("touchmove", handleTouchMove as any);
      card.removeEventListener("touchend", handleTouchEnd as any);

      // Kill timelines and match media
      hoverTimelineRef.current?.kill();
      clickTimelineRef.current?.kill();
      mm.kill();
    };
  }, [member.name, member.link]);

  return (
    <div
      ref={cardRef}
      className="flex w-full max-w-[200px] cursor-pointer flex-col font-mono sm:max-w-[260px] md:max-w-[280px] lg:max-w-[300px]"
    >
      <div ref={topShapeRef}>
        <TopShape>
          <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center pt-[9%]">
            <div
              className="relative aspect-square w-[68%] overflow-hidden rounded-sm bg-black/5 shadow-sm"
              style={{
                clipPath: "polygon(79% 0, 100% 23%, 100% 100%, 0 100%, 0 0)",
              }}
            >
              {member.image ? (
                <Image
                  key={hovering && member.gif ? "gif" : "img"}
                  src={hovering && member.gif ? member.gif : member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  priority={false}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#D9D9D9] text-3xl font-bold text-black/70">
                  {initials(member.name)}
                </div>
              )}
            </div>
            <p
              ref={nameRef}
              className="mt-3 line-clamp-2 px-2 text-center font-whyte text-[0.6rem] font-semibold uppercase tracking-wide text-black sm:mt-4 sm:text-[0.7rem] sm:text-xs md:text-sm"
            >
              {member.name}
            </p>
          </div>
        </TopShape>
      </div>
      <div ref={bottomShapeRef}>
        <BottomShape>
          <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-start py-[0.55rem] pl-[1.52rem] pr-[0.3rem]">
            <div className="flex items-center gap-1">
              <div ref={roleSquareRef} className="h-1 w-1 bg-black" />
              <span
                ref={roleRef}
                className="text-[0.4rem] font-bold uppercase tracking-wide sm:text-[0.6rem] xl:text-[0.7rem]"
              >
                {member.role}
              </span>
            </div>
            <p
              ref={bioRef}
              className="mt-1 line-clamp-3 pr-3 text-[0.35rem] leading-tight sm:text-[0.55rem] xl:text-[0.65rem]"
            >
              {member.bio}
            </p>
          </div>
        </BottomShape>
      </div>
    </div>
  );
};

export default function Team() {
  return (
    <section id="team" className="pb-10 sm:pb-16">
      <SectionHeader
        title="The Team"
        subtitle="The people making it happen behind the scenes"
      />

      <div className="mt-10 grid grid-cols-2 justify-center gap-4 px-4 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 md:gap-10 lg:grid-cols-4 lg:gap-12">
        {TEAM_MEMBERS.map((m) => (
          <TeamCard key={m.name} member={m} />
        ))}
      </div>
    </section>
  );
}
