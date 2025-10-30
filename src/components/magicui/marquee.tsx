import * as React from "react";

export interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  pauseOnHover?: boolean;
  speed?: number; // pixels per second approx
}

export function Marquee({ children, className = "", pauseOnHover = true, speed = 60 }: MarqueeProps) {
  const duration = 40 * (60 / speed); // normalize to keep reasonable
  return (
    <div className={`relative overflow-hidden ${className}`} role="marquee">
      <div
        className={`flex min-w-max items-center gap-8 animate-[marquee_linear_infinite] ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {children}
        {children}
        {children}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}


