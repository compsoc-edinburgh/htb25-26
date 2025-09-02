"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ChevronDown, Plus, Minus } from "lucide-react";

export default function FAQSection() {
  const faqs = [
    {
      q: "How do I ask for help during the Hackathon?",
      a: "The best place to ask for help is on the HackTheBurgh Discord, which you can access via the discord invite sent to your email address as a participant. Please make a ticket through the #get-help channel and we’ll be with you as soon as possible. If you need help in-person, our volunteers and organizers are wearing HackTheBurgh t-shirts and hoodies to help you spot us! Organizers have a red HackTheBurgh logo on the back of their hoodies; Volunteers have a green version instead. Please don’t hesitate to ask us for help.",
    },
    {
      q: "What is the HackTheBurgh Code of Conduct?",
      a: "The HackTheBurgh Code of Conduct can be found here (url://17).",
    },
    {
      q: "When do applications close?",
      a: "Applications will close on the 10th Feb.",
    },
    {
      q: "What are the rules of the hackathon?",
      a: "Please see the HackTheBurgh Rules (url://18).",
    },
    {
      q: "When will I hear back on my application?",
      a: "We aim to get back to you on your application by the 17th Feb.",
    },
    {
      q: "How many people are allowed on a team?",
      a: "A minimum of 4 people are required to form a team, however teams of up to 6 people are allowed.",
    },
    {
      q: "Who can attend?",
      a: "To be eligible to participate, you only have to be a current student from any university, or have graduated within a year! We encourage anyone from any degree discipline, technical or not, to enjoy HackTheBurgh and show off your skills throughout the weekend. Unfortunately, due to logistical and legal constraints, we are unable to host under 18s.",
    },
    {
      q: "How will our applications be judged?",
      a: "We evaluate applications based on technical merit demonstrated through your CV, Github, and application responses, with consideration given to your year of study.",
    },
    {
      q: "What if I don’t have a team?",
      a: "Don’t worry, we’ll have a Discord channel for participants to form teams before the event. You can also form a team when you arrive on the day.",
    },
    {
      q: "What is the difference between applying individually or as a team?",
      a: "If you apply as a team, you will be judged as a team and either all of you will be accepted or none of you will be. If you apply individually, you will be judged individually and accepted individually; you can then form a team on the day or on Discord.",
    },
    {
      q: "Do I need loads of experience to participate?",
      a: "Not at all. Whether you’re a first year student, study a subject unrelated to computing, or this is your first Hackathon, you are still welcome to enter HackTheBurgh. This is a great opportunity to learn and gain new experience!",
    },
    {
      q: "What am I supposed to build / hack during the weekend?",
      a: "You have complete freedom in what you build at our hackathon! Don’t worry about making your hack polished or perfect - we know there’s limited time. We hope HackTheBurgh serves as a launchpad for you to start a project you can continue working on even after the event ends.",
    },
    {
      q: "What time does HTB start and end?",
      a: "HTB runs on the weekend of the 1st-2nd March. Registration starts from 9:00 on the Saturday and our closing ceremony concludes at 17:00 on the Sunday.",
    },
    {
      q: "What about food?",
      a: "We’ll provide food, snacks and drinks through the day. We will ask you about any dietary restrictions and share the food options available from our vendors after you’ve been accepted into the event.",
    },
    {
      q: "What should I bring?",
      a: "Valid student ID, laptop, charger.",
    },
    {
      q: "What if I have any other questions?",
      a: "Contact us at hello@hacktheburgh.com (url://5) or you can ask us questions in the #get-help channel in the discord.",
    },
  ];

  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const accordionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const animationsRef = useRef<gsap.core.Timeline[]>([]);

  useEffect(() => {
    // Initialize GSAP animations for each FAQ item
    animationsRef.current = accordionRefs.current.map((element, index) => {
      if (!element) return gsap.timeline();

      const content = element.querySelector(
        ".accordion-content"
      ) as HTMLElement;
      const plusElement = element.querySelector(
        ".accordion-plus svg"
      ) as HTMLElement;

      if (!content || !plusElement) return gsap.timeline();

      // Set initial state
      gsap.set(content, { height: "auto" });
      gsap.set(plusElement, { rotation: 0, transformOrigin: "center center" });

      const animation = gsap
        .timeline()
        .from(content, {
          height: 0,
          duration: 0.32,
          ease: "power2.inOut",
        })
        .to(
          plusElement,
          {
            duration: 0.32,
            rotation: 180,
            transformOrigin: "center center",
            ease: "power2.inOut",
          },
          0
        )
        .fromTo(
          element,
          { backgroundColor: "#ffffff" },
          { backgroundColor: "#E5E5E5", duration: 0.32 },
          0
        )
        .reverse();

      return animation;
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
      <h1 className="px-4 font-hexaframe text-4xl font-bold sm:pl-8 sm:text-5xl md:text-6xl lg:text-7xl">
        FAQs
      </h1>
      <div className="flex items-center gap-2 px-4 pt-2 sm:pl-9">
        <div className="h-2 w-2 bg-black" />
        <p className="text-[10px] uppercase text-black">
          You have questions, We have answers!
        </p>
      </div>

      <div className="mt-8 md:mt-10">
        <ul className="divide-y divide-gray-200 border border-gray-200 bg-white">
          {faqs.map((item, idx) => {
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
                    <p className="break-words text-[0.7rem] leading-relaxed text-gray-900 sm:text-[0.875rem]">
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
