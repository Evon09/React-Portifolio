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
  SiPostgresql,
  SiMysql,
  SiNextDotJs,
  SiGraphql,
  SiTailwindcss,
  SiElixir,
} from "react-icons/si";

// Dicionário para mapear strings para ícones
const iconMap: Record<string, IconType> = {
  HTML: FaHtml5,
  CSS: FaCss3Alt,
  JavaScript: FaJs,
  TypeScript: SiTypescript,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  Flutter: SiFlutter,
  Dart: SiDart,
  React: FaReact,
  "React Native": FaReact,
  NextJS: SiNextDotJs,
  Firebase: SiFirebase,
  NodeJS: SiNodeDotJs,
  NestJS: SiNodeDotJs,
  GraphQL: SiGraphql,
  TailwindCSS: SiTailwindcss,
  Elixir: SiElixir,
  Phoenix: SiElixir,
  "Chakra UI": FaBolt,
};

interface IconProps {
  name: keyof typeof iconMap;
  size?: number;
  color?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 24, color = "black" }) => {
  const IconComponent = iconMap[name] || FaQuestionCircle; // Ícone de fallback
  return <IconComponent size={size} color={color} />;
};

export default Icon;
