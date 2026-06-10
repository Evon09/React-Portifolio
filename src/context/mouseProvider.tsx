// contexts/MouseContext.tsx
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

export interface InteractiveElement {
  element: Element;
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
  borderRadius: number;
  offsetX: number;
  offsetY: number;
  ringPadding?: number;
}

interface MouseContextType {
  mouseZIndex: number;
  setZIndex: (zindex: number) => void;
  language: string;
  setLanguage: (language: string) => void;
  registerInteractiveElement: (
    el: Element,
    offsetX?: number,
    offsetY?: number,
    ringPadding?: number,
  ) => () => void;
  getInteractiveElements: () => InteractiveElement[];
}

const MouseContext = createContext<MouseContextType | null>(null);

export const MouseProvider = ({ children }: PropsWithChildren<{}>) => {
  const [mouseZIndex, setMouseZIndex] = useState<number>(10);
  const [language, setLanguage] = useState<string>(() => {
    return localStorage.getItem("language") || "pt";
  });

  // Map para armazenar cada elemento com seus offsets
  const interactiveElementsMap = useRef<
    Map<Element, { offsetX: number; offsetY: number; ringPadding?: number }>
  >(new Map());

  const setZIndex = (zindex: number) => setMouseZIndex(zindex);

  const registerInteractiveElement = useCallback(
    (el: Element, offsetX = 0, offsetY = 0, ringPadding?: number) => {
      interactiveElementsMap.current.set(el, { offsetX, offsetY, ringPadding });
      return () => interactiveElementsMap.current.delete(el);
    },
    [],
  );

  const getInteractiveElements = useCallback(() => {
    const elements: InteractiveElement[] = [];
    interactiveElementsMap.current.forEach((offsets, el) => {
      const { offsetX, offsetY, ringPadding } = offsets;
      const rect = el.getBoundingClientRect();

      // Obtém o border-radius computado
      const computedStyle = window.getComputedStyle(el);
      let borderRadius = 0;
      const borderRadiusStr = computedStyle.borderRadius;
      if (borderRadiusStr && borderRadiusStr !== "0px") {
        const match = borderRadiusStr.match(/(\d+(?:\.\d+)?)px/);
        if (match) borderRadius = parseFloat(match[1]);
      }

      elements.push({
        element: el,
        left: rect.left + offsetX,
        top: rect.top + offsetY,
        right: rect.right + offsetX,
        bottom: rect.bottom + offsetY,
        width: rect.width,
        height: rect.height,
        centerX: (rect.left + rect.right) / 2 + offsetX,
        centerY: (rect.top + rect.bottom) / 2 + offsetY,
        borderRadius,
        offsetX,
        offsetY,
        ringPadding: ringPadding,
      });
    });
    return elements;
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <MouseContext.Provider
      value={{
        mouseZIndex,
        setZIndex,
        language,
        setLanguage,
        registerInteractiveElement,
        getInteractiveElements,
      }}
    >
      {children}
    </MouseContext.Provider>
  );
};

export const useMouse = () => {
  const context = useContext(MouseContext);
  if (!context) {
    throw new Error("useMouse must be used within a MouseProvider");
  }
  return context;
};
