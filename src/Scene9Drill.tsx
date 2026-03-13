// Scene 9: Mini Drill (3:55~4:35, 40s = 1200 frames)
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS, FONT_FAMILY } from "./styles";

const roles = [
    { icon: "🗺️", label: "導線" },
    { icon: "🎤", label: "場の運営" },
    { icon: "📊", label: "改善" },
];

export const Scene9Drill: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Header pop
    const headerSpring = spring({ frame, fps, config: { damping: 12, stiffness: 200 } });

    // CTA text
    const ctaDelay = Math.round(1 * fps);
    const ctaOpacity = interpolate(frame, [ctaDelay, ctaDelay + 0.5 * fps], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const ctaPulse =
        frame > ctaDelay + fps
            ? interpolate(Math.sin((frame - ctaDelay) * 0.08), [-1, 1], [0.95, 1.05])
            : 1;

    // Task card
    const taskDelay = Math.round(3 * fps);
    const taskSpring = spring({ frame, fps, delay: taskDelay, config: { damping: 200 } });

    // Role mini cards
    const roleBaseDelay = Math.round(6 * fps);

    // Bottom note
    const noteDelay = Math.round(9 * fps);
    const noteOpacity = interpolate(frame, [noteDelay, noteDelay + fps], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // Bright glow
    const glowOpacity = interpolate(frame, [0, 2 * fps], [0, 0.12], { extrapolateRight: "clamp" });

    return (
        <AbsoluteFill
            style={{
                background: `linear-gradient(180deg, ${COLORS.bgGrad1} 0%, ${COLORS.bgMain} 100%)`,
                fontFamily: FONT_FAMILY,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {/* Cyan glow */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(ellipse at 50% 50%, ${COLORS.good} 0%, transparent 50%)`,
                    opacity: glowOpacity,
                }}
            />

            {/* Header */}
            <div
                style={{
                    position: "absolute",
                    top: 50,
                    transform: `scale(${headerSpring})`,
                    fontSize: 40,
                    fontWeight: 700,
                    color: COLORS.drill,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                }}
            >
                <span>📝</span>
                <span>ミニドリル</span>
            </div>

            {/* CTA */}
            <div
                style={{
                    position: "absolute",
                    top: 130,
                    opacity: ctaOpacity,
                    transform: `scale(${ctaPulse})`,
                    fontSize: 32,
                    fontWeight: 700,
                    color: COLORS.textWhite,
                }}
            >
                ✋ 今すぐ手を動かしてください！
            </div>

            {/* Task card */}
            <div
                style={{
                    opacity: taskSpring,
                    transform: `translateY(${interpolate(taskSpring, [0, 1], [30, 0])}px)`,
                    background: COLORS.cardBg,
                    border: `1px solid ${COLORS.drill}40`,
                    borderRadius: 20,
                    padding: "36px 48px",
                    width: 850,
                    marginTop: 30,
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                    <div
                        style={{
                            width: 32,
                            height: 32,
                            border: `3px solid ${COLORS.drill}`,
                            borderRadius: 6,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexShrink: 0,
                        }}
                    >
                        {frame > Math.round(10 * fps) && (
                            <span style={{ fontSize: 20, color: COLORS.drill }}>✓</span>
                        )}
                    </div>
                    <span style={{ fontSize: 26, fontWeight: 600, color: COLORS.textWhite, lineHeight: 1.6 }}>
                        役割3つ（導線・場・改善）を<span style={{ color: COLORS.drill, fontWeight: 700 }}>30秒で説明</span>
                        する動画を撮る
                    </span>
                </div>

                {/* Timer icon */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        justifyContent: "flex-end",
                        marginTop: 8,
                    }}
                >
                    <span style={{ fontSize: 28, transform: `rotate(${frame * 2}deg)` }}>⏱️</span>
                    <span style={{ fontSize: 28, fontWeight: 700, color: COLORS.drill, fontFamily: "'Inter', sans-serif" }}>
                        30秒
                    </span>
                </div>
            </div>

            {/* Role mini cards */}
            <div style={{ display: "flex", gap: 32, marginTop: 32 }}>
                {roles.map((role, i) => {
                    const delay = roleBaseDelay + Math.round(i * 0.6 * fps);
                    const cardSpring = spring({ frame, fps, delay, config: { damping: 200 } });
                    return (
                        <div
                            key={i}
                            style={{
                                opacity: cardSpring,
                                transform: `scale(${interpolate(cardSpring, [0, 1], [0.8, 1])})`,
                                background: COLORS.cardBg,
                                border: `1px solid ${COLORS.cardBorder}`,
                                borderRadius: 14,
                                padding: "20px 36px",
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                            }}
                        >
                            <span style={{ fontSize: 32 }}>{role.icon}</span>
                            <span style={{ fontSize: 24, fontWeight: 600, color: COLORS.textWhite }}>{role.label}</span>
                        </div>
                    );
                })}
            </div>

            {/* Bottom note */}
            <div
                style={{
                    position: "absolute",
                    bottom: 60,
                    opacity: noteOpacity,
                    fontSize: 22,
                    color: COLORS.textGray,
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                }}
            >
                <span>📱 録画</span>
                <span>or</span>
                <span>📝 メモに残して</span>
                <span style={{ color: COLORS.textGray }}>→</span>
                <span style={{ color: COLORS.good }}>相互チェックに使おう</span>
            </div>
        </AbsoluteFill>
    );
};
