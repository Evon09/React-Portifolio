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

  // ========== CONFIGURAÇÃO DO FUNDO LÍQUIDO ==========
  backgroundLiquid: {
    // Cores das bolhas (agora com light/dark balanceados)
    blob1Color: {
      light: "purple.300", // mais escuro que purple.200
      dark: "purple.500", // um pouco mais vibrante
    },
    blob2Color: {
      light: "blue.300", // mais escuro que blue.200
      dark: "blue.500",
    },
    // Opacidades (maior no light mode para aparecer)
    blob1Opacity: {
      light: 0.35, // antes 0.25
      dark: 0.25,
    },
    blob2Opacity: {
      light: 0.35,
      dark: 0.25,
    },
    // Tamanhos (px) - pode manter
    blob1Size: 500,
    blob2Size: 400,
    // Posições
    blob1Position: { top: "-120px", left: "-120px" },
    blob2Position: { bottom: "-100px", right: "-100px" },
    // Grid de pontos - aumentar opacidade no light
    dotSize: 1,
    dotSpacing: 20,
    dotOpacity: {
      light: 0.15, // antes 0.08
      dark: 0.08,
    },
    showGrid: true,
    // Duração das animações (s)
    blob1AnimationDuration: 8,
    blob2AnimationDuration: 10,
    zIndex: 0,
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

  cssVarPrefix: "my-app",
});

export default theme;
