module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  safelist: [
    "text-2xl",
    "text-3xl",
    "text-4xl",
    "text-5xl",
    "text-6xl",
    "sm:text-2xl",
    "sm:text-3xl",
    "sm:text-4xl",
    "sm:text-5xl",
    "sm:text-6xl",
    "md:text-2xl",
    "md:text-3xl",
    "md:text-4xl",
    "md:text-5xl",
    "md:text-6xl",
    "lg:text-2xl",
    "lg:text-3xl",
    "lg:text-4xl",
    "lg:text-5xl",
    "lg:text-6xl",
  ],
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        Hahmlet: ["Hahmlet", "serif"],
        JosefinSans: ["Josefin Sans", "sans-serif"],
        Oxygen: ["Oxygen", "sans-serif"],
        Roboto: ["Roboto", "sans-serif"],
        RobotoSlab: ["Roboto Slab", "serif"],
        Noto: ["Noto Serif", "serif"],
        OpenSans: ["Open Sans", "sans-serif"],
        Raleway: ["Raleway", "sans-serif"],
      },
    },
  },
  plugins: [],
  darkMode: "class",
};