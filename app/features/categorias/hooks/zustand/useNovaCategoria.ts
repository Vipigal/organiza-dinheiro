import { create } from "zustand";

type NovaCategoriaState = {
  isOpenCategoriaSheet: boolean;
  openCategoriaSheet: () => void;
  closeCategoriaSheet: () => void;
};

export const useNovaCategoria = create<NovaCategoriaState>((set) => ({
  isOpenCategoriaSheet: false,
  openCategoriaSheet: () => set({ isOpenCategoriaSheet: true }),
  closeCategoriaSheet: () => set({ isOpenCategoriaSheet: false }),
}));
