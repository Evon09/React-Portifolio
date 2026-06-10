import { Card, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import theme from "../styles/const";
import Icon from "./iconsTec";
import tec from "../json/tec.json";
import { useMouse } from "../context/mouseProvider";
import { BackgroundLiquidPoints } from "./shaders/BackgroundLiquidPoints";
import { LiquidCursorInteractive } from "./mouse";

const Tecnologia = () => {
  const text = useColorModeValue(
    theme.colors.light.textPrimary,
    theme.colors.dark.textPrimary,
  );
  const bg = useColorModeValue(
    theme.colors.light.background,
    theme.colors.dark.background,
  );

  const icon = useColorModeValue(
    theme.colors.dark.background,
    theme.colors.light.background,
  );
  const secondary = useColorModeValue(
    theme.colors.light.secondary,
    theme.colors.dark.secondary,
  );

  const { language } = useMouse();

  const lista = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "NodeJS",
    "NestJS",
    "NextJS",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Flutter",
    "Dart",
    "React",
    "React Native",
    "Firebase",
    "TailwindCSS",
    "Elixir",
    "Phoenix",
    "Chakra UI",
  ];

  return (
    <Flex
      id="tec"
      w="100%"
      minH="100vh"
      position="relative"
      overflow="hidden"
      bg={bg}
      color={text}
      align="center"
      justify="center"
      px={theme.values.px}
      py={theme.values.py}
    >
      {/* Fundo líquido modular */}
      <BackgroundLiquidPoints
        blob1Color={{ light: "purple.200", dark: "purple.400" }}
        blob2Color={{ light: "transparent", dark: "transparent" }}
        blob1Position={{ top: "20%", left: "10%" }}
        showGrid
        dotOpacity={{ light: 0.2, dark: 0.08 }}
      />

      {/* Conteúdo principal */}
      <Flex
        w="100%"
        maxW="1200px"
        direction="column"
        gap={theme.values.gap}
        zIndex={1}
      >
        <Flex w="100%" align="center" justify="center" py={theme.values.py}>
          <Text fontSize={{ base: "3xl", md: "5xl" }} fontWeight="bold">
            {language === "pt" ? tec.pt.title : tec.en.title}
          </Text>
        </Flex>

        <Flex gap={theme.values.gap} direction={{ base: "column", md: "row" }}>
          {/* Coluna da descrição */}
          <Flex flex={1.5} direction="column">
            {(language === "pt" ? tec.pt.descricao : tec.en.descricao)
              .split("\n")
              .map((paragraph, index) => (
                <Text
                  key={index}
                  whiteSpace="pre-line"
                  lineHeight="1.8"
                  mb={4}
                  pl={4}
                  textIndent="1rem"
                  sx={{ userSelect: "text" }}
                >
                  {paragraph}
                </Text>
              ))}
          </Flex>

          {/* Coluna dos cards de tecnologia */}
          <Flex flex={1} w="100%" h="auto">
            <LiquidCursorInteractive offsetX={5} ringPadding={20}>
              <Flex
                w="100%"
                gap={theme.values.gap - 9}
                flexWrap="wrap"
                alignSelf="center"
                justify="left"
              >
                {lista.map((item, index) => (
                  <Card
                    key={index}
                    variant="outline"
                    direction="row"
                    h="50px"
                    minW="10px"
                    p={5}
                    py={2}
                    gap={2}
                    justifyContent="space-evenly"
                    align="center"
                    flexGrow={lista.length === index + 1 ? 0 : 1}
                    bg={secondary}
                    backdropFilter="blur(4px)"
                    transition="all 0.2s"
                    _hover={{
                      transform: "translateY(-3px)",
                      boxShadow: "lg",
                    }}
                  >
                    <Icon name={item} size={20} color={icon} />
                    <Text userSelect="text">{item}</Text>
                  </Card>
                ))}
              </Flex>
            </LiquidCursorInteractive>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Tecnologia;
