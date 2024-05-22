"use client";

import { useUser } from "@clerk/nextjs";
import { Skeleton } from "./ui/skeleton";

export default function WelcomeMessage() {
  const { user, isLoaded } = useUser();
  return (
    <div className="space-y-2 mb-4">
      <h2 className="text-2xl lg:text-4xl text-white font-medium">
        {isLoaded ? (
          `Bem Vindo de Volta, ${user?.firstName}`
        ) : (
          <Skeleton className="w-[600px] h-10" />
        )}
      </h2>{" "}
      <p className="text-sm lg:text-base text-orange-300">
        Este é o seu Resumo Financeiro.
      </p>
    </div>
  );
}
