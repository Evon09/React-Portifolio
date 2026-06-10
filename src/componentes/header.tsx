// componentes/Header.tsx
import {
  Flex,
  Text,
  Switch,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  VStack,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import React from "react";

import theme from "../styles/const";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { useMouse } from "../context/mouseProvider";
import header from "../json/header.json";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";

const Header = () => {
  const { language, setLanguage } = useMouse();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const menuItems = [
    { id: "about", labelPt: header.sobre.pt, labelEn: header.sobre.en },
    {
      id: "experiencia",
      labelPt: header.experiencia.pt,
      labelEn: header.experiencia.en,
    },
    { id: "tec", labelPt: header.tec.pt, labelEn: header.tec.en },
    {
      id: "projetos",
      labelPt: header.projetos.pt,
      labelEn: header.projetos.en,
    },
    { id: "contato", labelPt: header.contato.pt, labelEn: header.contato.en },
  ];

  return (
    <>
      <Flex
        as="header"
        position="fixed"
        top={0}
        left={0}
        w="100%"
        h={theme.values.headerHegit}
        px={theme.values.px}
        align="center"
        justify="space-between"
        bg="rgba(0, 0, 0, 0.3)"
        backdropFilter="blur(12px)"
        borderBottom="1px solid rgba(255, 255, 255, 0.1)"
        zIndex={1000}
        transition="all 0.3s ease"
   
      >
        {/* Logo */}
        <Flex align="center">
          <Text
            fontSize={{ base: "24px", md: "32px" }}
            fontWeight="bold"
            bgGradient="linear(to-r, purple.400, blue.400)"
            bgClip="text"
          >
            Jair Jose
          </Text>
        </Flex>

        {/* Desktop Menu */}
        <Flex display={{ base: "none", md: "flex" }} align="center" gap={6}>
          {menuItems.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              <Text
                fontSize="md"
                fontWeight="medium"
                transition="color 0.2s"
                _hover={{ color: "purple.400" }}
              >
                {language === "pt" ? item.labelPt : item.labelEn}
              </Text>
            </a>
          ))}
        </Flex>

        {/* Right controls */}
        <Flex align="center" gap={4}>
          <ColorModeSwitcher />
          <Flex align="center" gap={2}>
            <Text fontSize="sm" fontWeight="medium">
              Pt
            </Text>
            <Switch
              size="md"
              isChecked={language === "en"}
              onChange={() => setLanguage(language === "pt" ? "en" : "pt")}
            />
            <Text fontSize="sm" fontWeight="medium">
              En
            </Text>
          </Flex>

          {/* Mobile menu button */}
          <IconButton
            display={{ base: "flex", md: "none" }}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            variant="ghost"
            aria-label="Menu"
            onClick={isOpen ? onClose : onOpen}
            colorScheme="whiteAlpha"
          />
        </Flex>
      </Flex>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
        <DrawerOverlay backdropFilter="blur(4px)" />
        <DrawerContent bg="rgba(0, 0, 0, 0.8)" backdropFilter="blur(12px)">
          <DrawerBody p={6}>
            <VStack spacing={6} align="stretch" mt={8}>
              {menuItems.map((item) => (
                <a key={item.id} href={`#${item.id}`} onClick={onClose}>
                  <Text
                    fontSize="xl"
                    fontWeight="medium"
                    _hover={{ color: "purple.400" }}
                  >
                    {language === "pt" ? item.labelPt : item.labelEn}
                  </Text>
                </a>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
