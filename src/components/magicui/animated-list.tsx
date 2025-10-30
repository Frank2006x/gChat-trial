import * as React from "react";

export interface AnimatedListProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedList({ children, className = "" }: AnimatedListProps) {
  return (
    <div className={`grid gap-3 ${className}`}>
      {React.Children.map(children, (child, index) => (
        <div
          className="animate-[fadeUp_500ms_ease-out_forwards] opacity-0"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          {child}
        </div>
      ))}
      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}


