// components/LiquidCursor.tsx
import React, { useRef, useEffect, useCallback, useState } from "react";
import { useColorModeValue } from "@chakra-ui/react";
import { InteractiveElement, useMouse } from "../context/mouseProvider";

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
}

type CardRect = InteractiveElement;

const LiquidCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const cardsRef = useRef<CardRect[]>([]);
  const ringPointsRef = useRef<Point[]>([]);
  const lockedOutlineRef = useRef<Point[]>([]);
  const cursorRef = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const isInsideCardRef = useRef(false);
  const lockedCardRef = useRef<CardRect | null>(null);

  const { getInteractiveElements } = useMouse();

  const normalRingColor = useColorModeValue("#1a1a1a", "#ffffff");
  const invertedRingColor = useColorModeValue("#ffffff", "#1a1a1a");

  const BASE_RADIUS = 15;
  const INFLUENCE_DIST = 2;
  const SUCTION_STRENGTH = 0.38;
  const STRETCH_FACTOR = 0.52;
  const RING_STIFF = 0.105;
  const RING_DAMP = 0.73;
  const POINTS_COUNT = 110;

  // Estado para mobile (largura <= 768px)
  const [isMobile, setIsMobile] = useState(false);

  // Animação de clique (só ativa fora dos cards)
  const clickProgress = useRef(0);
  const clickDirection = useRef(1);
  const clickActive = useRef(false);
  const clickStartTime = useRef(0);

  // Detecção de mobile via matchMedia
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.matchMedia("(max-width: 768px)").matches;
      setIsMobile(mobile);
      if (mobile) {
        document.body.style.cursor = "auto";
      } else {
        document.body.style.cursor = "none";
      }
    };
    checkMobile();
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handler = (e: MediaQueryListEvent) => checkMobile();
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const handleMouseDown = () => {
      if (!isInsideCardRef.current) {
        if (clickActive.current) return;
        clickActive.current = true;
        clickDirection.current = 1;
        clickStartTime.current = performance.now();
        clickProgress.current = 0;
      }
    };
    const handleMouseUp = () => {
      if (!clickActive.current) return;
      clickDirection.current = -1;
      clickStartTime.current = performance.now();
    };
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const updateClickProgress = useCallback((now: number) => {
    if (!clickActive.current) return 0;
    const duration = 200;
    const elapsed = now - clickStartTime.current;
    let t = 0;
    if (clickDirection.current === 1) {
      t = Math.min(1, elapsed / duration);
      if (t >= 1) t = 1;
    } else {
      t = Math.max(0, 1 - elapsed / duration);
      if (t <= 0) {
        clickActive.current = false;
        t = 0;
      }
    }
    clickProgress.current = t;
    return t;
  }, []);

  // ========== FUNÇÕES GEOMÉTRICAS ==========
  const getRoundedRectPerimeter = useCallback(
    (card: CardRect, t: number, offset: number, borderRadius: number) => {
      const left = card.left - offset;
      const top = card.top - offset;
      const right = card.right + offset;
      const bottom = card.bottom + offset;
      let r = Math.min(
        borderRadius + offset,
        (right - left) / 2,
        (bottom - top) / 2,
      );
      if (r < 0) r = 0;
      const sideW = right - left - 2 * r;
      const sideH = bottom - top - 2 * r;
      const arcLen = (Math.PI / 2) * r;
      const totalLen = 2 * sideW + 2 * sideH + 4 * arcLen;
      let len = t * totalLen;
      const leftX = left + r;
      const rightX = right - r;
      const topY = top + r;
      const bottomY = bottom - r;

      if (len <= sideW) return { x: leftX + len, y: top };
      len -= sideW;
      if (len <= arcLen) {
        const ang = Math.PI * 1.5 + (len / arcLen) * (Math.PI / 2);
        return { x: rightX + r * Math.cos(ang), y: topY + r * Math.sin(ang) };
      }
      len -= arcLen;
      if (len <= sideH) return { x: right, y: topY + len };
      len -= sideH;
      if (len <= arcLen) {
        const ang = 0 + (len / arcLen) * (Math.PI / 2);
        return {
          x: rightX + r * Math.cos(ang),
          y: bottomY + r * Math.sin(ang),
        };
      }
      len -= arcLen;
      if (len <= sideW) return { x: rightX - len, y: bottom };
      len -= sideW;
      if (len <= arcLen) {
        const ang = Math.PI / 2 + (len / arcLen) * (Math.PI / 2);
        return { x: leftX + r * Math.cos(ang), y: bottomY + r * Math.sin(ang) };
      }
      len -= arcLen;
      if (len <= sideH) return { x: left, y: bottomY - len };
      len -= sideH;
      const ang = Math.PI + (len / arcLen) * (Math.PI / 2);
      return { x: leftX + r * Math.cos(ang), y: topY + r * Math.sin(ang) };
    },
    [],
  );

  const isPointInsideCard = useCallback(
    (px: number, py: number, card: CardRect, borderRadius: number) => {
      if (
        px < card.left ||
        px > card.right ||
        py < card.top ||
        py > card.bottom
      )
        return false;
      const r = Math.min(
        borderRadius,
        (card.right - card.left) / 2,
        (card.bottom - card.top) / 2,
      );
      const leftArc = card.left + r;
      const rightArc = card.right - r;
      const topArc = card.top + r;
      const bottomArc = card.bottom - r;
      if (px >= leftArc && px <= rightArc && py >= topArc && py <= bottomArc)
        return true;
      if (px < leftArc && py < topArc)
        return Math.hypot(px - leftArc, py - topArc) <= r;
      if (px > rightArc && py < topArc)
        return Math.hypot(px - rightArc, py - topArc) <= r;
      if (px < leftArc && py > bottomArc)
        return Math.hypot(px - leftArc, py - bottomArc) <= r;
      if (px > rightArc && py > bottomArc)
        return Math.hypot(px - rightArc, py - bottomArc) <= r;
      return true;
    },
    [],
  );

  const updateCardsGeometry = useCallback(() => {
    cardsRef.current = getInteractiveElements();
  }, [getInteractiveElements]);

  const computeCardOutline = useCallback(
    (card: CardRect, borderRadius: number, ringPadding: number = 6) => {
      const outline: Point[] = [];
      for (let i = 0; i < POINTS_COUNT; i++) {
        const angle = (i / POINTS_COUNT) * Math.PI * 2;
        const pt = getRoundedRectPerimeter(
          card,
          angle / (Math.PI * 2),
          ringPadding,
          borderRadius,
        );
        outline.push({ ...pt, vx: 0, vy: 0, angle });
      }
      return outline;
    },
    [getRoundedRectPerimeter, POINTS_COUNT],
  );

  const initRingPoints = useCallback(() => {
    const points: Point[] = [];
    for (let i = 0; i < POINTS_COUNT; i++) {
      const angle = (i / POINTS_COUNT) * Math.PI * 2;
      points.push({
        angle,
        x: cursorRef.current.x + Math.cos(angle) * BASE_RADIUS,
        y: cursorRef.current.y + Math.sin(angle) * BASE_RADIUS,
        vx: 0,
        vy: 0,
      });
    }
    return points;
  }, [BASE_RADIUS, POINTS_COUNT]);

  const getNearestCardWithInfluence = useCallback((cx: number, cy: number) => {
    let bestInfl = 0;
    let bestCard: CardRect | null = null;
    for (const card of cardsRef.current) {
      const dx = cx - card.centerX;
      const dy = cy - card.centerY;
      const dist = Math.hypot(dx, dy);
      let infl = 0;
      if (dist < INFLUENCE_DIST) {
        infl = 1 - Math.pow(dist / INFLUENCE_DIST, 1.35);
        infl = Math.min(1.0, Math.pow(infl, 1.2));
      }
      if (infl > bestInfl) {
        bestInfl = infl;
        bestCard = card;
      }
    }
    return { influence: bestInfl, card: bestCard };
  }, []);

  const getLiquidTarget = useCallback(
    (
      angle: number,
      cursorX: number,
      cursorY: number,
      influence: number,
      targetCard: CardRect | null,
      isLocked: boolean = false,
      lockedCard: CardRect | null = null,
    ) => {
      const neutralX = cursorX + Math.cos(angle) * BASE_RADIUS;
      const neutralY = cursorY + Math.sin(angle) * BASE_RADIUS;

      if (!targetCard || influence <= 0.01) return { x: neutralX, y: neutralY };

      const card = isLocked ? lockedCard : targetCard;
      if (!card) return { x: neutralX, y: neutralY };

      const ringPadding = card.ringPadding !== undefined ? card.ringPadding : 6;
      const offset = isLocked ? ringPadding : 5 + influence * 25;
      const borderRadius = card.borderRadius;
      const borderTarget = getRoundedRectPerimeter(
        card,
        angle / (Math.PI * 2),
        offset,
        borderRadius,
      );

      const t = Math.pow(influence, STRETCH_FACTOR);
      const dxCenter = card.centerX - cursorX;
      const dyCenter = card.centerY - cursorY;
      const distToCenter = Math.hypot(dxCenter, dyCenter);
      let suctionX = 0,
        suctionY = 0;
      if (distToCenter > 0.01 && !isLocked) {
        const suctionPower = influence * SUCTION_STRENGTH * BASE_RADIUS;
        suctionX = (dxCenter / distToCenter) * suctionPower;
        suctionY = (dyCenter / distToCenter) * suctionPower;
      }

      const pulledNeutralX = neutralX + suctionX;
      const pulledNeutralY = neutralY + suctionY;
      const finalX = pulledNeutralX + (borderTarget.x - pulledNeutralX) * t;
      const finalY = pulledNeutralY + (borderTarget.y - pulledNeutralY) * t;

      return { x: finalX, y: finalY };
    },
    [BASE_RADIUS, STRETCH_FACTOR, SUCTION_STRENGTH, getRoundedRectPerimeter],
  );

  const updateRing = useCallback(() => {
    if (!canvasRef.current) return;
    updateCardsGeometry();

    const cursor = cursorRef.current;
    let insideCardNow: CardRect | null = null;
    for (const card of cardsRef.current) {
      if (isPointInsideCard(cursor.x, cursor.y, card, card.borderRadius)) {
        insideCardNow = card;
        break;
      }
    }

    let targets: { x: number; y: number }[] = [];
    let influences: number[] = [];

    if (insideCardNow) {
      if (!isInsideCardRef.current || lockedCardRef.current !== insideCardNow) {
        isInsideCardRef.current = true;
        lockedCardRef.current = insideCardNow;
        const ringPadding = insideCardNow.ringPadding ?? 6;
        lockedOutlineRef.current = computeCardOutline(
          insideCardNow,
          insideCardNow.borderRadius,
          ringPadding,
        );
      }
      targets = lockedOutlineRef.current.map((p) => ({ x: p.x, y: p.y }));
      influences = new Array(POINTS_COUNT).fill(1.0);
    } else {
      if (isInsideCardRef.current) {
        isInsideCardRef.current = false;
        lockedCardRef.current = null;
        lockedOutlineRef.current = [];
      }
      const { influence, card } = getNearestCardWithInfluence(
        cursor.x,
        cursor.y,
      );
      if (card && influence > 0.02) {
        for (let i = 0; i < POINTS_COUNT; i++) {
          const angle = ringPointsRef.current[i].angle;
          const target = getLiquidTarget(
            angle,
            cursor.x,
            cursor.y,
            influence,
            card,
            false,
            null,
          );
          targets.push(target);
          influences.push(influence);
        }
      } else {
        for (let i = 0; i < POINTS_COUNT; i++) {
          const angle = ringPointsRef.current[i].angle;
          targets.push({
            x: cursor.x + Math.cos(angle) * BASE_RADIUS,
            y: cursor.y + Math.sin(angle) * BASE_RADIUS,
          });
          influences.push(0);
        }
      }
    }

    for (let i = 0; i < POINTS_COUNT; i++) {
      const p = ringPointsRef.current[i];
      const target = targets[i];
      const weight = isInsideCardRef.current
        ? 1.0
        : Math.min(1.0, influences[i] * 1.3);
      const stiffness = RING_STIFF * (0.65 + weight * 0.7);
      const dx = target.x - p.x;
      const dy = target.y - p.y;

      p.vx += dx * stiffness;
      p.vy += dy * stiffness;
      p.vx *= RING_DAMP;
      p.vy *= RING_DAMP;
      p.x += p.vx;
      p.y += p.vy;
    }
  }, [
    updateCardsGeometry,
    isPointInsideCard,
    computeCardOutline,
    getNearestCardWithInfluence,
    getLiquidTarget,
    BASE_RADIUS,
    RING_STIFF,
    RING_DAMP,
    POINTS_COUNT,
  ]);

  // ========== DESENHO ==========
  const drawScaledBlob = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      points: Point[],
      scale: number,
      cursorX: number,
      cursorY: number,
    ) => {
      if (points.length < 3) return;
      ctx.beginPath();
      for (let i = 0; i < points.length; i++) {
        const p0 = points[(i - 1 + points.length) % points.length];
        const p1 = points[i];
        const p2 = points[(i + 1) % points.length];
        const p3 = points[(i + 2) % points.length];
        const sP0 = {
          x: cursorX + (p0.x - cursorX) * scale,
          y: cursorY + (p0.y - cursorY) * scale,
        };
        const sP1 = {
          x: cursorX + (p1.x - cursorX) * scale,
          y: cursorY + (p1.y - cursorY) * scale,
        };
        const sP2 = {
          x: cursorX + (p2.x - cursorX) * scale,
          y: cursorY + (p2.y - cursorY) * scale,
        };
        const sP3 = {
          x: cursorX + (p3.x - cursorX) * scale,
          y: cursorY + (p3.y - cursorY) * scale,
        };
        const smooth = 0.25;
        const cp1x = sP1.x + (sP2.x - sP0.x) * smooth;
        const cp1y = sP1.y + (sP2.y - sP0.y) * smooth;
        const cp2x = sP2.x - (sP3.x - sP1.x) * smooth;
        const cp2y = sP2.y - (sP3.y - sP1.y) * smooth;
        if (i === 0) ctx.moveTo(sP1.x, sP1.y);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, sP2.x, sP2.y);
      }
      ctx.closePath();
    },
    [],
  );

  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    if (canvas.width !== width) canvas.width = width;
    if (canvas.height !== height) canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    const ordered = [...ringPointsRef.current].sort(
      (a, b) => a.angle - b.angle,
    );
    const cursor = cursorRef.current;

    const t = clickProgress.current;
    const shouldShrink = clickActive.current && !isInsideCardRef.current;
    const ringScale = shouldShrink ? 1 - t * 0.8 : 1;
    const dotRadius = 3.8 + (BASE_RADIUS * 0.9 - 3.8) * (shouldShrink ? t : 0);

    const normalColor = normalRingColor;
    const invertedColor = invertedRingColor;
    const getRGB = (color: string): [number, number, number] => {
      if (color === "#ffffff") return [255, 255, 255];
      if (color === "#1a1a1a") return [26, 26, 26];
      return [200, 200, 200];
    };
    const [nr, ng, nb] = getRGB(normalColor);
    const [ir, ig, ib] = getRGB(invertedColor);
    const r = Math.floor(nr + (ir - nr) * (shouldShrink ? t : 0));
    const g = Math.floor(ng + (ig - ng) * (shouldShrink ? t : 0));
    const b = Math.floor(nb + (ib - nb) * (shouldShrink ? t : 0));
    const currentRingColor = `rgb(${r}, ${g}, ${b})`;

    ctx.shadowBlur = 8;
    ctx.shadowColor = normalColor;
    ctx.beginPath();
    ctx.arc(cursor.x, cursor.y, dotRadius, 0, Math.PI * 2);
    ctx.fillStyle = normalColor;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cursor.x, cursor.y, dotRadius * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = normalColor === "#ffffff" ? "#e0e8ff" : "#2a2a2a";
    ctx.fill();
    ctx.shadowBlur = 0;

    if (ringScale > 0.1) {
      drawScaledBlob(ctx, ordered, ringScale, cursor.x, cursor.y);
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = currentRingColor;
      ctx.stroke();
      ctx.save();
      ctx.shadowBlur = 8;
      ctx.shadowColor = currentRingColor;
      drawScaledBlob(ctx, ordered, ringScale, cursor.x, cursor.y);
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = currentRingColor;
      ctx.stroke();
      ctx.restore();
    }
  }, [drawScaledBlob, normalRingColor, invertedRingColor, BASE_RADIUS]);

  const animate = useCallback(() => {
    const now = performance.now();
    updateClickProgress(now);
    updateRing();
    renderCanvas();
    animationRef.current = requestAnimationFrame(animate);
  }, [updateClickProgress, updateRing, renderCanvas]);

  // Eventos de mouse/touch (só ativados se não for mobile)
  useEffect(() => {
    if (isMobile) return;
    const onMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length)
        cursorRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
    };
    const onMouseLeave = () => {
      cursorRef.current = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };
      isInsideCardRef.current = false;
      lockedCardRef.current = null;
      lockedOutlineRef.current = [];
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchstart", onTouchMove, { passive: false });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchstart", onTouchMove);
    };
  }, [isMobile]);

  // Inicialização (apenas se não for mobile)
  useEffect(() => {
    if (isMobile) return;
    ringPointsRef.current = initRingPoints();
    updateCardsGeometry();
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }
    animate();
    const handleResize = () => {
      updateCardsGeometry();
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile, initRingPoints, updateCardsGeometry, animate]);

  // Se for mobile, não renderiza nada (ou renderiza null)
  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
};

export default LiquidCursor;
