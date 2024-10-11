import React, { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import "./../styles/const";
import theme from "./../styles/const";
import "./../styles/style.css";
import { useMouse } from "../context/mouseProvider";
import { useColorModeValue } from "@chakra-ui/react";

const Mouse = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mouseState, setMouseState] = useState("up");
  const mouseRef = useRef<HTMLDivElement>(null);
  const { mouseZIndex } = useMouse();
  const bg = useColorModeValue("white", "#1A202C");
  const border = useColorModeValue("#1A202C", "white");

  const isMobileDevice = () => {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };
  console.log(bg);

  const variants = {
    default: {
      x: mousePosition.x - theme.values.cursor / 2,
      y: mousePosition.y - theme.values.cursor / 2,
    },
    up: {
      x: mousePosition.x - (theme.values.cursor * 4) / 2,
      y: mousePosition.y - (theme.values.cursor * 4) / 2,
    },
    down: {
      width: `${theme.values.cursor}px`,
      height: `${theme.values.cursor}px`,
      border: `solid 2px ${bg}`,

      x: mousePosition.x - theme.values.cursor / 2,
      y: mousePosition.y - theme.values.cursor / 2,
    },
  };

  useLayoutEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Atualiza a posição do elemento referenciado
      if (mouseRef.current) {
        mouseRef.current.style.top = `${e.clientY}px`;
        mouseRef.current.style.left = `${e.clientX}px`;
      }
    };

    const mouseDown = () => {
      if (mouseRef.current) {
        mouseRef.current.style.width = `${theme.values.cursor * 4}px`;
        mouseRef.current.style.height = `${theme.values.cursor * 4}px`;
      }
      setMouseState("down");
    };

    const mouseUp = () => {
      if (mouseRef.current) {
        mouseRef.current.style.width = `${theme.values.cursor}px`;
        mouseRef.current.style.height = `${theme.values.cursor}px`;
      }
      setMouseState("up");
    };

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mouseup", mouseUp);
    };
  }, []);

  return (
    <>
      {isMobileDevice() ? (
        <></>
      ) : (
        <>
          <div
            style={{
              top: 0,
              left: 0,
              backgroundColor: border,
              transform: "translate(-50%, -50%)",
              width: `${theme.values.cursor}px`,
              height: `${theme.values.cursor}px`,
              position: "fixed",
              borderRadius: "50%",
              zIndex: mouseZIndex,
              transition: "width 0.2s, height 0.2s", // Transições mais rápidas para clique
              pointerEvents: "none",
            }}
            ref={mouseRef}
            className="mouse"
          />

          <motion.div
            className="mouse"
            style={{
              width: `${theme.values.cursor * 4}px`,
              height: `${theme.values.cursor * 4}px`,
              position: "fixed",
              borderRadius: "50%",
              border: "solid 2px",
              borderColor: border,
              zIndex: mouseZIndex,
              pointerEvents: "none",
            }}
            variants={variants}
            animate={mouseState} // Anima com base no estado do mouse (up ou down)
            transition={{ type: "spring", stiffness: 300, damping: 20 }} // Suave e realista
          />
        </>
      )}
    </>
  );
};

export default Mouse;
