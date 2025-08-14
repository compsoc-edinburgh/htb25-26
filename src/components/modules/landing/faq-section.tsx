import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: ReactNode;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How do I ask for help during the Hackathon?",
    answer: (
      <>
        The best place to ask for help is on the HackTheBurgh Discord, which you
        can access via the discord invite sent to your email address as a
        participant. Please make a ticket through the #get-help channel and
        we&apos;ll be with you as soon as possible.
        <br />
        <br />
        If you need help in-person, our volunteers and organizers are wearing
        HackTheBurgh t-shirts and hoodies to help you spot us! Organizers have a
        red HackTheBurgh logo on the back of their hoodies; Volunteers have a
        green version instead. Please don&apos;t hesitate to ask us for help.
      </>
    ),
  },
  {
    question: "What is the HackTheBurgh Code of Conduct?",
    answer: (
      <>
        The HackTheBurgh Code of Conduct can be found{" "}
        <Link
          href="/documents/HTB-Code-of-Conduct.pdf"
          className="text-accent-yellow underline"
        >
          here
        </Link>
        .
      </>
    ),
  },
  {
    question: "When do applications close?",
    answer: (
      <>
        Applications will close on the <b>10th Feb</b>.
      </>
    ),
  },
  {
    question: "What are the rules of the hackathon?",
    answer: (
      <>
        Please see the{" "}
        <Link
          href="/documents/HTB-Rules.pdf"
          className="text-accent-yellow underline"
        >
          HackTheBurgh Rules
        </Link>
        .
      </>
    ),
  },
  {
    question: "When will I hear back on my application?",
    answer: (
      <>
        We aim to get back to you on your application by the <b>17th Feb</b>.
      </>
    ),
  },
  {
    question: "How many people are allowed on a team?",
    answer: (
      <>
        A minimum of <b>4</b> people are required to form a team, however teams
        of up to <b>6</b> people are allowed.
      </>
    ),
  },
  {
    question: "Who can attend?",
    answer: (
      <>
        To be eligible to participate, you only have to be a{" "}
        <b>current student</b> from any university, or have{" "}
        <b>graduated within a year</b>! We encourage anyone from any degree
        discipline, technical or not, to enjoy HackTheBurgh and show off your
        skills throughout the weekend. Unfortunately, due to logistical and
        legal constraints, we are unable to host under 18s.
      </>
    ),
  },
  {
    question: "How will our applications be judged?",
    answer: (
      <>
        We evaluate applications based on technical merit demonstrated through
        your CV, Github, and application responses, with consideration given to
        your year of study.
      </>
    ),
  },
  {
    question: "What if I don’t have a team?",
    answer: (
      <>
        Don&apos;t worry, we&apos;ll have a Discord channel for participants to
        form teams before the event. You can also form a team when you arrive on
        the day.
      </>
    ),
  },
  {
    question:
      "What is the difference between applying individually or as a team?",
    answer: (
      <>
        If you apply as a team, you will be judged as a team and either{" "}
        <u>all of you will be accepted or none of you will be</u>. If you apply
        individually, you will be judged individually and accepted individually;
        you can then form a team on the day or on Discord.
      </>
    ),
  },
  {
    question: "Do I need loads of experience to participate?",
    answer: (
      <>
        Not at all. Whether you&apos;re a first year student, study a subject
        unrelated to computing, or this is your first Hackathon, you are still
        welcome to enter HackTheBurgh. This is a great opportunity to learn and
        gain new experience!
      </>
    ),
  },
  {
    question: "What am I supposed to build / hack during the weekend?",
    answer: (
      <>
        You have complete freedom in what you build at our hackathon! Don&apos;t
        worry about making your hack polished or perfect - we know there&apos;s
        limited time. We hope HackTheBurgh serves as a launchpad for you to
        start a project you can continue working on even after the event ends.
      </>
    ),
  },
  {
    question: "What time does HTB start and end?",
    answer: (
      <>
        HTB runs on the weekend of the <b>1st-2nd March</b>. Registration starts
        from 9:00 on the Saturday and our closing ceremony concludes at 17:00 on
        the Sunday.
      </>
    ),
  },
  {
    question: "What about food?",
    answer: (
      <>
        We&apos;ll provide food, snacks and drinks through the day. We will ask
        you about any dietary restrictions and share the food options available
        from our vendors after you&apos;ve been accepted into the event.
      </>
    ),
  },
  {
    question: "What should I bring?",
    answer: <>Valid student ID, laptop, charger.</>,
  },
  {
    question: "What if I have any other questions?",
    answer: (
      <>
        Contact us at{" "}
        <Link
          href="mailto:hello@hacktheburgh.com"
          className="text-accent-yellow underline"
        >
          hello@hacktheburgh.com
        </Link>{" "}
        or you can ask us questions in the #get-help channel in the discord.
      </>
    ),
  },
];

const FAQAccordionItem = ({ faq }: { faq: FAQItem }) => {
  return (
    <details className="group w-full max-w-5xl rounded-lg border border-white/10 bg-white/5 p-6 shadow-[0_0_30px_rgba(255,255,255,0.05)] backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/10">
      <summary className="md:text-md flex cursor-pointer items-center justify-between text-base font-medium text-white/90 lg:text-lg">
        <span className="w-3/4">{faq.question}</span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm md:h-9 md:w-9">
          <span className="text-white/80 transition-transform duration-200 group-open:rotate-180">
            <Image
              src="/other/arrow.svg"
              alt="Arrow"
              width={14}
              height={14}
              className="md:h-4 md:w-4"
            />
          </span>
        </span>
      </summary>
      <p className="md:text-md mt-4 leading-relaxed text-white/70">
        {faq.answer}
      </p>
    </details>
  );
};

export const FAQComponents = {
  FAQAccordionItem,
  FAQ_ITEMS,
} as const;
