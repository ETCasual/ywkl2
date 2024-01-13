import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

export default {
  content: ["./src/**/*.tsx"],
  important: true,
  daisyui: { themes: ["dracula"] },
  theme: {
    extend: {
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
        hard: "0 3px 2px var(--tw-shadow-color)",
      },
      fontFamily: {
        sans: [...fontFamily.sans],
        jijia: ["jijia", ...fontFamily.sans],
        made: ["made", ...fontFamily.sans],
        noto: ["'Noto Sans SC'", "sans-serif"],
      },
    },
  },
  plugins: [
    require("daisyui"),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value: string) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") },
      );
    }),
  ],
} satisfies Config;
