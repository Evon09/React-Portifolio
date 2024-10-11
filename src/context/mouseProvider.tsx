import {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

// Definindo o tipo para o contexto
interface MouseContextType {
  mouseZIndex: number;
  setZIndex: (zindex: number) => void;
  language: string; // Adicionando o estado de linguagem
  setLanguage: (language: string) => void; // Método para alterar o idioma
}

// Cria o contexto
const MouseContext = createContext<MouseContextType | null>(null);

// Cria o provider
export const MouseProvider = ({ children }: PropsWithChildren<{}>) => {
  const [mouseZIndex, setMouseZIndex] = useState<number>(10);
  const [language, setLanguage] = useState<string>(() => {
    // Recupera a linguagem do localStorage ou define uma padrão
    return localStorage.getItem("language") || "pt";
  });

  const setZIndex = (zindex: number) => setMouseZIndex(zindex);

  // Efeito para atualizar o localStorage quando a linguagem mudar
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <MouseContext.Provider
      value={{ mouseZIndex, setZIndex, language, setLanguage }}
    >
      {children}
    </MouseContext.Provider>
  );
};

// Hook para usar o contexto
export const useMouse = () => {
  const context = useContext(MouseContext);
  if (!context) {
    throw new Error("useMouse must be used within a MouseProvider");
  }
  return context;
};
