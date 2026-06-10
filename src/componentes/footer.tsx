// componentes/Footer.tsx
import { Flex, Text, Link, useColorModeValue, Box } from "@chakra-ui/react";
import React from "react";
import theme from "../styles/const";

const Footer = () => {
  const bg = useColorModeValue(
    "rgba(255, 255, 255, 0.7)",
    "rgba(26, 32, 44, 0.7)",
  );
  const borderColor = useColorModeValue(
    "rgba(0, 0, 0, 0.1)",
    "rgba(255, 255, 255, 0.1)",
  );
  const textColor = useColorModeValue("gray.700", "gray.300");
  const accentColor = useColorModeValue("purple.600", "purple.400");

  return (
    <Box
      as="footer"
      w="100%"
      h={theme.values.footerHegit}
      position="relative"
      mt="auto"
    >
      <Flex
        w="100%"
        h="100%"
        align="center"
        justify="space-between"
        direction={{ base: "column", sm: "row" }}
        px={theme.values.px}
        gap={4}
        bg={bg}
        backdropFilter="blur(12px)"
        borderTop={`1px solid ${borderColor}`}
        color={textColor}
        fontSize="sm"
      >
        {/* Copyright */}
        <Text>
          © {new Date().getFullYear()} Jair José Sequeira.
          {useColorModeValue(
            " Todos os direitos reservados.",
            " All rights reserved.",
          )}
        </Text>

        {/* Links rápidos */}
        <Flex gap={6}>
          <Link
            href="https://github.com/Evon09"
            isExternal
            _hover={{ color: accentColor, textDecoration: "none" }}
            transition="color 0.2s"
          >
            GitHub
          </Link>
          <Link
            href="www.linkedin.com/in/jair-jose-sequeira"
            isExternal
            _hover={{ color: accentColor, textDecoration: "none" }}
            transition="color 0.2s"
          >
            LinkedIn
          </Link>
          <Link
            href="#contato"
            _hover={{ color: accentColor, textDecoration: "none" }}
            transition="color 0.2s"
          >
            Contato
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
