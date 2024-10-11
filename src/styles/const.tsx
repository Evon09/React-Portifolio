import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    light: {
      background: "#ffffff",
      textPrimary: "#000000",
      textSecondary: "#4a5568",
      secondary: "#dcdcdc",

      accent: "#27ae60",
      highlight: "#3498db",
    },
    dark: {
      background: "#1A202C",
      textPrimary: "#ffffff",
      textSecondary: "#4a5568",
      secondary: "#2D3748",

      accent: "#27ae60",
      highlight: "#3498db",
    },
  },
  values: {
    headerHegit: "10vh",
    px: "5vw",
    gap: 10,
    py: 6,
    footerHegit: "10vh",
    p: 3,
    cursor: 6,
  },

  cssVarPrefix: "my-app", // prefixo para evitar conflitos com outras variáveis CSS
});

export default theme;
