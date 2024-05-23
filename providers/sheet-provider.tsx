"use client";

import CategoriaExistenteSheet from "@/app/features/categorias/components/CategoriaExistenteSheet";
import NovaCategoriaSheet from "@/app/features/categorias/components/NovaCategoriaSheet";
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

      <NovaCategoriaSheet />
      <CategoriaExistenteSheet />
    </>
  );
};
