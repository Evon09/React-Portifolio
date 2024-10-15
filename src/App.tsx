import { ChakraProvider } from "@chakra-ui/react";
import Home from "./views/home";
import theme from "./styles/const";
import { MouseProvider } from "./context/mouseProvider";
import "../src/styles/scrollStyle.css";
import "./styles/global.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";

export const App = () => (
  <ChakraProvider theme={theme}>
    <MouseProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/:lang" element={<Home />} />{" "}
          {/* Use 'element' com JSX */}
          <Route path="/" element={<Home />} /> {/* Use 'element' com JSX */}
        </Routes>
      </BrowserRouter>
    </MouseProvider>
  </ChakraProvider>
);
