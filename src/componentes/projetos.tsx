import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import theme from "../styles/const";
import projetos from "./../json/projetos.json";
import { useMouse } from "../context/mouseProvider";

interface card {
  img: string;
  decricao: string;
  descricao: string;
}

const Projetos = () => {
  const { language } = useMouse();
  const [imageSrcs, setImageSrcs] = useState<string[]>([]);
  const text = useColorModeValue(
    theme.colors.light.textPrimary,
    theme.colors.dark.textPrimary
  );
  const textDec = useColorModeValue(
    theme.colors.light.textSecondary,
    theme.colors.dark.textSecondary
  );
  const bg = useColorModeValue(
    theme.colors.light.background,
    theme.colors.dark.background
  );

  useEffect(() => {
    // Carregar as imagens dinamicamente
    const loadImages = async () => {
      try {
        const imagePromises = projetos.projetos.map((item) =>
          import(`../img/${item.img}`).catch((err) => {
            console.error(`Error loading image: ${item.img}`, err);
            return null; // Retorna null se a imagem não for encontrada
          })
        );
        const images = await Promise.all(imagePromises);
        setImageSrcs(images.map((image) => image?.default ?? "")); // Certifique-se de que as imagens estão sendo resolvidas corretamente
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
      minH={`calc(90vh - ${theme.values.headerHegit})`}
      px={theme.values.px}
      //   py={theme.values.py}
      gap={theme.values.gap}
      direction={"column"}
    >
      <Flex w={"100%"} align={"center"} justify={"center"} py={theme.values.py}>
        <Text fontSize={"50px"} color={text}>
          {language === "pt" ? projetos.title.pt : projetos.title.en}
        </Text>
      </Flex>

      <Flex
        w={"100%"}
        gap={theme.values.gap}
        flexWrap={"wrap"}
        alignSelf={"center"}
        justify={"space-evenly"}
      >
        {projetos.projetos.map((item, index: number) => (
          <Box
            maxW={{ base: "100%", md: "350px" }} // Card será 100% da largura no mobile, e 350px em telas maiores
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            _hover={{ boxShadow: "lg" }} // Sombra ao passar o mouse
            transition="all 0.3s"
            paddingTop={2}
            bg={bg}
          >
            {/* Imagem do Card */}
            <Image
              src={imageSrcs[index] || "../img/file.jpg"} // Substitua pela URL da sua imagem
              alt="Descrição da Imagem"
              objectFit="contain"
              w="100%"
              h={{ base: "250px", md: "200px" }} // Altura responsiva da imagem
            />

            {/* Conteúdo do Card */}
            <Stack p="6">
              <Text fontWeight="bold" fontSize="xl">
                {language === "pt" ? item.titulo.pt : item.titulo.en}
              </Text>

              <Text fontSize="md" color={textDec}>
                {language === "pt" ? item.descricao.pt : item.descricao.en}
              </Text>
              <Text>{item.tec}</Text>
            </Stack>
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

export default Projetos;
