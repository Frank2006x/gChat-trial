export function Footer() {
  return (
    <footer className="mt-16 border-t border-zinc-200/60 py-8 dark:border-zinc-800/60">
      <div className="mx-auto w-full max-w-6xl px-6 text-center text-xs text-zinc-500 md:px-12 lg:px-24 dark:text-zinc-400">
        © {new Date().getFullYear()} ChattrBox. Built with Next.js.
      </div>
    </footer>
  );
}


