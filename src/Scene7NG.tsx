// Scene 7: NG Example (2:45~3:25, 40s = 1200 frames)
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Audio, staticFile } from "remotion";
import { COLORS, FONT_FAMILY } from "./styles";
import { Particles } from "./Particles";

const ngScript = "今日はこの商品を紹介します。スペックは…";

const problems = ["初見が自分ごと化できない", "コメントが伸びにくい"];

export const Scene7NG: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Badge
    const badgeSpring = spring({ frame, fps, config: { damping: 12, stiffness: 200 } });

    // Mockup
    const mockupDelay = Math.round(1 * fps);
    const mockupOpacity = interpolate(frame, [mockupDelay, mockupDelay + 0.5 * fps], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // Typewriter
    const typeStart = Math.round(3 * fps);
    const typeEnd = Math.round(5.5 * fps);
    const charsToShow = Math.floor(
        interpolate(frame, [typeStart, typeEnd], [0, ngScript.length], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }),
    );
    const displayedText = ngScript.slice(0, charsToShow);

    // Sleeping viewer
    const sleepDelay = Math.round(6 * fps);
    const sleepOpacity = interpolate(frame, [sleepDelay, sleepDelay + 0.5 * fps], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // X stamp
    const stampDelay = Math.round(7 * fps);
    const stampScale = spring({ frame, fps, delay: stampDelay, config: { damping: 15, stiffness: 200 } });

    // "やりがち" label
    const yarigachiDelay = Math.round(8 * fps);
    const yarigachiOpacity =
        frame > yarigachiDelay
            ? interpolate(Math.sin((frame - yarigachiDelay) * 0.12), [-1, 1], [0.6, 1])
            : 0;

    // Problems list
    const problemBaseDelay = Math.round(9 * fps);

    // Red glow
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
            <Audio src={staticFile("audio/scene7.mp3")} />
            <Particles count={15} color={COLORS.ng} />
            {/* Red glow */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(ellipse at 50% 40%, ${COLORS.ng} 0%, transparent 60%)`,
                    opacity: glowOpacity,
                }}
            />

            {/* NG Badge */}
            <div
                style={{
                    position: "absolute",
                    top: 50,
                    left: 60,
                    transform: `scale(${badgeSpring})`,
                    background: COLORS.ng,
                    borderRadius: 12,
                    padding: "12px 28px",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                }}
            >
                <span style={{ fontSize: 28 }}>❌</span>
                <span style={{ fontSize: 28, fontWeight: 900, color: COLORS.textWhite }}>NG</span>
            </div>

            {/* Mockup */}
            <div
                style={{
                    opacity: mockupOpacity,
                    width: 950,
                    background: "rgba(255,107,107,0.04)",
                    border: `1px solid rgba(255,107,107,0.15)`,
                    borderRadius: 24,
                    padding: 48,
                    position: "relative",
                }}
            >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 24 }}>
                    <div
                        style={{
                            width: 64,
                            height: 64,
                            borderRadius: "50%",
                            background: `linear-gradient(135deg, ${COLORS.ng}, #ee5a24)`,
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
                            background: "rgba(255,255,255,0.05)",
                            border: `1px solid rgba(255,255,255,0.1)`,
                            borderRadius: "4px 20px 20px 20px",
                            padding: "28px 36px",
                            flex: 1,
                            minHeight: 100,
                            position: "relative",
                        }}
                    >
                        <span style={{ fontSize: 28, lineHeight: 1.8, color: COLORS.textGray }}>
                            {displayedText}
                            {charsToShow < ngScript.length && frame >= typeStart && (
                                <span style={{ opacity: Math.sin(frame * 0.15) > 0 ? 1 : 0, color: COLORS.ng }}>|</span>
                            )}
                        </span>

                        {/* X Stamp overlay */}
                        {stampScale > 0 && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    right: 40,
                                    transform: `translateY(-50%) scale(${stampScale}) rotate(-12deg)`,
                                    fontSize: 80,
                                    color: COLORS.ng,
                                    fontWeight: 900,
                                    opacity: 0.8,
                                }}
                            >
                                ✕
                            </div>
                        )}
                    </div>

                    {/* Sleeping viewer */}
                    <div
                        style={{
                            opacity: sleepOpacity,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 4,
                        }}
                    >
                        <span style={{ fontSize: 48 }}>😴</span>
                        <span style={{ fontSize: 18, color: COLORS.textGray }}>💤</span>
                    </div>
                </div>

                {/* "やりがち" label */}
                <div
                    style={{
                        position: "absolute",
                        top: -16,
                        right: 30,
                        opacity: yarigachiOpacity,
                        background: COLORS.ng,
                        borderRadius: 8,
                        padding: "6px 20px",
                    }}
                >
                    <span style={{ fontSize: 20, fontWeight: 700, color: COLORS.textWhite }}>⚠️ やりがち！</span>
                </div>
            </div>

            {/* Problems list */}
            <div style={{ display: "flex", gap: 40, marginTop: 40 }}>
                {problems.map((prob, i) => {
                    const delay = problemBaseDelay + Math.round(i * 1 * fps);
                    const probSpring = spring({ frame, fps, delay, config: { damping: 200 } });
                    return (
                        <div
                            key={i}
                            style={{
                                opacity: probSpring,
                                transform: `translateY(${interpolate(probSpring, [0, 1], [20, 0])}px)`,
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                fontSize: 24,
                                color: COLORS.ng,
                            }}
                        >
                            <span>⚠️</span>
                            <span>{prob}</span>
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};
