import { ChakraProvider } from "@chakra-ui/react";
import Home from "./views/home";
import theme from "./styles/const";
import { MouseProvider } from "./context/mouseProvider";
import "../src/styles/scrollStyle.css";
import "./styles/global.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";

export const App = () => (
  <ChakraProvider theme={theme}>
    <SpeedInsights />
    <MouseProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/:lang" element={<Home />} />{" "}
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </MouseProvider>
  </ChakraProvider>
);
