"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const faqs = [
    {
      q: "Who can attend?",
      a: "Students and recent graduates from any discipline are welcome. Beginners are encouraged — we provide workshops and mentors.",
    },
    {
      q: "Do I need a team?",
      a: "No. You can join as a solo hacker and form a team at the event. Teams are typically up to 4 people.",
    },
    {
      q: "Is the event free?",
      a: "Yes. Attendance is free — we provide food, space and an awesome atmosphere to build.",
    },
    {
      q: "What should I bring?",
      a: "A laptop, charger and any hardware you want to hack on. We'll handle the rest.",
    },
    {
      q: "How are applications assessed?",
      a: "We take a holistic approach: motivation and curiosity, balance across experience levels and backgrounds, and clear answers in your form.",
    },
    {
      q: "Do you offer travel reimbursements?",
      a: "Travel support depends on sponsor availability. We’ll announce details by email if funding is secured.",
    },
  ];

  const [open, setOpen] = useState<Set<number>>(new Set([0]));

  const toggle = (idx: number) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <div id="faq" className="px-4 pb-10 sm:pb-16">
      <h1 className="font-hexaframe text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
        FAQ
      </h1>
      <div className="flex items-center gap-2 pt-2">
        <div className="h-1.5 w-1.5 bg-black sm:h-2 sm:w-2" />
        <p className="text-xs uppercase text-gray-500 sm:text-sm">
          Common questions about Hack The Burgh
        </p>
      </div>

      <div className="mt-8 md:mt-10">
        <ul className="divide-y divide-gray-200 border border-gray-200 bg-white">
          {faqs.map((item, idx) => {
            const expanded = open.has(idx);
            const contentId = `faq-panel-${idx}`;
            const buttonId = `faq-button-${idx}`;
            return (
              <li key={idx} className="px-4 sm:px-6">
                <button
                  id={buttonId}
                  aria-controls={contentId}
                  aria-expanded={expanded}
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 w-1.5 flex-shrink-0 bg-black sm:h-2 sm:w-2" />
                    <h2 className="font-hexaframe text-xl font-bold sm:text-2xl">
                      {item.q}
                    </h2>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${expanded ? "rotate-180" : "rotate-0"}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      id={contentId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pl-5">
                        <p className="text-sm leading-relaxed text-gray-900 sm:text-base">
                          {item.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
