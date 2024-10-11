import { Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";
import React, { Suspense, useEffect, useRef } from "react";
import theme from "../styles/const";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Rheto } from "./models/Rhetorician";
import { easing } from "maath";
import { Glitch } from "@react-three/postprocessing"; // Importando o Glitch effect
import { GlitchMode } from "postprocessing"; // Importando o modo do Glitch effect
import { Vector2 } from "three";
import { extend } from "@react-three/fiber";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";
import { WebGLRenderer } from "three";
import sobre from "../json/sobre.json";

import foto from "../img/file.jpg";
import { useMouse } from "../context/mouseProvider";

const About = () => {
  const bg = useColorModeValue(
    theme.colors.light.background,
    theme.colors.dark.background
  );
  const text = useColorModeValue(
    theme.colors.light.textPrimary,
    theme.colors.dark.textPrimary
  );

  const { language } = useMouse();
  return (
    <Flex
      color={text}
      id="about"
      w="100%"
      h={`calc(100vh - ${theme.values.headerHegit})`} // Ocupa 100% da altura da tela
      bg={bg}
      zIndex={-1}
      px={theme.values.px}
      align={"center"}
      justify={"center"}
      gap={theme.values.gap}
      direction={{ base: "column", sm: "column", md: "row" }}
      paddingTop={{
        base: `calc(  ${theme.values.headerHegit} + ${theme.values.headerHegit} / 2 )`,
        sm: `calc(  ${theme.values.headerHegit}+ ${theme.values.headerHegit} / 2 )`,
        md: "0",
      }}
    >
      <Flex flex={5} justify={"center"}>
        <Image
          src={foto} // Substitua pela URL da sua imagem
          alt="Descrição da Imagem"
          objectFit="contain"
          h={{ base: "200px", md: "300px" }} // Altura responsiva da imagem src="https://via.placeholder.com/350"
          borderTopLeftRadius={"20%"}
          borderBottomEndRadius={"20%"}
          borderTopEndRadius={"5%"}
          borderBottomLeftRadius={"5%"}
        />
      </Flex>

      <Flex flex={6}>
        <Text
          fontSize={{
            base: "clamp(24px, 5vw, 45px)", // Ajusta para telas pequenas
            md: "clamp(35px, 4vw, 45px)", // Ajusta para telas médias
          }}
          lineHeight="1.2"
        >
          {language === "pt" ? sobre.pt.pt1 : sobre.en.pt1}{" "}
          <Text
            fontSize={{
              base: "clamp(30px, 8vw, 60px)", // Ajusta o nome para tamanhos diferentes
              md: "clamp(40px, 6vw, 60px)", // Para telas médias e grandes
            }}
            fontWeight="bold"
          >
            Jair José Sequeira.
          </Text>
          {language === "pt" ? sobre.pt.pt2 : sobre.en.pt2}{" "}
        </Text>
      </Flex>

      {/* Texto sobreposto e centralizado
      <Flex
        w={"50%"}
        h="auto"
        top={"50%"}
        right={theme.values.px}
        transform={"translate(0, -50%)"} // Centraliza o texto
        align={"center"}
        justify="center"
        p={4}
        position={{ md: "absolute", xl: "absolute" }}
      >
        <Text>
          <Text fontSize={"45px"} lineHeight="1.2">
            Hi, my name is
            <Text fontSize={"60px"} fontWeight="bold">
              Jair José Sequeira.
            </Text>
            I'm a computer science student and a software engineer.
          </Text>
        </Text>
      </Flex> */}
    </Flex>
  );
};

export default About;
