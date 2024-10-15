import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import theme from "../styles/const";
import "./../styles/style.css";
import { useMouse } from "../context/mouseProvider";
import experiencia from "../json/experiencia.json";

const Experiencia = () => {
  const { setZIndex } = useMouse();
  const bg = useColorModeValue(
    theme.colors.light.background,
    theme.colors.dark.background
  );
  const secondary = useColorModeValue(
    theme.colors.light.secondary,
    theme.colors.dark.secondary
  );
  const border = useColorModeValue(
    theme.colors.dark.background,
    theme.colors.light.background
  );
  const text = useColorModeValue(
    theme.colors.light.textPrimary,
    theme.colors.dark.textPrimary
  );
  const { language } = useMouse();

  
  return (
    <Flex
      id="experiencia"
      w="100%"
      minH={`calc(90vh - ${theme.values.headerHegit})`}
      px={theme.values.px}
      gap={theme.values.gap}
      direction={"column"}
      bg={bg}
      color={text}
    >
      <Flex w={"100%"} align={"center"} justify={"center"} py={theme.values.py}>
        <Text fontSize={"50px"}>
          {" "}
          {language === "pt" ? experiencia.pt : experiencia.en}
        </Text>
      </Flex>

      <Accordion
        allowToggle
        w={{ base: "100%", sm: " 100%", md: "60%" }}
        alignSelf={"center"}
      >
        <Flex direction={"column"} gap={theme.values.gap}>
          {experiencia.experiencia.map((item, index) => (
            <AccordionItem
              className="experience"
              w={"100%"}
              border={0}
              borderRadius={`calc(${theme.values.headerHegit}/2)`}
              minH={"5vh"}
              alignContent={"center"}
              transition={"0.3s ease"}
              position={"relative"}
              _after={{
                content: '""',
                w: "100%",
                border: `1px solid `,
                borderColor: border,

                borderRadius: `calc(${theme.values.headerHegit}/2)`,
                minH: "5vh",
                alignContent: "center",
                transition: "0.3s ease",
                position: "absolute",
                top: "0",
                left: "0",
                right: "0",
                bottom: "0",
                zIndex: 0,
                backgroundColor: secondary,
              }}
              _before={{
                content: '""',
                position: "absolute",
                top: "0",
                left: "0",
                right: "0",
                bottom: "0",
                borderRadius: `calc(${theme.values.headerHegit}/2)`,
                border: `2px solid `,
                borderColor: border,

                boxSizing: "border-box",
                transition: "all 0.1s ease",
                backgroundColor: bg,
                zIndex: 0,
              }}
              _hover={{
                _before: {
                  top: "-12px",
                  left: "-12px",
                  right: "-12px",
                  bottom: "-12px",
                  border: `2px solid `,
                  borderColor: border,
                  borderRadius: `calc(12px + ${theme.values.headerHegit}/2)`,
                },
                _after: {
                  border: 0,
                },
              }}
              onMouseEnter={() => setZIndex(-1)}
              onMouseLeave={() => setZIndex(20)}
            >
              <AccordionButton // O botão continua gerenciando o estado, mas ocupa todo o item
                minH={theme.values.headerHegit}
                position={"relative"}
                flexDirection={"column"}
                zIndex={1}
                h={"100%"}
              >
                <Flex
                  h={theme.values.headerHegit}
                  p={theme.values.p}
                  w={"100%"}
                  align={"center"}
                >
                  <Flex
                    as="span"
                    flex="1"
                    textAlign="left"
                    justify={"space-between"}
                    direction={"row"}
                  >
                    <Text>
                      {language === "pt" ? item.title.pt : item.title.en}
                    </Text>

                    <Text>
                      {language === "pt" ? item.data.pt : item.data.en}
                    </Text>
                  </Flex>
                  <AccordionIcon />
                </Flex>

                <AccordionPanel pb={4}>
                  {language === "pt" ? item.descricao.pt : item.descricao.en}
                </AccordionPanel>
              </AccordionButton>
            </AccordionItem>
          ))}
        </Flex>
      </Accordion>
    </Flex>
  );
};

export default Experiencia;
