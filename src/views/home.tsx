import { Flex, useColorModeValue } from "@chakra-ui/react";
import theme from "../styles/const";
import "../styles/animation.css";
import Header from "../componentes/header";
import About from "../componentes/about";
import Experiencia from "../componentes/experiencia";
import Tecnologia from "../componentes/tecnologia";
import Projetos from "../componentes/projetos";
import Contato from "../componentes/contato";
import { useEffect } from "react";
import { useMouse } from "../context/mouseProvider";
import { useParams } from "react-router-dom";
import LiquidCursor from "../componentes/LiquidCursor";
import Footer from "../componentes/footer";

const Home = () => {
  const bg = useColorModeValue("gray.100", "gray.900");
  const { lang } = useParams();
  const { setLanguage, language } = useMouse();

  useEffect(() => {
    setLanguage(lang === "pt" || lang === "en" ? lang : "pt");
  }, [lang]);

  return (
    <Flex
      w="100%"
      minH="100vh"
      direction={"column"}
      style={{
        padding: 0,
        margin: 0,
        boxSizing: "border-box",
      }}
      className="font"
    >
      <LiquidCursor />
      <Header />
      <About />
      <Experiencia />
      <Tecnologia />
      <Projetos />
      <Contato />
      <Footer />
    </Flex>
  );
};

export default Home;
