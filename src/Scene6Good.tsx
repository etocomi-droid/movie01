// Scene 6: GOOD Example (2:05~2:45, 40s = 1200 frames)
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Audio, staticFile } from "remotion";
import { COLORS, FONT_FAMILY } from "./styles";
import { Particles } from "./Particles";

const fullScript =
    "今日は◯◯で困ってる人向け。コメントで状況を教えて→あなたに合う選び方を案内します";

const highlights = ["困ってる人向け", "コメントで教えて", "案内します"];

export const Scene6Good: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Badge pop-in
    const badgeSpring = spring({ frame, fps, config: { damping: 12, stiffness: 200 } });

    // Mockup appear
    const mockupDelay = Math.round(1 * fps);
    const mockupOpacity = interpolate(frame, [mockupDelay, mockupDelay + 0.5 * fps], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // Typewriter effect
    const typeStart = Math.round(3 * fps);
    const typeEnd = Math.round(7 * fps);
    const charsToShow = Math.floor(
        interpolate(frame, [typeStart, typeEnd], [0, fullScript.length], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }),
    );
    const displayedText = fullScript.slice(0, charsToShow);

    // Highlight phase
    const highlightDelay = Math.round(8 * fps);
    const highlightProgress = interpolate(frame, [highlightDelay, highlightDelay + 2 * fps], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // Bottom explanation
    const explainDelay = Math.round(10 * fps);
    const explainSpring = spring({ frame, fps, delay: explainDelay, config: { damping: 200 } });

    // Background glow
    const glowOpacity = interpolate(frame, [0, 2 * fps], [0, 0.15], { extrapolateRight: "clamp" });

    return (
        <AbsoluteFill
            style={{
                background: `linear-gradient(180deg, ${COLORS.bgGrad1} 0%, ${COLORS.bgMain} 100%)`,
                fontFamily: FONT_FAMILY,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Audio src={staticFile("audio/scene6.mp3")} />
            <Particles count={15} color={COLORS.good} />
            {/* Green glow */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(ellipse at 50% 40%, ${COLORS.good} 0%, transparent 60%)`,
                    opacity: glowOpacity,
                }}
            />

            {/* GOOD Badge */}
            <div
                style={{
                    position: "absolute",
                    top: 50,
                    left: 60,
                    transform: `scale(${badgeSpring})`,
                    background: COLORS.good,
                    borderRadius: 12,
                    padding: "12px 28px",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                }}
            >
                <span style={{ fontSize: 28 }}>✅</span>
                <span style={{ fontSize: 28, fontWeight: 900, color: COLORS.bgMain }}>GOOD</span>
            </div>

            {/* Mockup area */}
            <div
                style={{
                    opacity: mockupOpacity,
                    width: 950,
                    background: "rgba(0,210,211,0.05)",
                    border: `1px solid rgba(0,210,211,0.2)`,
                    borderRadius: 24,
                    padding: 48,
                    position: "relative",
                }}
            >
                {/* Liver avatar */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 24 }}>
                    <div
                        style={{
                            width: 64,
                            height: 64,
                            borderRadius: "50%",
                            background: `linear-gradient(135deg, ${COLORS.good}, #0abde3)`,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: 32,
                            flexShrink: 0,
                        }}
                    >
                        🎤
                    </div>

                    {/* Speech bubble */}
                    <div
                        style={{
                            background: "rgba(255,255,255,0.08)",
                            border: `1px solid rgba(255,255,255,0.15)`,
                            borderRadius: "4px 20px 20px 20px",
                            padding: "28px 36px",
                            flex: 1,
                            minHeight: 100,
                        }}
                    >
                        <span style={{ fontSize: 28, lineHeight: 1.8, color: COLORS.textWhite }}>
                            {highlightProgress > 0
                                ? fullScript.split("").map((char, ci) => {
                                    const isHighlight = highlights.some((h) => {
                                        const idx = fullScript.indexOf(h);
                                        return ci >= idx && ci < idx + h.length;
                                    });
                                    return (
                                        <span
                                            key={ci}
                                            style={{
                                                color: isHighlight ? COLORS.good : COLORS.textWhite,
                                                fontWeight: isHighlight ? 900 : 400,
                                                textDecoration: isHighlight ? "underline" : "none",
                                                textDecorationColor: isHighlight ? COLORS.good : "transparent",
                                            }}
                                        >
                                            {char}
                                        </span>
                                    );
                                })
                                : displayedText}
                            {charsToShow < fullScript.length && frame >= typeStart && (
                                <span
                                    style={{
                                        opacity: Math.sin(frame * 0.15) > 0 ? 1 : 0,
                                    }}
                                >
                                    |
                                </span>
                            )}
                        </span>
                    </div>
                </div>
            </div>

            {/* Explanation */}
            <div
                style={{
                    position: "absolute",
                    bottom: 70,
                    opacity: explainSpring,
                    transform: `translateY(${interpolate(explainSpring, [0, 1], [20, 0])}px)`,
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    fontSize: 24,
                    color: COLORS.good,
                }}
            >
                <span>✅ ターゲットを絞る</span>
                <span style={{ color: COLORS.textGray }}>→</span>
                <span>✅ 視聴者を巻き込む</span>
                <span style={{ color: COLORS.textGray }}>→</span>
                <span>✅ 注意を引ける</span>
            </div>
        </AbsoluteFill>
    );
};
