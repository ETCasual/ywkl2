import { type User } from "@prisma/client";
import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";

type UserState = {
  user:
    | (Omit<User, "password"> & {
        as_cgm?: { cgId: string | null } | null;
        coaching_on?: { id: string; clusterId: string }[];
        leaderToCluster?: { id: string; userId: string } | null;
      })
    | null;
  hasRegistered: boolean;
  clear: () => void;
  setUser: (user: Omit<User, "password">) => Promise<void>;
  setRegistrationStatus: (state: boolean) => void;
  reloadUser: () => Promise<void>;
};

const createState: StateCreator<UserState> = (set, get) => ({
  user: null,
  hasRegistered: false,
  clear: () =>
    set({
      user: null,
      hasRegistered: false,
    }),
  setUser: async (state) => {
    await new Promise<void>((resolve) => {
      set({ user: { ...state } });
      resolve();
    });
  },

  setRegistrationStatus: (state) => {
    set({ hasRegistered: state });
  },
  reloadUser: async () => {
    if (!get().user) return;
    const res = await fetch(`/api/profile?id=${get().user?.id}`, {
      method: "GET",
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response: User = await res.json();

    console.log("user-fetch", response);
    set({
      user: response,
    });
  },
});

export const useUser = create(persist(createState, { name: "ywkl2-user" }));
