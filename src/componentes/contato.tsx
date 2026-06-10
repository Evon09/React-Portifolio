import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
  Box,
} from "@chakra-ui/react";
import React from "react";
import theme from "../styles/const";
import { useMouse } from "../context/mouseProvider";
import contato from "../json/contato.json";
import { BackgroundLiquidPoints } from "./shaders/BackgroundLiquidPoints";
import { LiquidCursorInteractive } from "./mouse";


const Contato = () => {
  const link = "https://formsubmit.co/c7e5737b197bf307a081f5e7dd89ec26";
  const { language } = useMouse();

  const bg = useColorModeValue(
    theme.colors.light.background,
    theme.colors.dark.background,
  );
  const text = useColorModeValue(
    theme.colors.light.textPrimary,
    theme.colors.dark.textPrimary,
  );
  const secondary = useColorModeValue(
    theme.colors.light.secondary,
    theme.colors.dark.secondary,
  );
  const cardBg = useColorModeValue(
    "rgba(255, 255, 255, 0.6)",
    "rgba(45, 55, 72, 0.6)",
  );
  const borderColor = useColorModeValue(
    "rgba(0, 0, 0, 0.1)",
    "rgba(255, 255, 255, 0.1)",
  );

  return (
    <Flex
      id="contato"
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
        blob1Color={{ light: "purple.200", dark: "purple.400" }}
        blob2Color={{ light: "blue.200", dark: "blue.400" }}
        blob1Position={{ top: "30%", right: "-100px" }}
        blob2Position={{ bottom: "40%", left: "-120px" }}
        showGrid
        dotOpacity={{ light: 0.2, dark: 0.08 }}
      />

      <Flex
        w="100%"
        maxW="1200px"
        direction="column"
        gap={theme.values.gap}
        zIndex={1}
      >
        <Flex w="100%" align="center" justify="center">
          <Text fontSize={{ base: "3xl", md: "5xl" }} fontWeight="bold">
            {language === "pt" ? contato.title.pt : contato.title.en}
          </Text>
        </Flex>

        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={8}
          w="100%"
          align="stretch"
        >
          {/* Coluna de informações */}
          <Flex
            flex={1}
            direction="column"
            gap={6}
            p={6}
            bg={cardBg}
            backdropFilter="blur(12px)"
            borderRadius="32px"
            border={`1px solid ${borderColor}`}
            boxShadow="0 8px 20px rgba(0,0,0,0.1)"
          >
            <Text fontSize="2xl" fontWeight="semibold" textAlign="center">
              {language === "pt" ? "Informações" : "Information"}
            </Text>

            <Flex direction="column" gap={4}>
              {/* Email */}
              <Flex align="center" gap={3} flexWrap="wrap">
                <Text fontWeight="bold" minW="80px">
                  {contato.email.label}:
                </Text>
                <Text>{contato.email.address}</Text>
              </Flex>

              {/* LinkedIn */}
              <Flex align="center" gap={3} flexWrap="wrap">
                <Text fontWeight="bold" minW="80px">
                  {contato.linkedin.label}:
                </Text>
                <Text textDecoration="underline">
                  <a
                    href={contato.linkedin.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {contato.linkedin.username}
                  </a>
                </Text>
              </Flex>

              {/* GitHub */}
              <Flex align="center" gap={3} flexWrap="wrap">
                <Text fontWeight="bold" minW="80px">
                  {contato.github.label}:
                </Text>
                <Text textDecoration="underline">
                  <a
                    href={contato.github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {contato.github.username}
                  </a>
                </Text>
              </Flex>

              {/* Telefones */}
              <Flex align="flex-start" gap={3} flexWrap="wrap">
                <Text fontWeight="bold" minW="80px">
                  {language === "pt" ? "Telefone" : "Phone"}:
                </Text>
                <Flex direction="column">
                  {contato.phones.map((phone, idx) => (
                    <Text key={idx}>
                      {phone.label}: {phone.number}
                    </Text>
                  ))}
                </Flex>
              </Flex>
            </Flex>
          </Flex>

          {/* Formulário */}
          <LiquidCursorInteractive
          offsetX={7}
            style={{
              flex: 2,
              borderRadius: "32px",
            }}
            ringPadding={12}
          >
            <Flex
              p={6}
              bg={cardBg}
              backdropFilter="blur(12px)"
              borderRadius="32px"
              border={`1px solid ${borderColor}`}
              boxShadow="0 8px 20px rgba(0,0,0,0.1)"
              w="100%"
            >
              <form action={link} method="POST" style={{ width: "100%" }}>
                <VStack spacing={5}>
                  <FormControl>
                    <FormLabel>
                      {language === "pt"
                        ? contato.form.nome.title.pt
                        : contato.form.nome.title.en}
                    </FormLabel>
                    <Input
                      type="text"
                      name="name"
                      placeholder={
                        language === "pt"
                          ? contato.form.nome.input.pt
                          : contato.form.nome.input.en
                      }
                      variant="filled"
                      required
                      bg={secondary}
                      _hover={{ bg: secondary }}
                      _focus={{ bg: secondary, borderColor: "purple.400" }}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>
                      {language === "pt"
                        ? contato.form.email.title.pt
                        : contato.form.email.title.en}
                    </FormLabel>
                    <Input
                      type="email"
                      name="email"
                      placeholder={
                        language === "pt"
                          ? contato.form.email.input.pt
                          : contato.form.email.input.en
                      }
                      variant="filled"
                      required
                      bg={secondary}
                      _hover={{ bg: secondary }}
                      _focus={{ bg: secondary, borderColor: "purple.400" }}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>
                      {language === "pt"
                        ? contato.form.mensagem.title.pt
                        : contato.form.mensagem.title.en}
                    </FormLabel>
                    <Textarea
                      name="message"
                      placeholder={
                        language === "pt"
                          ? contato.form.mensagem.input.pt
                          : contato.form.mensagem.input.en
                      }
                      variant="filled"
                      required
                      h="25vh"
                      bg={secondary}
                      _hover={{ bg: secondary }}
                      _focus={{ bg: secondary, borderColor: "purple.400" }}
                    />
                  </FormControl>

                  <Input type="hidden" name="_captcha" value="false" />
                  <Input
                    type="hidden"
                    name="_autoresponse"
                    value="Obrigado por entrar em contato!"
                  />

                  <Button
                    type="submit"
                    bg="purple.500"
                    color="white"
                    w="100%"
                    _hover={{ bg: "purple.600", transform: "translateY(-2px)" }}
                    transition="all 0.2s"
                    size="lg"
                  >
                    {language === "pt"
                      ? contato.form.enviar.pt
                      : contato.form.enviar.en}
                  </Button>
                </VStack>
              </form>
            </Flex>
          </LiquidCursorInteractive>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Contato;
