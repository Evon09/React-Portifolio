// components/BackgroundLiquidPoints.tsx
import { Box, useColorModeValue, useTheme } from "@chakra-ui/react";
import React from "react";

interface BackgroundLiquidPointsProps {
  blob1Color?: string | { light: string; dark: string };
  blob2Color?: string | { light: string; dark: string };
  blob1Opacity?: number | { light: number; dark: number };
  blob2Opacity?: number | { light: number; dark: number };
  blob1Size?: number;
  blob2Size?: number;
  blob1Position?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  blob2Position?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  dotSize?: number;
  dotSpacing?: number;
  dotOpacity?: number | { light: number; dark: number };
  blob1AnimationDuration?: number;
  blob2AnimationDuration?: number;
  showGrid?: boolean;
  zIndex?: number;
}

export const BackgroundLiquidPoints: React.FC<BackgroundLiquidPointsProps> = (
  props,
) => {
  const theme = useTheme();
  // Acessa as configurações padrão do tema (se existirem)
  const defaults = (theme as any).backgroundLiquid || {};

  // Mescla defaults com props
  const {
    blob1Color = defaults.blob1Color,
    blob2Color = defaults.blob2Color,
    blob1Opacity = defaults.blob1Opacity ?? 0.25,
    blob2Opacity = defaults.blob2Opacity ?? 0.25,
    blob1Size = defaults.blob1Size ?? 500,
    blob2Size = defaults.blob2Size ?? 400,
    blob1Position = defaults.blob1Position ?? { top: "-120px", left: "-120px" },
    blob2Position = defaults.blob2Position ?? {
      bottom: "-100px",
      right: "-100px",
    },
    dotSize = defaults.dotSize ?? 1,
    dotSpacing = defaults.dotSpacing ?? 20,
    dotOpacity = defaults.dotOpacity ?? 0.08,
    showGrid = defaults.showGrid ?? true,
    blob1AnimationDuration = defaults.blob1AnimationDuration ?? 8,
    blob2AnimationDuration = defaults.blob2AnimationDuration ?? 10,
    zIndex = defaults.zIndex ?? 0,
  } = props;

  // Resolve cores
  const resolvedBlob1Color = useColorModeValue(
    typeof blob1Color === "string" ? blob1Color : blob1Color.light,
    typeof blob1Color === "string" ? blob1Color : blob1Color.dark,
  );
  const resolvedBlob2Color = useColorModeValue(
    typeof blob2Color === "string" ? blob2Color : blob2Color.light,
    typeof blob2Color === "string" ? blob2Color : blob2Color.dark,
  );

  // Resolve opacidades
  const resolvedBlob1Opacity = useColorModeValue(
    typeof blob1Opacity === "number" ? blob1Opacity : blob1Opacity.light,
    typeof blob1Opacity === "number" ? blob1Opacity : blob1Opacity.dark,
  );
  const resolvedBlob2Opacity = useColorModeValue(
    typeof blob2Opacity === "number" ? blob2Opacity : blob2Opacity.light,
    typeof blob2Opacity === "number" ? blob2Opacity : blob2Opacity.dark,
  );
  const resolvedDotOpacity = useColorModeValue(
    typeof dotOpacity === "number" ? dotOpacity : dotOpacity.light,
    typeof dotOpacity === "number" ? dotOpacity : dotOpacity.dark,
  );

  return (
    <>
      {/* Bolha 1 */}
      <Box
        position="absolute"
        w={`${blob1Size}px`}
        h={`${blob1Size}px`}
        top={blob1Position.top}
        left={blob1Position.left}
        right={blob1Position.right}
        bottom={blob1Position.bottom}
        bg={resolvedBlob1Color}
        filter="blur(120px)"
        opacity={resolvedBlob1Opacity}
        borderRadius="50%"
        animation={`float ${blob1AnimationDuration}s ease-in-out infinite`}
        pointerEvents="none"
        zIndex={zIndex}
      />

      {/* Bolha 2 */}
      <Box
        position="absolute"
        w={`${blob2Size}px`}
        h={`${blob2Size}px`}
        top={blob2Position.top}
        left={blob2Position.left}
        right={blob2Position.right}
        bottom={blob2Position.bottom}
        bg={resolvedBlob2Color}
        filter="blur(140px)"
        opacity={resolvedBlob2Opacity}
        borderRadius="50%"
        animation={`float2 ${blob2AnimationDuration}s ease-in-out infinite`}
        pointerEvents="none"
        zIndex={zIndex}
      />

      {/* Grid de pontos */}
      {showGrid && (
        <Box
          position="absolute"
          w="100%"
          h="100%"
          opacity={resolvedDotOpacity}
          backgroundImage={`radial-gradient(currentColor ${dotSize}px, transparent ${dotSize}px)`}
          backgroundSize={`${dotSpacing}px ${dotSpacing}px`}
          pointerEvents="none"
          zIndex={zIndex}
        />
      )}

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(30px); }
            100% { transform: translateY(0px); }
          }
          @keyframes float2 {
            0% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(20px) translateX(20px); }
            100% { transform: translateY(0px) translateX(0px); }
          }
        `}
      </style>
    </>
  );
};
