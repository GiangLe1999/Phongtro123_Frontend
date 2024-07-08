import { ReactNode } from "react";
import { cn } from "../lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function SectionContainer({ children, className }: Props) {
  return (
    <div
      className={cn(
        "mx-auto max-w-3xl px-4 sm:px-9 xl:max-w-5xl xl:px-0",
        className
      )}
    >
      {children}
    </div>
  );
}
