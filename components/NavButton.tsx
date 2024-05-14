import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "./ui/button";

interface Props {
  children: ReactNode;
  href: string;
  isActive: boolean;
}

function NavButton({ children, href, isActive }: Props) {
  return (
    <Button
      asChild
      size={"sm"}
      variant={"outline"}
      className={cn(
        `w-full lg:w-auto text-white justify-between font-normal hover:bg-white/20 hover:text-white
         border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none focus:bg-white/30 transition`,
        isActive ? "bg-white/10 text-white" : "bg-transparent"
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}

export default NavButton;
