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
import theme from "../styles/const";
import "../styles/animation.css";
import Mouse from "../componentes/mouse";
import Header from "../componentes/header";
import About from "../componentes/about";
import Experiencia from "../componentes/experiencia";
import Tecnologia from "../componentes/tecnologia";
import Projetos from "../componentes/projetos";
import Contato from "../componentes/contato";
import { useEffect } from "react";
import { useMouse } from "../context/mouseProvider";
import { useParams } from "react-router-dom";

const Home = () => {
  const bg = useColorModeValue("gray.100", "gray.900");
  const { lang } = useParams();
  const { setLanguage, language } = useMouse();
  useEffect(() => {
    setLanguage(lang === "pt" || lang === "en" ? lang : "pt");
    // console.log(lang);
    // console.log(language);
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
      cursor={"none"}
    >
      <Mouse></Mouse>

      {/* Header */}
      <Header></Header>

      {/* Primeira section */}
      <About></About>
      {/* Segunda section */}
      <Experiencia></Experiencia>
      {/* Tecnologias  */}

      <Tecnologia></Tecnologia>

      {/* Progetos */}

      <Projetos></Projetos>

      {/* Contato */}
      <Contato></Contato>

      {/* Footer */}
      <Flex
        w={"100%"}
        h={theme.values.footerHegit}
        bg={bg}
        align={"center"}
        justify={"center"}
      ></Flex>
    </Flex>
  );
};
export default Home;
