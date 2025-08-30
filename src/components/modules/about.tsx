"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Users, Award, Clock, MapPin } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Hours of Hacking", value: "48", icon: Clock },
  { label: "Expected Participants", value: "500+", icon: Users },
  { label: "Prizes Available", value: "£10K+", icon: Award },
  { label: "Location", value: "Edinburgh", icon: MapPin },
];

const assessmentCriteria = [
  {
    title: "Motivation & Curiosity",
    description:
      "We value passion and eagerness to learn over past achievements.",
    weight: "25%",
  },
  {
    title: "Diversity & Balance",
    description:
      "We seek balance across experience levels, disciplines, and universities.",
    weight: "25%",
  },
  {
    title: "Application Quality",
    description:
      "Clear, thoughtful answers that show genuine interest in participating.",
    weight: "25%",
  },
  {
    title: "Community Fit",
    description:
      "Inclusivity and welcoming attitude toward beginners and all skill levels.",
    weight: "25%",
  },
];

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: "What is HTB?", shortLabel: "About" },
    { id: 1, label: "Who can apply?", shortLabel: "Eligibility" },
    { id: 2, label: "What to expect", shortLabel: "Experience" },
  ];

  const tabContent = [
    {
      title: "A student-run hackathon in Edinburgh",
      content:
        "Hack The Burgh is Scotland's premier student hackathon, bringing together hundreds of passionate builders for a weekend of innovation and creativity. Whether you're a first-time hacker or a seasoned developer, you'll find workshops, mentors, and a supportive community to help bring your wildest ideas to life.",
      highlights: [
        "12th year running - established tradition",
        "Beginner-friendly with dedicated support",
        "Amazing venue in the heart of Edinburgh",
        "Free food, accommodation, and prizes",
      ],
    },
    {
      title: "Open to all experience levels",
      content:
        "We welcome students and recent graduates from any discipline. Computer science students hack alongside artists, engineers collaborate with business students, and everyone learns from each other.",
      highlights: [
        "Students from any university or field",
        "Recent graduates (within 1 year)",
        "All skill levels welcome",
        "Teams form at the event or bring your own",
      ],
    },
    {
      title: "Workshops, mentors and amazing prizes",
      content:
        "Experience a packed weekend with technical workshops, sponsor talks, networking opportunities, and plenty of time to build something incredible with your team.",
      highlights: [
        "Technical workshops throughout the weekend",
        "1-on-1 mentoring from industry professionals",
        "Sponsor challenges with exclusive prizes",
        "Demo day and awards ceremony",
      ],
    },
  ];

  return (
    <div id="about" className="px-4 pb-10 sm:pb-16">
      <h1 className="font-hexaframe text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
        About HTB
      </h1>
      <div className="flex items-center gap-2 pt-2">
        <div className="h-1.5 w-1.5 bg-black sm:h-2 sm:w-2" />
        <p className="text-xs uppercase text-gray-500 sm:text-sm">
          What Hack The Burgh is and why you should join us
        </p>
      </div>

      <div className="mt-10 md:mt-12">
        <div className="border-b border-gray-200">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-3 text-sm font-medium transition-colors duration-200 sm:px-6 sm:text-base ${
                  activeTab === tab.id
                    ? "text-black"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="min-h-80 border border-gray-200 bg-white p-6 sm:p-8"
            >
              <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <h2 className="font-hexaframe text-xl font-bold sm:text-2xl md:text-3xl">
                    {tabContent[activeTab]?.title || ""}
                  </h2>
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-gray-900 md:text-base">
                    {tabContent[activeTab]?.content || ""}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-wide text-gray-500 sm:text-base">
                    Key Points
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {(tabContent[activeTab]?.highlights || []).map(
                      (highlight, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 bg-black sm:h-2 sm:w-2" />
                          <span className="text-sm text-gray-700 sm:text-base">
                            {highlight}
                          </span>
                        </motion.li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Policies Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="mt-10 border border-gray-200 bg-white p-6 sm:mt-12 sm:p-8"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-hexaframe text-xl font-bold sm:text-2xl">
              Important Policies
            </h3>
            <p className="mt-2 text-sm text-gray-700 sm:text-base">
              Please review these documents before applying
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/documents/HTB-Code-of-Conduct.pdf"
              className="group flex items-center gap-2 border border-gray-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50"
              target="_blank"
              rel="noopener noreferrer"
            >
              Code of Conduct
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/documents/HTB-Privacy-Policy.pdf"
              className="group flex items-center gap-2 border border-gray-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
