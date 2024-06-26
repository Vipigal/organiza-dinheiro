import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface Props {
  size: "big" | "small";
}

export default function Loader({ size }: Props) {
  return (
    <div className="flex items-center justify-center">
      <Loader2
        className={cn(
          "animate-spin text-slate-400",
          size === "big" ? "size-8" : ""
        )}
      />
    </div>
  );
}
