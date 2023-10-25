import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import withMT from "@material-tailwind/react/utils/withMT";

const config = withMT({
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
} satisfies Config);

export default config;
