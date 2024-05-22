"use client";

import ContaExistenteSheet from "@/app/features/contas/components/ContaExistenteSheet";
import NovaContaSheet from "@/app/features/contas/components/NovaContaSheet";
import { useMountedState } from "react-use";

export const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NovaContaSheet />
      <ContaExistenteSheet />
    </>
  );
};
