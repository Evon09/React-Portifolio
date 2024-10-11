import { Card, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import theme from "../styles/const";
import Icon from "./iconsTec";
import tec from "../json/tec.json";
import { useMouse } from "../context/mouseProvider";

const Tecnologia = () => {
  const text = useColorModeValue(
    theme.colors.light.textPrimary,
    theme.colors.dark.textPrimary
  );
  const bg = useColorModeValue(
    theme.colors.light.background,
    theme.colors.dark.background
  );

  const icon = useColorModeValue(
    theme.colors.dark.background,
    theme.colors.light.background
  );
  const secondary = useColorModeValue(
    theme.colors.light.secondary,
    theme.colors.dark.secondary
  );

  const { language } = useMouse();
  const lista = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "Flutter",
    "Dart",
    "React",
    "ReactNative",
    "Firebase",
    "Chakra Ui",
  ];
  return (
    <Flex
      id="tec"
      w="100%"
      minH={`calc(90vh - ${theme.values.headerHegit})`}
      px={theme.values.px}
      gap={theme.values.gap}
      direction={"column"}
      color={text}
      bg={bg}
    >
      <Flex w={"100%"} align={"center"} justify={"center"} py={theme.values.py}>
        <Text fontSize={"50px"}>
          {language === "pt" ? tec.pt.title : tec.en.title}
        </Text>
      </Flex>
      <Flex
        gap={theme.values.gap}
        direction={{ base: "column", sm: "column", md: "row" }}
      >
        <Flex flex={1.5} direction={"column"}>
          {(language === "pt" ? tec.pt.descricao : tec.en.descricao)
            .split("\n")
            .map((paragraph, index) => (
              <Text
                key={index}
                whiteSpace="pre-line"
                lineHeight="1.8"
                mb={4}
                pl={4}
                textIndent={"1rem"}
              >
                {paragraph}
              </Text>
            ))}
        </Flex>

        <Flex flex={1} w={"100%"} h="auto">
          <Flex
            w={"100%"}
            gap={theme.values.gap - 9}
            flexWrap={"wrap"}
            alignSelf={"center"}
            justify={"left"}
          >
            {lista.map((item, index) => (
              <Card
                key={index}
                variant={"outline"}
                direction={"row"}
                h={"50px"}
                minW={"10px"}
                p={5}
                py={2}
                gap={2}
                justifyContent={"space-evenly"}
                align={"center"}
                flexGrow={lista.length === index + 1 ? 0 : 1}
                bg={secondary}
              >
                <Icon name={item} size={20} color={icon} />
                <Text>{item}</Text>
              </Card>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Tecnologia;
