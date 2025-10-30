import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-zinc-200/60 bg-white/80 backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/70">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6 md:px-12 lg:px-24">
        <Link href="/" className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          ChattrBox
        </Link>
        <div className="hidden items-center gap-6 text-sm text-zinc-600 md:flex dark:text-zinc-400">
          <Link href="/">Home</Link>
          <a href="#about">About us</a>
          <a href="#course">Course</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/chat">
            <Button size="sm" className="rounded-full">Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}


