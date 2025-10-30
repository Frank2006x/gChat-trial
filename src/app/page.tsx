import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-zinc-50 to-zinc-200 dark:from-zinc-900 dark:to-black">
      <main className="flex w-full max-w-xl flex-col items-center gap-8 rounded-3xl border border-zinc-100 bg-white/90 p-12 shadow-lg backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80 sm:mt-10 sm:items-center">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          ChattrBox
        </h1>
        <h2 className="text-xl font-normal text-zinc-700 dark:text-zinc-200">
          Global Chat. Everyone, everywhere.
        </h2>
        <p className="mb-8 text-center text-base text-zinc-600 dark:text-zinc-300">
          Dive into a realtime worldwide group chat. Designed with Next.js,
          Tailwind, and a seamless modern experience. No sign up required.
        </p>
        <Link href="/chat">
          <button className="inline-flex h-12 w-40 items-center justify-center rounded-full bg-zinc-900 px-6 text-base font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-300">
            Enter Chat
          </button>
        </Link>
      </main>
    </div>
  );
}
