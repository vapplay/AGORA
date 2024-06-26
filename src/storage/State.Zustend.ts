import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
import { itemTypes } from "../types/types";

type info1 = {
  backdrop_path: string;
  id: number;
  overview: string;
  popularity: number;
  release_date: string;
  title: string;
  video: boolean;
};

type StorTypes = {
  genere: string;
  season: number;
  seasons: [number];
  videoURL: string;
  addFavorito: itemTypes | null;
  favoriteId: string;
  setGenere: (genere: string) => void;
  setSeason: (season: number) => void;
  setSeasons: (seasons: [number]) => any;
  setVideoUrl: (videoURL: string) => void;
  setFavoriteId: (addFavorito: string) => void;
  setAddFavorito: (addFavorito: itemTypes | null) => void;
  getItemInfo: info1;
  setItemInfo: (getItemInfo: info1) => void;
};

export const Storage = create<StorTypes>((set) => ({
  genere: "",
  season: 1,
  seasons: [1],
  videoURL: "",
  addFavorito: null,
  favoriteId: "",
  getItemInfo: {
    backdrop_path: "",
    id: 0,
    overview: "",
    popularity: 0,
    release_date: "",
    title: "",
    video: false,
  },

  setItemInfo: (getItemInfo: info1) => set({ getItemInfo }),
  setFavoriteId: (favoriteId: string) => set({ favoriteId }),
  setVideoUrl: (videoURL: string) => set({ videoURL }),
  setSeasons: (seasons: [number]) => set({ seasons }),
  setSeason: (season: number) => set({ season }),
  setGenere: (genere: string) => set({ genere }),
  setAddFavorito: (addFavorito: itemTypes | null) => set({ addFavorito }),
}));

type auth = {
  token: string | null;
  setToken: (token: string) => void;
  user: any | null;
  setUser: (user: string) => void;
  political: boolean;
  setPolitical: () => void;
};

export const authState = create(
  persist<auth>(
    (set) => ({
      user: null,
      token: null,
      political: true,
      setToken: (token: string) => set({ token }),
      setUser: (user: string) => set({ user }),
      setPolitical: () => set({ political: false }),
    }),
    {
      name: "login",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

type videoStorage = {
  leguages: [string];
  setLeguages: (leguages: [string]) => void;
  lenguage: string;
  setLenguage: (lenguage: string) => void;
  id: number;
  setId: (id: number) => void;
  nexEpisod: {
    id: string;
    poster: string;
  };
  setNextEpisode: (nexEpisod: { id: string; poster: string }) => void;
};

export const videoStorage = create<videoStorage>((set) => ({
  leguages: [""],
  lenguage: "",
  id: 0,
  nexEpisod: {
    id: "",
    poster: "",
  },
  setId: (id: number) => set({ id }),
  setNextEpisode: (nexEpisod: { id: string; poster: string }) =>
    set({ nexEpisod }),
  setLeguages: (leguages: [string]) => set({ leguages }),
  setLenguage: (lenguage: string) => set({ lenguage }),
}));
