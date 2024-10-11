import { ChakraProvider } from "@chakra-ui/react";
import Home from "./views/home";
import theme from "./styles/const";
import { MouseProvider } from "./context/mouseProvider";
import "../src/styles/scrollStyle.css";
import "./styles/global.css";

export const App = () => (
  <ChakraProvider theme={theme}>
    <MouseProvider>
      <Home></Home>
    </MouseProvider>
  </ChakraProvider>
);
