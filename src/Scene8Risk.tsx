// Scene 8: Risk Warning (3:25~3:55, 30s = 900 frames)
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Audio, staticFile } from "remotion";
import { COLORS, FONT_FAMILY } from "./styles";
import { Particles } from "./Particles";

const risks = [
    { label: "外部誘導NG", desc: "他サイトへの不正な誘導は規約違反・炎上リスク" },
    { label: "喧嘩NG", desc: "視聴者・他配信者との口論は即炎上の原因に" },
    { label: "断言しすぎNG", desc: "効果の過剰な断言は法的リスクにもなる" },
];

export const Scene8Risk: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Header banner
    const bannerSpring = spring({ frame, fps, config: { damping: 200 } });
    const bannerWidth = interpolate(bannerSpring, [0, 1], [0, 100]);

    // Red border at end
    const borderDelay = Math.round(7.5 * fps);
    const borderOpacity = interpolate(frame, [borderDelay, borderDelay + 0.5 * fps], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // Final message
    const finalDelay = Math.round(8 * fps);
    const finalSpring = spring({ frame, fps, delay: finalDelay, config: { damping: 15 } });

    // Warning glow
    const glowOpacity = interpolate(frame, [0, 2 * fps], [0, 0.1], { extrapolateRight: "clamp" });

    return (
        <AbsoluteFill
            style={{
                background: `linear-gradient(180deg, ${COLORS.bgGrad1} 0%, ${COLORS.bgMain} 100%)`,
                fontFamily: FONT_FAMILY,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Audio src={staticFile("audio/scene8.mp3")} />
            <Particles count={15} color={COLORS.accent} />
            {/* Warning glow */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(ellipse at 50% 30%, #ff6b6b 0%, transparent 50%)`,
                    opacity: glowOpacity,
                }}
            />

            {/* Header banner */}
            <div
                style={{
                    position: "absolute",
                    top: 50,
                    width: `${bannerWidth}%`,
                    display: "flex",
                    justifyContent: "center",
                    background: `linear-gradient(90deg, transparent, rgba(255,107,107,0.15), transparent)`,
                    padding: "16px 0",
                }}
            >
                <span style={{ fontSize: 38, fontWeight: 700, color: COLORS.ng, opacity: bannerSpring }}>
                    ⚠️ リスク注意
                </span>
            </div>

            {/* Risk items container */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 24,
                    marginTop: 20,
                    width: 850,
                    padding: 32,
                    borderRadius: 20,
                    border: `2px solid rgba(255,107,107,${borderOpacity * 0.4})`,
                    position: "relative",
                }}
            >
                {risks.map((risk, i) => {
                    const delay = Math.round((2 + i * 1.8) * fps);
                    const slideSpring = spring({ frame, fps, delay, config: { damping: 200 } });
                    const x = interpolate(slideSpring, [0, 1], [-60, 0]);

                    return (
                        <div
                            key={i}
                            style={{
                                opacity: slideSpring,
                                transform: `translateX(${x}px)`,
                                display: "flex",
                                alignItems: "center",
                                gap: 20,
                                background: "rgba(255,107,107,0.06)",
                                border: "1px solid rgba(255,107,107,0.15)",
                                borderRadius: 14,
                                padding: "24px 32px",
                            }}
                        >
                            <span style={{ fontSize: 36, flexShrink: 0 }}>🚫</span>
                            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                <span style={{ fontSize: 28, fontWeight: 700, color: COLORS.ng }}>{risk.label}</span>
                                <span style={{ fontSize: 20, color: COLORS.textGray }}>{risk.desc}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Final emphasis */}
            <div
                style={{
                    position: "absolute",
                    bottom: 60,
                    opacity: finalSpring,
                    transform: `scale(${finalSpring})`,
                    fontSize: 26,
                    fontWeight: 700,
                    color: COLORS.ng,
                    background: "rgba(255,107,107,0.12)",
                    border: "1px solid rgba(255,107,107,0.3)",
                    borderRadius: 12,
                    padding: "14px 36px",
                }}
            >
                🔥 最初から意識しておく！
            </div>
        </AbsoluteFill>
    );
};
