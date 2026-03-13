// Scene 4: KPI Metrics (1:05~1:35, 30s = 900 frames)
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { COLORS, FONT_FAMILY } from "./styles";
import { Particles } from "./Particles";

const kpiItems = [
    { icon: "⏱️", label: "滞在時間", value: "1分+", desc: "視聴者が離脱せず留まる時間" },
    { icon: "💬", label: "コメント率", value: "5%+", desc: "視聴者の参加度を示す指標" },
    { icon: "🛒", label: "CVR", value: "1%+", desc: "購入・成約への転換率" },
];

export const Scene4KPI: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Header
    const headerSpring = spring({ frame, fps, config: { damping: 200 } });

    // Bottom message
    const msgDelay = Math.round(7 * fps);
    const msgSpring = spring({ frame, fps, delay: msgDelay, config: { damping: 15 } });
    const msgOpacity = interpolate(frame, [msgDelay, msgDelay + 0.5 * fps], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill
            style={{
                background: `linear-gradient(180deg, ${COLORS.bgGrad1} 0%, ${COLORS.bgMain} 100%)`,
                fontFamily: FONT_FAMILY,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Audio src={staticFile("audio/scene4.mp3")} />
            <Particles count={10} />
            {/* Header */}
            <div
                style={{
                    position: "absolute",
                    top: 60,
                    fontSize: 36,
                    fontWeight: 700,
                    color: COLORS.textWhite,
                    opacity: headerSpring,
                    transform: `translateY(${interpolate(headerSpring, [0, 1], [20, 0])}px)`,
                }}
            >
                📊 初級KPIの目安
            </div>

            {/* KPI Cards */}
            <div style={{ display: "flex", gap: 48 }}>
                {kpiItems.map((item, i) => {
                    const delay = Math.round((1.5 + i * 2) * fps);
                    const cardSpring = spring({ frame, fps, delay, config: { damping: 200 } });
                    const rotateY = interpolate(cardSpring, [0, 1], [90, 0]);
                    const cardOpacity = cardSpring;

                    return (
                        <div
                            key={i}
                            style={{
                                opacity: cardOpacity,
                                transform: `perspective(800px) rotateY(${rotateY}deg)`,
                                background: COLORS.cardBg,
                                border: `1px solid ${COLORS.cardBorder}`,
                                borderRadius: 20,
                                padding: "40px 48px",
                                minWidth: 260,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 12,
                            }}
                        >
                            <span style={{ fontSize: 52 }}>{item.icon}</span>
                            <span style={{ fontSize: 22, color: COLORS.textGray, fontWeight: 500 }}>{item.label}</span>
                            <span
                                style={{
                                    fontSize: 56,
                                    fontWeight: 900,
                                    color: COLORS.accent,
                                    fontFamily: "'Inter', sans-serif",
                                }}
                            >
                                {item.value}
                            </span>
                            <div
                                style={{
                                    width: "100%",
                                    height: 1,
                                    background: COLORS.cardBorder,
                                    margin: "8px 0",
                                }}
                            />
                            <span style={{ fontSize: 17, color: COLORS.textGray, textAlign: "center" }}>{item.desc}</span>
                        </div>
                    );
                })}
            </div>

            {/* Bottom message */}
            <div
                style={{
                    position: "absolute",
                    bottom: 70,
                    opacity: msgOpacity,
                    transform: `scale(${msgSpring})`,
                    background: `rgba(233,69,96,0.12)`,
                    border: `1px solid rgba(233,69,96,0.3)`,
                    borderRadius: 12,
                    padding: "16px 36px",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                }}
            >
                <span style={{ fontSize: 28 }}>💡</span>
                <span style={{ fontSize: 24, color: COLORS.textWhite }}>
                    数字は <span style={{ color: COLORS.ng, textDecoration: "line-through" }}>"結果"</span> ではなく
                    <span style={{ color: COLORS.good, fontWeight: 700 }}> "改善の手がかり"</span>
                </span>
            </div>
        </AbsoluteFill>
    );
};
