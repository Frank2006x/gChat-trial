import * as React from "react";

export interface MagicContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function MagicContainer({ children, className = "" }: MagicContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 md:px-12 lg:px-24 ${className}`}>{children}</div>
  );
}


