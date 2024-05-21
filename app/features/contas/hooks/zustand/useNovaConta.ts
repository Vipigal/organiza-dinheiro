import { create } from "zustand";

type NovaContaState = {
  isOpenContaSheet: boolean;
  openContaSheet: () => void;
  closeContaSheet: () => void;
};

export const useNovaConta = create<NovaContaState>((set) => ({
  isOpenContaSheet: false,
  openContaSheet: () => set({ isOpenContaSheet: true }),
  closeContaSheet: () => set({ isOpenContaSheet: false }),
}));
