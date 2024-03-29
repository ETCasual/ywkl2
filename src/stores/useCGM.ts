import type { CGMs } from "@prisma/client";
import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";

type CGMState = {
  cgm: CGMs[] | [];
  cg: string;
  clear: () => void;
  setCGMs: (cgm: CGMState["cgm"]) => Promise<void>;
  setCG: (cg: string) => Promise<void>;
  reloadCG: (superuser?: boolean | null) => Promise<void>;
};

const createState: StateCreator<CGMState> = (set, get) => ({
  cgm: [],
  cg: "",
  clear: () =>
    set({
      cgm: [],
      cg: "",
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

  reloadCG: async (superuser) => {
    // if (!(get().cgm.length > 0)) return;

    const res = await fetch(`/api/cgm?cgId=${superuser ? "all" : get().cg}`, {
      method: "GET",
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response: CGMs[] = await res.json();
    console.log(get().cg, response);

    set({
      cgm: response,
    });
  },
});

export const useCGM = create(
  persist(createState, { name: "ywkl2-discipleship" }),
);
