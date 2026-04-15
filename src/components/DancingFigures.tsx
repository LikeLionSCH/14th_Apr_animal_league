"use client";

import { useMemo } from "react";
import { NEON_COLORS } from "@/lib/constants";

const DANCE_STYLES = ["dance-body-1", "dance-body-2", "dance-body-3"] as const;

interface FigureProps {
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  danceStyle: string;
  duration: number;
}

function HumanFigure({ x, y, size, color, delay, danceStyle, duration }: FigureProps) {
  const style = {
    left: `${x}%`,
    top: `${y}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
  };

  const armLegStyle = {
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
  };

  return (
    <div className={`absolute pointer-events-none ${danceStyle}`} style={style}>
      <svg
        width={size}
        height={size * 2.2}
        viewBox="0 0 50 110"
        fill={color}
        opacity={0.18}
      >
        {/* 머리 */}
        <circle cx="25" cy="11" r="10" />

        {/* 몸통 */}
        <rect x="16" y="22" width="18" height="28" rx="5" />

        {/* 왼팔 */}
        <rect
          x="2" y="24" width="14" height="7" rx="3.5"
          className="dance-arm-l"
          style={armLegStyle}
        />

        {/* 오른팔 */}
        <rect
          x="34" y="24" width="14" height="7" rx="3.5"
          className="dance-arm-r"
          style={armLegStyle}
        />

        {/* 왼다리 */}
        <rect
          x="14" y="49" width="9" height="28" rx="4"
          className="dance-leg-l"
          style={armLegStyle}
        />

        {/* 오른다리 */}
        <rect
          x="27" y="49" width="9" height="28" rx="4"
          className="dance-leg-r"
          style={armLegStyle}
        />
      </svg>
    </div>
  );
}

const FIGURES: FigureProps[] = [
  { x: -3,  y: 15, size: 240, color: NEON_COLORS[0], delay: 0,    danceStyle: DANCE_STYLES[0], duration: 0.55 },
  { x: 27,  y: 10, size: 250, color: NEON_COLORS[3], delay: 0.15, danceStyle: DANCE_STYLES[1], duration: 0.65 },
  { x: 57,  y: 12, size: 235, color: NEON_COLORS[5], delay: 0.05, danceStyle: DANCE_STYLES[2], duration: 0.50 },
  { x: 80,  y: 10, size: 245, color: NEON_COLORS[8], delay: 0.2,  danceStyle: DANCE_STYLES[0], duration: 0.60 },
];

export default function DancingFigures() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {FIGURES.map((fig, i) => (
        <HumanFigure key={i} {...fig} />
      ))}
    </div>
  );
}
