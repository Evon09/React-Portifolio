import React from "react";
import { IconType } from "react-icons";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaQuestionCircle,
  FaBolt,
} from "react-icons/fa";
import {
  SiTypescript,
  SiMongodb,
  SiFlutter,
  SiDart,
  SiFirebase,
  Si1Password,
  SiNodeDotJs,
} from "react-icons/si";

// Dicionário para mapear strings para ícones
const iconMap: Record<string, IconType> = {
  HTML: FaHtml5,
  CSS: FaCss3Alt,
  JavaScript: FaJs,
  TypeScript: SiTypescript,
  MongoDB: SiMongodb,
  Flutter: SiFlutter,
  Dart: SiDart,
  React: FaReact,
  ReactNative: FaReact, // Mesmo ícone que React, mas você pode customizar se quiser
  Firebase: SiFirebase,
  "Node.js": SiNodeDotJs,
  "Chakra Ui": FaBolt,
};

interface IconProps {
  name: keyof typeof iconMap; // O nome deve ser uma chave válida do dicionário
  size?: number;
  color?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 24, color = "black" }) => {
  const IconComponent = iconMap[name] || FaQuestionCircle; // Ícone de fallback
  return <IconComponent size={size} color={color} />;
};

export default Icon;
