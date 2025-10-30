import * as React from "react";

export interface BentoItem {
  title: string;
  description: string;
  className?: string;
  icon?: React.ReactNode;
}

export interface BentoGridProps {
  items: BentoItem[];
}

export function BentoGrid({ items }: BentoGridProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, idx) => (
        <article
          key={idx}
          className={`group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 ${item.className ?? ""}`}
        >
          {item.icon && (
            <div className="mb-3 text-2xl text-zinc-900 dark:text-zinc-100">{item.icon}</div>
          )}
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{item.title}</h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{item.description}</p>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-zinc-200/40 opacity-0 transition group-hover:opacity-100 dark:to-zinc-800/30" />
        </article>
      ))}
    </div>
  );
}


