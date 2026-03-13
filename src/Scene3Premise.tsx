// Scene 3: Premise - Flow Chart (0:40~1:05, 25s = 750 frames)
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { COLORS, FONT_FAMILY } from "./styles";
import { Particles } from "./Particles";

const flowItems = [
    { icon: "😟", label: "悩み", sub: "視聴者の課題" },
    { icon: "📺", label: "参加", sub: "配信に来る" },
    { icon: "💡", label: "提案", sub: "解決策を示す" },
    { icon: "🎯", label: "CV", sub: "成約・購入" },
];

export const Scene3Premise: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Header animation
    const headerOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], { extrapolateRight: "clamp" });

    // Overlay text
    const overlayDelay = Math.round(5 * fps);
    const overlayOpacity = interpolate(frame, [overlayDelay, overlayDelay + fps], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const overlayY = interpolate(frame, [overlayDelay, overlayDelay + fps], [30, 0], {
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
            <Audio src={staticFile("audio/scene3.mp3")} />
            <Particles count={10} />
            {/* Header */}
            <div
                style={{
                    position: "absolute",
                    top: 60,
                    fontSize: 36,
                    fontWeight: 700,
                    color: COLORS.textWhite,
                    opacity: headerOpacity,
                    letterSpacing: 2,
                }}
            >
                📋 CV導線の全体フロー
            </div>

            {/* Flow Chart */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                {flowItems.map((item, i) => {
                    const delay = Math.round((0.8 + i * 0.8) * fps);
                    const cardSpring = spring({ frame, fps, delay, config: { damping: 200 } });
                    const cardOpacity = cardSpring;
                    const cardScale = interpolate(cardSpring, [0, 1], [0.8, 1]);

                    // Arrow between items
                    const arrowDelay = Math.round((1.2 + i * 0.8) * fps);
                    const arrowOpacity = interpolate(frame, [arrowDelay, arrowDelay + 0.3 * fps], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    });
                    const arrowWidth = interpolate(frame, [arrowDelay, arrowDelay + 0.3 * fps], [0, 60], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    });

                    return (
                        <React.Fragment key={i}>
                            <div
                                style={{
                                    opacity: cardOpacity,
                                    transform: `scale(${cardScale})`,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    background: COLORS.cardBg,
                                    border: `1px solid ${COLORS.cardBorder}`,
                                    borderRadius: 20,
                                    padding: "36px 40px",
                                    minWidth: 160,
                                }}
                            >
                                <span style={{ fontSize: 56 }}>{item.icon}</span>
                                <span style={{ fontSize: 32, fontWeight: 700, color: COLORS.textWhite, marginTop: 12 }}>
                                    {item.label}
                                </span>
                                <span style={{ fontSize: 18, color: COLORS.textGray, marginTop: 8 }}>{item.sub}</span>
                            </div>
                            {i < flowItems.length - 1 && (
                                <div
                                    style={{
                                        opacity: arrowOpacity,
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: arrowWidth,
                                            height: 3,
                                            background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.good})`,
                                        }}
                                    />
                                    <div
                                        style={{
                                            width: 0,
                                            height: 0,
                                            borderTop: "8px solid transparent",
                                            borderBottom: "8px solid transparent",
                                            borderLeft: `12px solid ${COLORS.good}`,
                                        }}
                                    />
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>

            {/* Overlay text */}
            <div
                style={{
                    position: "absolute",
                    bottom: 80,
                    opacity: overlayOpacity,
                    transform: `translateY(${overlayY}px)`,
                    fontSize: 28,
                    color: COLORS.textWhite,
                    background: `rgba(233,69,96,0.15)`,
                    border: `1px solid ${COLORS.accent}`,
                    borderRadius: 12,
                    padding: "16px 40px",
                }}
            >
                この導線を<span style={{ color: COLORS.accent, fontWeight: 700 }}>"設計して実行"</span>
                するのがライバー
            </div>
        </AbsoluteFill>
    );
};
