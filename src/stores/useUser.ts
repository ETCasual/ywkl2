import { type User } from "@prisma/client";
import { bool } from "aws-sdk/clients/signer";
import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";

type UserState = {
  user: User | null;
  hasRegistered: boolean;
  clear: () => void;
  setUser: (user: User) => void;
  setRegistrationStatus: (state: boolean) => void;
};

const createState: StateCreator<UserState> = (set) => ({
  user: null,
  hasRegistered: false,
  clear: () =>
    set({
      user: null,
    }),
  setUser: (state) => {
    set({ user: { ...state } });
  },

  setRegistrationStatus: (state) => {
    set({ hasRegistered: state });
  },
});

export const useUser = create(persist(createState, { name: "ywkl2-user" }));
