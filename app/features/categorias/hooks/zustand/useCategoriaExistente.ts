import { create } from "zustand";

type CategoriaExistenteState = {
  id?: string;
  isOpenCategoriaSheet: boolean;
  openCategoriaSheet: (id: string) => void;
  closeCategoriaSheet: () => void;
};

export const useCategoriaExistente = create<CategoriaExistenteState>((set) => ({
  id: undefined,
  isOpenCategoriaSheet: false,
  openCategoriaSheet: (id: string) => set({ isOpenCategoriaSheet: true, id }),
  closeCategoriaSheet: () =>
    set({ isOpenCategoriaSheet: false, id: undefined }),
}));
