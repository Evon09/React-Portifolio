import { Flex, Switch, Text } from "@chakra-ui/react";
import React from "react";
import theme from "../styles/const";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { useMouse } from "../context/mouseProvider";
import header from "../json/header.json";

const Header = () => {
  const { language, setLanguage } = useMouse();
  return (
    <Flex
      w="100%"
      h={theme.values.headerHegit}
      bg="rgba(74, 85, 104, 0.5)"
      px={theme.values.px}
      justify={"space-between"}
      position={"fixed"}
      zIndex={2}
    >
      <Flex align={"center"}>
        <Text fontSize={"35px"}>Jairjose</Text>
      </Flex>
      <Flex justify={"end"} align={"center"} gap={theme.values.gap / 5}>
        <Flex
          direction={"row"}
          display={{ base: "none", sm: "none", md: "flex" }}
          gap={theme.values.gap / 2}
        >
          <a href="#about">
            <Text>{language === "pt" ? header.sobre.pt : header.sobre.en}</Text>
          </a>
          <a href="#experiencia">
            <Text>
              {language === "pt"
                ? header.experiencia.pt
                : header.experiencia.en}
            </Text>
          </a>
          <a href="#tec">
            <Text>{language === "pt" ? header.tec.pt : header.tec.en}</Text>
          </a>
          <a href="#projetos">
            <Text>
              {language === "pt" ? header.projetos.pt : header.projetos.en}
            </Text>
          </a>
          <a href="#contato">
            <Text>
              {language === "pt" ? header.contato.pt : header.contato.en}
            </Text>
          </a>
        </Flex>

        <ColorModeSwitcher justifySelf="flex-end" />
        <Flex gap={2}>
          <Text>Pt</Text>
          <Switch
            size="md"
            isChecked={language === "en"} // Define que o switch está checked quando a linguagem é "en"
            onChange={() => {
              setLanguage(language === "pt" ? "en" : "pt"); // Alterna entre pt e en
            }}
          />
          <Text>En</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
