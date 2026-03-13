// Design System - Colors, Fonts, and Shared Styles

export const COLORS = {
  bgMain: "#0f0f1a",
  bgGrad1: "#1a1a2e",
  bgGrad2: "#16213e",
  accent: "#e94560",
  good: "#00d2d3",
  ng: "#ff6b6b",
  drill: "#feca57",
  textWhite: "#f0f0f0",
  textGray: "#a0a0b0",
  cardBg: "rgba(255,255,255,0.07)",
  cardBorder: "rgba(255,255,255,0.12)",
} as const;

export const FONT_FAMILY = "'Noto Sans JP', sans-serif";

export const baseStyle: React.CSSProperties = {
  backgroundColor: COLORS.bgMain,
  fontFamily: FONT_FAMILY,
  color: COLORS.textWhite,
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
};

export const gradientBg: React.CSSProperties = {
  background: `linear-gradient(135deg, ${COLORS.bgGrad1} 0%, ${COLORS.bgGrad2} 50%, ${COLORS.bgMain} 100%)`,
};
