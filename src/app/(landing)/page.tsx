import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "~/components/ui/button";

import { HydrateClient } from "~/trpc/server";

// placeholder FAQs (Could be a seperate file, not very clean)
const FAQ_ITEMS = [
  {
    question: "What is Hack the Burgh XI?",
    answer: "Cool hackathon in edinburgh"
  },
  {
    question: "How do I get accepted?",
    answer: "solve the N Queens problem real quick"
  },
  {
    question: "Why did the chicken cross the road?",
    answer: "idk leave me alone"
  },
  {
    question: "ligma?",
    answer: "ligma."
  },
];

export default async function Home() {
  const user = await auth();

  return (
    <HydrateClient>
      <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] text-center">
            Hack The Burgh XI
          </h1>
          {user.userId && (
            <Button className="text-xl font-medium">
              <Link href={"/dashboard/application"}>Apply now</Link>
            </Button>
          )}
          {!user.userId && (
            <div className="flex items-center gap-4">
              <Button asChild>
                <Link href={"/signup"}>Sign up</Link>
              </Button>
              <Button asChild>
                <Link href={"/signin"}>Sign in</Link>
              </Button>
            </div>
          )}

          {/* FAQ Section */}
          <section className="mt-16 w-full max-w-4xl text-left">
            <h2 className="text-3xl font-bold mb-8 text-center">FAQs</h2>
            {FAQ_ITEMS.map((faq, index) => (
              <details key={index} className="mb-4 bg-gray-50 p-4 rounded-lg">
                <summary className="text-xl font-medium">{faq.question}</summary>
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </section>
        </div>
      </main>
    </HydrateClient>
  );
}