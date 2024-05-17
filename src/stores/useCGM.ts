import type { CGMs, Cg } from "@prisma/client";
import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";

type CGMState = {
  cgm: (CGMs & { Cg: Cg })[] | [];
  cg: string;
  clear: () => void;
  setCGMs: (cgm: CGMState["cgm"]) => Promise<void>;
  setCG: (cg: string) => Promise<void>;
  reloadCG: (id?: string[] | null) => Promise<void>;
  state: "loading" | "done" | null;
};

const createState: StateCreator<CGMState> = (set, get) => ({
  cgm: [],
  cg: "",
  state: null,
  clear: () =>
    set({
      cgm: [],
      cg: "",
      state: null,
    }),
  setCG: async (state) => {
    await new Promise<void>((resolve) => {
      set({ cg: state });
      resolve();
    });
  },
  setCGMs: async (state) => {
    await new Promise<void>((resolve) => {
      set({ cgm: state });
      resolve();
    });
  },

  reloadCG: async (id) => {
    // if (!(get().cgm.length > 0)) return;
    set({
      state: "loading",
    });

    const res = await fetch(
      `/api/cgm?cgId=${id && id?.length > 0 ? String(id) : String([get().cg])}`,
      {
        method: "GET",
      },
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response: (CGMs & { Cg: Cg })[] = await res.json();
    set({
      cgm: response,
      state: "done",
    });
  },
});

export const useCGM = create(
  persist(createState, { name: "ywkl2-discipleship" }),
);
