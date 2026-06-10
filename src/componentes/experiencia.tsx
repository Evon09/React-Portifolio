import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Text,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import theme from "../styles/const";
import "./../styles/style.css";
import { useMouse } from "../context/mouseProvider";
import experiencia from "../json/experiencia.json";
import { LiquidCursorInteractive } from "./mouse";
import { BackgroundLiquidPoints } from "./shaders/BackgroundLiquidPoints";

const Experiencia = () => {
  const { language } = useMouse();
  const bg = useColorModeValue(
    theme.colors.light.background,
    theme.colors.dark.background,
  );
  const secondary = useColorModeValue(
    theme.colors.light.secondary,
    theme.colors.dark.secondary,
  );
  const text = useColorModeValue(
    theme.colors.light.textPrimary,
    theme.colors.dark.textPrimary,
  );

  return (
    <Flex
      id="experiencia"
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
      <BackgroundLiquidPoints
        blob1Color="purple.400"
        blob2Color="blue.400"
        blob1Position={{ top: "20%", right: "-120px" }}
        blob2Position={{ bottom: "23%", left: "-100px" }}
        showGrid={true}
        dotOpacity={{ light: 0.2, dark: 0.08 }}
      />

      {/* ===== CONTEÚDO ===== */}
      <Flex
        w="100%"
        maxW="1200px"
        direction="column"
        gap={theme.values.gap}
        zIndex={1}
      >
        <Flex w="100%" align="center" justify="center">
          <Text fontSize={{ base: "3xl", md: "5xl" }} fontWeight="bold">
            {language === "pt" ? experiencia.pt : experiencia.en}
          </Text>
        </Flex>

        <Accordion
          allowToggle
          w={{ base: "100%", md: "80%" }}
          alignSelf="center"
        >
          <Flex direction="column" gap={theme.values.gap}>
            {experiencia.experiencia.map((item, index) => (
              <LiquidCursorInteractive
                key={index}
                offsetX={5}
                ringPadding={20}
                style={{
                  display: "inline-flex", // ajusta à largura do conteúdo
                  margin: 0,
                  padding: 0,
                  borderRadius: `calc(${theme.values.headerHegit}/2)`, // mesmo valor
                }}
              >
                <AccordionItem
                  className="experience"
                  w="100%"
                  border="none"
                  borderRadius={`calc(${theme.values.headerHegit}/2)`}
                  bg={secondary}
                  boxShadow="0 4px 12px rgba(0,0,0,0.1)"
                  transition="all 0.3s ease"
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                  }}
                >
                  <AccordionButton
                    minH={theme.values.headerHegit}
                    flexDirection="column"
                    h="100%"
                    _focus={{ boxShadow: "none" }}
                  >
                    <Flex
                      h={theme.values.headerHegit}
                      p={theme.values.p}
                      w="100%"
                      align="center"
                    >
                      <Flex
                        flex="1"
                        textAlign="left"
                        justify="space-between"
                        direction={{ base: "column", sm: "row" }}
                        gap="8px"
                      >
                        <Text fontWeight="bold" fontSize="lg">
                          {language === "pt" ? item.title.pt : item.title.en}
                        </Text>
                        <Text fontSize="sm" opacity={0.7}>
                          {language === "pt" ? item.data.pt : item.data.en}
                        </Text>
                      </Flex>
                      <AccordionIcon />
                    </Flex>
                    <AccordionPanel textAlign="left" pb={4}>
                      <Text
                        sx={{
                          userSelect: "text",
                          cursor: "text",
                        }}
                      >
                        {language === "pt"
                          ? item.descricao.pt
                          : item.descricao.en}
                      </Text>
                    </AccordionPanel>
                  </AccordionButton>
                </AccordionItem>
              </LiquidCursorInteractive>
            ))}
          </Flex>
        </Accordion>
      </Flex>
    </Flex>
  );
};

export default Experiencia;
