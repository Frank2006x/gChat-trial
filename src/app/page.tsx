"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BentoGrid } from "@/components/magicui/bento-grid";
import { MagicContainer } from "@/components/magicui/magic-container";
import { MagicGradientText } from "@/components/magicui/magic-gradient-text";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Marquee } from "@/components/magicui/marquee";
import { AnimatedList } from "@/components/magicui/animated-list";

function HeroIllustration() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-linear-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 p-6 shadow-inner">
      <svg viewBox="0 0 600 360" className="h-64 w-full">
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0" stopColor="#6366f1" />
            <stop offset="0.5" stopColor="#a855f7" />
            <stop offset="1" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <path
          d="M0 280 C120 240, 220 320, 360 300 C460 284, 520 320, 600 300 L600 360 L0 360 Z"
          fill="url(#g)"
          opacity="0.35"
        />
        <path
          d="M0 260 C120 220, 240 300, 360 280 C460 264, 520 300, 600 280 L600 360 L0 360 Z"
          fill="url(#g)"
          opacity="0.5"
        />
        <rect
          x="200"
          y="120"
          rx="8"
          width="200"
          height="120"
          fill="#fff"
          opacity="0.9"
        />
        <rect x="215" y="135" rx="4" width="170" height="18" fill="#e5e7eb" />
        <rect x="215" y="160" rx="4" width="140" height="12" fill="#e5e7eb" />
        <rect x="215" y="180" rx="4" width="150" height="12" fill="#e5e7eb" />
        <circle cx="160" cy="210" r="26" fill="#6366f1" />
        <rect x="150" y="230" rx="3" width="20" height="18" fill="#4f46e5" />
        <circle cx="440" cy="210" r="26" fill="#ec4899" />
        <rect x="430" y="230" rx="3" width="20" height="18" fill="#db2777" />
      </svg>
    </div>
  );
}

export default function Home() {
  const items = [
    {
      title: "Global room",
      description: "One space where everyone can drop messages in real-time.",
      className: "sm:col-span-2",
    },
    {
      title: "Fast by default",
      description: "Next.js App Router + Edge-friendly API routes.",
    },
    {
      title: "Beautiful UI",
      description: "Tailwind + Shadcn patterns for crisp, modern visuals.",
    },
    {
      title: "Type-safe",
      description: "End-to-end TypeScript with strict linting.",
      className: "sm:col-span-2",
    },
  ];

  const logos = ["Acme", "Globex", "Umbrella", "Soylent", "Initech", "Hooli"];
  const testimonials = [
    { name: "Alex", quote: "Feels instant. Love the simplicity." },
    { name: "Sam", quote: "Clean UI and blazing fast." },
    { name: "Riley", quote: "Global chat that just works." },
  ];

  return (
    <div className="flex min-h-screen flex-col items-stretch bg-linear-to-br from-zinc-50 to-zinc-200 dark:from-zinc-900 dark:to-black">
      <Navbar />

      <MagicContainer className="py-16">
        <section className="grid items-center gap-10 md:grid-cols-2">
          <div className="flex flex-col items-start gap-5 text-left">
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-950 md:text-5xl dark:text-zinc-50">
              <MagicGradientText>Business Landing Page</MagicGradientText>
            </h1>
            <p className="max-w-xl text-zinc-700 dark:text-zinc-300">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </p>
            <div className="flex items-center gap-3">
              <Link href="/chat">
                <Button size="lg" className="rounded-full">
                  More Info
                </Button>
              </Link>
              <Link href="/chat">
                <Button size="lg" variant="secondary" className="rounded-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
          <HeroIllustration />
        </section>

        <div
          className="mt-8 w-full text-zinc-500 dark:text-zinc-400"
          aria-label="Trusted logos"
        >
          <Marquee pauseOnHover>
            {logos.map((l) => (
              <span key={l} className="mx-6 text-sm font-medium opacity-80">
                {l}
              </span>
            ))}
          </Marquee>
        </div>

        <section id="features" className="mt-12">
          <BentoGrid items={items} />
        </section>

        <section className="mt-12">
          <h2 className="mb-4 text-center text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            What people say
          </h2>
          <AnimatedList className="mx-auto w-full max-w-xl">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div className="text-sm text-zinc-900 dark:text-zinc-100">
                  {t.quote}
                </div>
                <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  — {t.name}
                </div>
              </div>
            ))}
          </AnimatedList>
        </section>
      </MagicContainer>

      <MagicContainer>
        <Footer />
      </MagicContainer>
    </div>
  );
}
