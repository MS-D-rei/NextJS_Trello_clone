import { create } from "zustand";

interface HeaderState {
  searchString: string;
  setSearchString: (searchString: string) => void;
}

export const useHeaderStore = create<HeaderState>((set) => ({
  searchString: "",
  setSearchString: (searchString: string) => set({ searchString })
}))