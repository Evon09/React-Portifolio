import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Grid,
  GridItem,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import theme from "../styles/const";
import projetos from "../json/projetos.json";
import { useMouse } from "../context/mouseProvider";
import { BackgroundLiquidPoints } from "./shaders/BackgroundLiquidPoints";
import { LiquidCursorInteractive } from "./mouse";

const Projetos = () => {
  const { language } = useMouse();
  const [imageSrcs, setImageSrcs] = useState<string[]>([]);

  const bg = useColorModeValue(
    theme.colors.light.background,
    theme.colors.dark.background,
  );
  const text = useColorModeValue(
    theme.colors.light.textPrimary,
    theme.colors.dark.textPrimary,
  );
  const textDec = useColorModeValue(
    theme.colors.light.textSecondary,
    theme.colors.dark.textSecondary,
  );
  const cardBg = useColorModeValue(
    "rgba(255, 255, 255, 0.6)",
    "rgba(45, 55, 72, 0.6)",
  );
  const borderColor = useColorModeValue(
    "rgba(0, 0, 0, 0.1)",
    "rgba(255, 255, 255, 0.1)",
  );

  useEffect(() => {
    const loadImages = async () => {
      try {
        const imagePromises = projetos.projetos.map((item) =>
          import(`../img/${item.img}`).catch(() => null),
        );
        const images = await Promise.all(imagePromises);
        setImageSrcs(images.map((image) => image?.default ?? ""));
      } catch (error) {
        console.error("Error loading images", error);
      }
    };
    loadImages();
  }, []);

  return (
    <Flex
      id="projetos"
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
        blob2Color={{ light: "blue.200", dark: "blue.400" }}
        blob1Position={{ top: "20%", right: "-120px" }}
        blob2Position={{ bottom: "23%", left: "-100px" }}
        showGrid={true}
        dotOpacity={{ light: 0.2, dark: 0.08 }}
      />

      {/* Conteúdo principal */}
      <Flex
        w="100%"
        maxW="1400px"
        direction="column"
        gap={theme.values.gap}
        zIndex={1}
      >
        <Flex w="100%" align="center" justify="center">
          <Text
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="bold"
            textAlign="center"
          >
            {language === "pt" ? projetos.title.pt : projetos.title.en}
          </Text>
        </Flex>

        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={8}
          justifyItems="center"
          alignItems="stretch"
        >
          {projetos.projetos.map((item, index) => (
            <LiquidCursorInteractive
              key={index}
              offsetX={5}
              offsetY={-8}
              style={{
                borderRadius: "32px",
                display: "flex",
                height: "100%",
                width: "100%",
              }}
              ringPadding={25}
            >
              <Card
                w="100%"
                h="100%"
                bg={cardBg}
                backdropFilter="blur(12px)"
                borderRadius="32px"
                border={`1px solid ${borderColor}`}
                boxShadow="0 8px 20px rgba(0,0,0,0.1)"
                transition="all 0.3s ease"
                _hover={{
                  transform: "translateY(-8px)",
                  boxShadow: "0 20px 30px rgba(0,0,0,0.15)",
                }}
                overflow="hidden"
              >
                <CardHeader p={0}>
                  <Image
                    src={imageSrcs[index] || ""}
                    alt={language === "pt" ? item.titulo.pt : item.titulo.en}
                    objectFit="cover"
                    w="100%"
                    h={{ base: "200px", md: "220px" }}
                    transition="transform 0.4s ease"
                    _hover={{ transform: "scale(1.02)" }}
                    loading="lazy"
                    fallbackSrc="https://via.placeholder.com/400x200?text=Imagem+não+encontrada"
                  />
                </CardHeader>

                <CardBody>
                  <Stack spacing={3}>
                    <Text fontSize="xl" fontWeight="bold" lineHeight="1.2">
                      {language === "pt" ? item.titulo.pt : item.titulo.en}
                    </Text>
                    <Text fontSize="sm" color={textDec} opacity={0.8}>
                      {language === "pt"
                        ? item.descricao.pt
                        : item.descricao.en}
                    </Text>
                    <Flex gap={2} flexWrap="wrap" mt={2}>
                      {item.tec?.split(",").map((tech, i) => (
                        <Box
                          key={i}
                          bg="purple.500"
                          color="white"
                          px={3}
                          py={1}
                          borderRadius="full"
                          fontSize="xs"
                          fontWeight="medium"
                        >
                          {tech.trim()}
                        </Box>
                      ))}
                    </Flex>
                  </Stack>
                </CardBody>
              </Card>
            </LiquidCursorInteractive>
          ))}
        </Grid>
      </Flex>
    </Flex>
  );
};

export default Projetos;
