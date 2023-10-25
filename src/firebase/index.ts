import { env } from "@/env.mjs";

const measurement = {
  measurementId: env.NEXT_PUBLIC_MEASUREMENT_ID,
};

const usualConfig = {
  apiKey: env.NEXT_PUBLIC_API_KEY,
  authDomain: env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_APP_ID,
};

export const firebaseConfig =
  env.NEXT_PUBLIC_IS_STAGING === "1"
    ? { ...usualConfig }
    : { ...usualConfig, ...measurement };
