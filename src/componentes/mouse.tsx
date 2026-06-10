import React, { useRef, useEffect } from "react";
import { useMouse } from "../context/mouseProvider";

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  offsetX?: number;
  offsetY?: number;
  ringPadding?: number;
}

export const LiquidCursorInteractive: React.FC<Props> = ({
  children,
  className,
  style,
  offsetX = 0,
  offsetY = 0,
  ringPadding,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { registerInteractiveElement } = useMouse();

  useEffect(() => {
    if (!ref.current) return;
    return registerInteractiveElement(
      ref.current,
      offsetX,
      offsetY,
      ringPadding,
    );
  }, [registerInteractiveElement, offsetX, offsetY, ringPadding]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
};
