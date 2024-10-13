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
} from "@chakra-ui/react";
import React from "react";
import theme from "../styles/const";
import { useMouse } from "../context/mouseProvider";
import contato from "../json/contato.json";

const Contato = () => {
  var link = `https://formsubmit.co/el/yabalu`;
  const { language } = useMouse();
  const text = useColorModeValue(
    theme.colors.light.textPrimary,
    theme.colors.dark.textPrimary
  );
  const secondary = useColorModeValue(
    theme.colors.light.secondary,
    theme.colors.dark.secondary
  );
  const bg = useColorModeValue(
    theme.colors.light.background,
    theme.colors.dark.background
  );

  return (
    <>
      <Flex
        id="contato"
        w="100%"
        minH={`calc(90vh - ${theme.values.headerHegit})`}
        px={theme.values.px}
        gap={theme.values.gap}
        direction={"column"}
        paddingBottom={theme.values.py}
        color={text}
        bg={bg}
      >
        <Flex
          w={"100%"}
          align={"center"}
          justify={"center"}
          py={theme.values.py}
        >
          <Text fontSize={"50px"}>
            {language === "pt" ? contato.title.pt : contato.title.en}
          </Text>
        </Flex>
        <Flex
          direction={{ base: "column", sm: "column", md: "row" }}
          gap={theme.values.gap}
          w={"100%"}
        >
          <Flex
            w={{ base: "100%", sm: "100%", md: "30%" }}
            direction={"column"}
            justify={"space-evenly"}
          >
            <Flex gap={3}>
              <Text>Email:</Text>
              <Text>jairjsequeira@gmail.com</Text>
            </Flex>
            <Flex gap={3}>
              <Text>Linkedin:</Text>
              <Text textDecoration={"underline"}>
                <a href="https://www.linkedin.com/in/jair-jos%C3%A9-sequeira/">
                  Jair José Sequeira
                </a>
              </Text>
            </Flex>
            <Flex direction={"row"} gap={3}>
              <Text>Github:</Text>
              <Text textDecoration={"underline"}>
                <a href="https://github.com/Evon09">Evon09</a>
              </Text>
            </Flex>
            <Flex direction={"row"} gap={3}>
              <Text>
                {language === "pt" ? contato.numero.pt : contato.numero.en}:
              </Text>
              <Flex direction={"column"}>
                <Text>+351 913 042 913</Text>
                <Text>+55 (66) 99669-1566</Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex w={{ base: "100%", sm: "100%", md: "70%" }}>
            <form action={link} method="POST" style={{ width: "100%" }}>
              <VStack w="100%" spacing="4">
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
                  />
                </FormControl>

                <FormControl>
                  <Input type="hidden" name="_captcha" value="false" />
                </FormControl>

                <FormControl>
                  <Input
                    type="hidden"
                    name="_autoresponse"
                    value="Obrigado por entrar em contato!"
                  />
                </FormControl>

                <Button
                  bg={secondary}
                  type="submit"
                  colorScheme="teal"
                  w="100%"
                >
                  {language === "pt"
                    ? contato.form.enviar.pt
                    : contato.form.enviar.en}
                </Button>
              </VStack>
            </form>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Contato;
