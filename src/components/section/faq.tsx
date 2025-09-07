"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { FAQS } from "~/lib/constants/faq";
import SectionHeader from "../module/section-header";

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const accordionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const animationsRef = useRef<gsap.core.Timeline[]>([]);

  useEffect(() => {
    animationsRef.current = accordionRefs.current.map((element) => {
      if (!element) return gsap.timeline();

      const content = element.querySelector(
        ".accordion-content"
      ) as HTMLElement;
      const plusElement = element.querySelector(
        ".accordion-plus svg"
      ) as HTMLElement;

      if (!content || !plusElement) return gsap.timeline();

      gsap.set(content, { height: "auto" });
      gsap.set(plusElement, { rotation: 0, transformOrigin: "center center" });

      return gsap
        .timeline()
        .from(content, {
          height: 0,
          duration: 0.3,
          ease: "power2.inOut",
        })
        .to(
          plusElement,
          {
            duration: 0.3,
            rotation: 180,
            transformOrigin: "center center",
            ease: "power2.inOut",
          },
          0
        )
        .fromTo(
          element,
          { backgroundColor: "#ffffff" },
          { backgroundColor: "#E5E5E5", duration: 0.3 },
          0
        )
        .reverse();
    });
  }, []);

  useEffect(() => {
    // Update animations when openItems changes
    animationsRef.current.forEach((animation, index) => {
      if (!animation) return;

      const shouldBeOpen = openItems.has(index);

      if (shouldBeOpen) {
        animation.play();
      } else {
        animation.reverse();
      }
    });
  }, [openItems]);

  const toggle = (idx: number) => {
    setOpenItems((prev) => {
      const next = new Set<number>();
      // If clicking on an already open item, close it (empty set)
      // If clicking on a closed item, open only that one
      if (!prev.has(idx)) {
        next.add(idx);
      }
      return next;
    });
  };

  return (
    <div id="faq" className="pb-10 sm:pb-16">
      <SectionHeader
        title="FAQs"
        subtitle="You have questions, We have answers!"
        className="pl-8 sm:pl-10"
      />

      <div className="mt-8 md:mt-10">
        <ul className="divide-y divide-gray-200 border border-gray-200 bg-white">
          {FAQS.map((item, idx) => {
            const expanded = openItems.has(idx);
            const contentId = `faq-panel-${idx}`;
            const buttonId = `faq-button-${idx}`;
            
            return (
              <li
                key={idx}
                ref={(el) => {
                  accordionRefs.current[idx] = el;
                }}
                className={`accordion-group relative px-4 sm:px-6`}
              >
                <button
                  id={buttonId}
                  aria-controls={contentId}
                  aria-expanded={expanded}
                  onClick={() => toggle(idx)}
                  className="accordion-menu flex w-full items-center justify-between gap-4 py-5"
                >
                  <div className="flex items-center gap-4 pr-8 sm:gap-60 sm:pr-28">
                    <span className="text-black-500 text-center font-mono text-xs sm:w-8 sm:text-lg">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-whyte -mb-2 text-left text-base font-medium sm:text-xl md:text-2xl">
                      {item.q}
                    </h2>
                  </div>
                  <div className="accordion-plus absolute right-4 top-[1.8rem] h-3 w-3 -translate-y-1/2 sm:right-9 sm:top-[2.4rem] sm:h-5 sm:w-5">
                    <svg
                      width="13"
                      height="14"
                      className="h-full w-full"
                      viewBox="0 0 13 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.69443 0L5.26448 0L5.26448 9.93778L0 4.95159V7.85768L6.48551 14L13 7.8571V4.95113L7.70495 9.93732L7.69443 0Z"
                        fill="#150E0B"
                      />
                    </svg>
                  </div>
                </button>
                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="accordion-content overflow-hidden"
                  style={{ height: 0 }}
                >
                  <div className="pb-6 pl-[2rem] pr-8 pt-0 sm:pl-[17rem] sm:pr-32">
                    <p className="break-words text-[0.7rem] leading-relaxed text-zinc-900 sm:text-[0.875rem]">
                      {item.a}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}