import tailwindcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";

export default {
  plugins: [
    tailwindcss,
    autoprefixer({
      overrideBrowserslist: ["defaults", "not IE 11", "last 2 versions"],
    }),
  ],
};
