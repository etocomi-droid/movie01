// Scene 5: Three Points Overview (1:35~2:05, 30s = 900 frames)
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS, FONT_FAMILY } from "./styles";

const points = [
    {
        num: "①",
        icon: "🎤",
        text: 'ライバーは出演者ではなく\n"売上を作るMC"である',
        color: COLORS.accent,
    },
    {
        num: "②",
        icon: "🗺️",
        text: "導線設計（悩み→参加→提案）を\n先に作る",
        color: COLORS.good,
    },
    {
        num: "③",
        icon: "📊",
        text: "場の運営（コメント・温度）と\n数値改善の責任を持つ",
        color: COLORS.drill,
    },
];

export const Scene5ThreePoints: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Header
    const headerSpring = spring({ frame, fps, config: { damping: 200 } });

    // Pulse on completion
    const allVisibleFrame = Math.round(7 * fps);
    const pulseOpacity =
        frame > allVisibleFrame
            ? interpolate(Math.sin((frame - allVisibleFrame) * 0.08), [-1, 1], [0.03, 0.08])
            : 0;

    return (
        <AbsoluteFill
            style={{
                background: `linear-gradient(180deg, ${COLORS.bgGrad1} 0%, ${COLORS.bgMain} 100%)`,
                fontFamily: FONT_FAMILY,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {/* Pulse glow */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(ellipse at center, ${COLORS.accent} 0%, transparent 70%)`,
                    opacity: pulseOpacity,
                }}
            />

            {/* Header */}
            <div
                style={{
                    position: "absolute",
                    top: 50,
                    fontSize: 40,
                    fontWeight: 700,
                    color: COLORS.textWhite,
                    opacity: headerSpring,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                }}
            >
                <span>🔑</span>
                <span>3つのポイント</span>
            </div>

            {/* Points */}
            <div style={{ display: "flex", flexDirection: "column", gap: 28, width: 900, marginTop: 20 }}>
                {points.map((point, i) => {
                    const delay = Math.round((1.5 + i * 2) * fps);
                    const slideSpring = spring({ frame, fps, delay, config: { damping: 200 } });
                    const y = interpolate(slideSpring, [0, 1], [60, 0]);
                    const opacity = slideSpring;

                    // Icon bounce after appear
                    const bounceDelay = delay + Math.round(0.5 * fps);
                    const iconBounce = spring({ frame, fps, delay: bounceDelay, config: { damping: 8, stiffness: 200 } });
                    const iconScale = interpolate(iconBounce, [0, 1], [1, 1.15]);

                    return (
                        <div
                            key={i}
                            style={{
                                opacity,
                                transform: `translateY(${y}px)`,
                                display: "flex",
                                alignItems: "center",
                                gap: 24,
                                background: COLORS.cardBg,
                                border: `1px solid ${point.color}30`,
                                borderLeft: `4px solid ${point.color}`,
                                borderRadius: 16,
                                padding: "28px 36px",
                            }}
                        >
                            <span style={{ fontSize: 28, color: point.color, fontWeight: 900 }}>{point.num}</span>
                            <span style={{ fontSize: 44, transform: `scale(${iconScale})` }}>{point.icon}</span>
                            <span
                                style={{
                                    fontSize: 28,
                                    fontWeight: 600,
                                    color: COLORS.textWhite,
                                    lineHeight: 1.5,
                                    whiteSpace: "pre-line",
                                }}
                            >
                                {point.text}
                            </span>
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};
