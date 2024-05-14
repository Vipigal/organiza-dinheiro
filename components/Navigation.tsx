"use client";

import { usePathname, useRouter } from "next/navigation";
import NavButton from "./NavButton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useMedia } from "react-use";
import { useState } from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

const routes = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/transacoes",
    label: "Transações",
  },
  {
    href: "/contas",
    label: "Contas",
  },
  {
    href: "/categorias",
    label: "Categorias",
  },
  {
    href: "/ajustes",
    label: "Ajustes",
  },
];

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useMedia("(max-width: 1024px)", false);

  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger>
          <Button
            variant={"outline"}
            size="sm"
            className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none 
            outline-none focus:bg-white/30 transition focus-visible:ring-offset-0 focus-visible:ring-transparent"
          >
            <Menu className="size-4 " />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"} className="px-2">
          <nav className="flex flex-col gap-y-2 pt-6">
            {routes.map((route) => (
              <Button
                key={route.href}
                onClick={() => onClick(route.href)}
                variant={route.href === pathname ? "secondary" : "ghost"}
                className="w-full justify-start "
              >
                {route.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
      {routes.map((route) => (
        <NavButton
          key={route.href}
          href={route.href}
          isActive={pathname === route.href}
        >
          {route.label}
        </NavButton>
      ))}
    </nav>
  );
}

export default Navigation;
