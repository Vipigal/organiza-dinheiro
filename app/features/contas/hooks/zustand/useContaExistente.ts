import { create } from "zustand";

type ContaExistenteState = {
  id?: string;
  isOpenContaSheet: boolean;
  openContaSheet: (id: string) => void;
  closeContaSheet: () => void;
};

export const useContaExistente = create<ContaExistenteState>((set) => ({
  id: undefined,
  isOpenContaSheet: false,
  openContaSheet: (id: string) => set({ isOpenContaSheet: true, id }),
  closeContaSheet: () => set({ isOpenContaSheet: false, id: undefined }),
}));
