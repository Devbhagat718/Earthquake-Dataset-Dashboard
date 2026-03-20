import { create } from "zustand";

export interface Earthquake {
  id: string;
  mag: number;
  depth: number;
  latitude: number;
  longitude: number;
  place: string;
  time: string;
  magInt: number;
  depthInt: number;
  region: string;
}

interface AppState {
  data: Earthquake[];
  filteredData: Earthquake[];
  selectedId: string | null;
  setData: (data: Earthquake[]) => void;
  setFilteredData: (data: Earthquake[]) => void;
  setSelectedId: (id: string | null) => void;
}

export const useStore = create<AppState>((set) => ({
  data: [],
  filteredData: [],
  selectedId: null,
  setData: (data) => set({ data, filteredData: data }),
  setFilteredData: (data) => set({ filteredData: data }),
  setSelectedId: (id) => set({ selectedId: id }),
}));