// Scene 2: Conclusion First (0:15~0:40, 25s = 750 frames)
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS, FONT_FAMILY } from "./styles";
import { Particles } from "./Particles";

export const Scene2Conclusion: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Phase 1: "結論から" label
    const labelOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], { extrapolateRight: "clamp" });

    // Phase 2: "出演者？" appears
    const questionDelay = Math.round(0.8 * fps);
    const questionOpacity = interpolate(frame, [questionDelay, questionDelay + 0.5 * fps], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // Phase 2b: X stamp on "出演者"
    const stampDelay = Math.round(3 * fps);
    const stampScale = spring({ frame, fps, delay: stampDelay, config: { damping: 15, stiffness: 200 } });
    const stampRotation = interpolate(stampScale, [0, 1], [-30, -12]);

    // Phase 3: "売上を作るMC" slides in
    const mcDelay = Math.round(4.5 * fps);
    const mcSlide = spring({ frame, fps, delay: mcDelay, config: { damping: 200 } });
    const mcX = interpolate(mcSlide, [0, 1], [200, 0]);
    const mcOpacity = mcSlide;

    // Phase 4: Bottom caption
    const captionDelay = Math.round(6 * fps);
    const captionOpacity = interpolate(frame, [captionDelay, captionDelay + fps], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill
            style={{
                background: `linear-gradient(135deg, ${COLORS.bgGrad1} 0%, ${COLORS.bgMain} 100%)`,
                fontFamily: FONT_FAMILY,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Particles count={15} color={COLORS.accent} />

            {/* Label */}
            <div
                style={{
                    position: "absolute",
                    top: 80,
                    left: 80,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    opacity: labelOpacity,
                }}
            >
                <span style={{ fontSize: 32, color: COLORS.accent }}>📌</span>
                <span style={{ fontSize: 28, color: COLORS.accent, fontWeight: 700 }}>結論から</span>
            </div>

            {/* Main comparison area */}
            <div style={{ display: "flex", gap: 80, alignItems: "center" }}>
                {/* Left: 出演者 (NG) */}
                <div style={{ textAlign: "center", opacity: questionOpacity, position: "relative" }}>
                    <div
                        style={{
                            fontSize: 52,
                            fontWeight: 700,
                            color: COLORS.textGray,
                            padding: "30px 50px",
                            border: `2px solid ${COLORS.cardBorder}`,
                            borderRadius: 16,
                            background: "rgba(255,107,107,0.05)",
                        }}
                    >
                        出演者
                    </div>
                    {/* X Stamp */}
                    {stampScale > 0 && (
                        <div
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: `translate(-50%, -50%) scale(${stampScale}) rotate(${stampRotation}deg)`,
                                fontSize: 100,
                                color: COLORS.ng,
                                fontWeight: 900,
                                opacity: 0.9,
                            }}
                        >
                            ✕
                        </div>
                    )}
                </div>

                {/* Arrow */}
                <div
                    style={{
                        fontSize: 48,
                        color: COLORS.textGray,
                        opacity: mcOpacity,
                    }}
                >
                    →
                </div>

                {/* Right: 売上を作るMC (OK) */}
                <div
                    style={{
                        textAlign: "center",
                        transform: `translateX(${mcX}px)`,
                        opacity: mcOpacity,
                    }}
                >
                    <div
                        style={{
                            fontSize: 52,
                            fontWeight: 900,
                            color: COLORS.textWhite,
                            padding: "30px 50px",
                            border: `2px solid ${COLORS.good}`,
                            borderRadius: 16,
                            background: "rgba(0,210,211,0.1)",
                            boxShadow: `0 0 40px rgba(0,210,211,0.2)`,
                        }}
                    >
                        売上を作るMC
                    </div>
                    <div
                        style={{
                            marginTop: 16,
                            fontSize: 36,
                            color: COLORS.good,
                        }}
                    >
                        ◎
                    </div>
                </div>
            </div>

            {/* Bottom caption */}
            <div
                style={{
                    position: "absolute",
                    bottom: 80,
                    fontSize: 26,
                    color: COLORS.textGray,
                    opacity: captionOpacity,
                    letterSpacing: 1,
                }}
            >
                CV導線を設計して実行する<span style={{ color: COLORS.accent, fontWeight: 700 }}>"責任者"</span>
            </div>
        </AbsoluteFill>
    );
};
