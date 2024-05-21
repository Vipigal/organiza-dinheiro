import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: Props) {
  return (
    <div className={cn("min-h-screen flex flex-col gap-2", className)}>
      {children}
    </div>
  );
}
