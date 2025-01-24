import { LandingCard } from "~/components/modules/landing";

// placeholder FAQs (Could be a seperate file, not very clean)
const FAQ_ITEMS = [
  {
    question: "What is Hack the Burgh XI?",
    answer: "Cool hackathon in edinburgh",
  },
  {
    question: "How do I get accepted?",
    answer: "solve the N Queens problem real quick",
  },
  {
    question: "Why did the chicken cross the road?",
    answer: "idk leave me alone",
  },
  {
    question: "ligma?",
    answer: "ligma.",
  },
];

export default function Page() {
  return (
    <main className="mx-4 w-fit space-y-8 pb-8 md:mx-10">
      <div className="mx-4 my-12 flex flex-col items-center text-center lg:mx-32 lg:my-26">
        <img src="/htb-logo.png" alt="HTB Logo" className="h-full w-full" />
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-6">
        <div className="col-span-1 order-2 md:col-span-3 lg:order-none lg:col-span-2">
          <LandingCard.CodeCard />
        </div>
        <div className="col-span-1 order-0 md:col-span-2 lg:order-none lg:col-span-3">
          <LandingCard.WelcomeCard />
        </div>
        <div className="order-1 lg:order-none">
          <LandingCard.RegisterCard />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <LandingCard.CountdownCard />
        <LandingCard.VolunteerCard />
      </div>

      <section className="mt-16 w-full text-left">
          <h2 className="mb-8 text-center text-3xl font-bold">FAQs</h2>
          {FAQ_ITEMS.map((faq, index) => (
            <details key={index} className="mb-4 rounded-lg bg-muted p-4">
              <summary className="text-xl font-medium">{faq.question}</summary>
              <p className="mt-2 text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
      </section>
    </main>
  );
}
