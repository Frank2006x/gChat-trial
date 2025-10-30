import * as React from "react";

export interface MagicGradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export function MagicGradientText({ children, className = "" }: MagicGradientTextProps) {
  return (
    <span
      className={`bg-clip-text text-transparent bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 ${className}`}
    >
      {children}
    </span>
  );
}


