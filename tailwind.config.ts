import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  important: true,
  theme: {
    extend: {
      fontFamily: {
        sans: [...fontFamily.sans],
        jijia: ["jijia", ...fontFamily.sans],
        made: ["made", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
