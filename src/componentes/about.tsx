import { Flex, Image, Text, Box, useColorModeValue } from "@chakra-ui/react";
import theme from "../styles/const";
import sobre from "../json/sobre.json";
import foto from "../img/file.jpg";
import { useMouse } from "../context/mouseProvider";
import { BackgroundLiquidPoints } from "./shaders/BackgroundLiquidPoints";
import { LiquidCursorInteractive } from "./mouse";

const About = () => {
  const bg = useColorModeValue(
    theme.colors.light.background,
    theme.colors.dark.background,
  );

  const text = useColorModeValue(
    theme.colors.light.textPrimary,
    theme.colors.dark.textPrimary,
  );

  const { language } = useMouse();

  return (
    <Flex
      id="about"
      w="100%"
      minH="100vh"
      position="relative"
      overflow="hidden"
      bg={bg}
      color={text}
      align="center"
      justify="center"
      px={theme.values.px}
    >
      <BackgroundLiquidPoints
        blob1Color="pink.400"
        blob2Color="orange.400"
        blob1Position={{ top: "-50%", left: "-20%" }}
        blob2Position={{ bottom: "20%", right: "-10%" }}
        showGrid={true}
        dotOpacity={{ light: 0.2, dark: 0.08 }}
      />

      {/* ===== CONTEÚDO ===== */}
      <Flex
        w="100%"
        maxW="1200px"
        align="center"
        justify="space-between"
        direction={{ base: "column", md: "row" }}
        gap="60px"
        zIndex={1}
      >
        {/* IMAGE SIDE */}
        <Flex flex={1} justify="center">
          <Box
            position="relative"
            _before={{
              content: '""',
              position: "absolute",
              inset: "-10px",
              bg: "linear-gradient(135deg, #7f5af0, #2cb67d)",
              filter: "blur(30px)",
              borderRadius: "30px",
              opacity: 0.4,
            }}
          >
            <LiquidCursorInteractive
         
              offsetX={5}
              ringPadding={20}
              style={{
                display: "inline-flex", // ajusta à largura do conteúdo
                margin: 0,
                padding: 0,
                borderRadius: "20px", // mesmo valor
              }}
            >
              <Image
                src={foto}
                alt="Foto"
                objectFit="cover"
                w={{ base: "220px", md: "320px" }}
                h={{ base: "220px", md: "320px" }}
                borderRadius="20px"
                position="relative"
              />
            </LiquidCursorInteractive>
          </Box>
        </Flex>

        {/* TEXT SIDE */}
        <Flex flex={1} direction="column" gap="20px">
          <Text fontSize={{ base: "lg", md: "xl" }} lineHeight="1.5">
            {language === "pt" ? sobre.pt.pt1 : sobre.en.pt1}
          </Text>

          <Text
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="bold"
            lineHeight="1.1"
          >
            Jair José Sequeira
          </Text>

          <Text fontSize={{ base: "md", md: "lg" }} opacity={0.8}>
            {language === "pt" ? sobre.pt.pt2 : sobre.en.pt2}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default About;
