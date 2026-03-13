// Scene 10: Summary + Ending (4:35~5:00, 25s = 750 frames)
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { COLORS, FONT_FAMILY } from "./styles";
import { Particles } from "./Particles";

export const Scene10Summary: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const durationInFrames = Math.round(25 * fps);

    // Header
    const headerSpring = spring({ frame, fps, config: { damping: 200 } });

    // Main conclusion reappear
    const mainDelay = Math.round(1.5 * fps);
    const mainSpring = spring({ frame, fps, delay: mainDelay, config: { damping: 200 } });
    const mainScale = interpolate(mainSpring, [0, 1], [0.85, 1]);

    // Sub message stages
    const sub1Delay = Math.round(4 * fps);
    const sub1Opacity = interpolate(frame, [sub1Delay, sub1Delay + 0.5 * fps], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const sub2Delay = Math.round(5 * fps);
    const sub2Opacity = interpolate(frame, [sub2Delay, sub2Delay + 0.5 * fps], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const sub3Delay = Math.round(6 * fps);
    const sub3Opacity = interpolate(frame, [sub3Delay, sub3Delay + 0.5 * fps], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // "Next" CTA
    const nextDelay = Math.round(7.5 * fps);
    const nextSpring = spring({ frame, fps, delay: nextDelay, config: { damping: 200 } });

    // Fade out at end
    const fadeOutStart = durationInFrames - Math.round(1 * fps);
    const fadeOut = interpolate(frame, [fadeOutStart, durationInFrames], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // Zoom out at end
    const zoomOut = interpolate(frame, [fadeOutStart, durationInFrames], [1, 0.95], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill
            style={{
                background: `linear-gradient(135deg, ${COLORS.bgGrad1} 0%, ${COLORS.bgGrad2} 50%, ${COLORS.bgMain} 100%)`,
                fontFamily: FONT_FAMILY,
                justifyContent: "center",
                alignItems: "center",
                opacity: fadeOut,
                transform: `scale(${zoomOut})`,
            }}
        >
            <Audio src={staticFile("audio/scene10.mp3")} />
            <Particles count={40} />

            {/* Header */}
            <div
                style={{
                    position: "absolute",
                    top: 60,
                    fontSize: 36,
                    fontWeight: 700,
                    color: COLORS.accent,
                    opacity: headerSpring,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                }}
            >
                <span>📌</span>
                <span>まとめ</span>
            </div>

            {/* Main conclusion */}
            <div
                style={{
                    opacity: mainSpring,
                    transform: `scale(${mainScale})`,
                    textAlign: "center",
                }}
            >
                <div style={{ fontSize: 28, color: COLORS.textGray, marginBottom: 16 }}>ライバー ＝</div>
                <div
                    style={{
                        fontSize: 64,
                        fontWeight: 900,
                        color: COLORS.textWhite,
                        padding: "24px 60px",
                        border: `2px solid ${COLORS.good}`,
                        borderRadius: 20,
                        background: "rgba(0,210,211,0.08)",
                        boxShadow: `0 0 60px rgba(0,210,211,0.15)`,
                    }}
                >
                    売上を作るMC
                </div>
            </div>

            {/* Sub messages */}
            <div style={{ marginTop: 48, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                <div
                    style={{
                        opacity: sub1Opacity,
                        fontSize: 26,
                        color: COLORS.textGray,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                    }}
                >
                    この型で<span style={{ color: COLORS.accent, fontWeight: 700 }}>"再現"</span>できれば
                </div>
                <div style={{ opacity: sub2Opacity, display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{ fontSize: 24, color: COLORS.textGray }}>→</span>
                    <span style={{ fontSize: 26, color: COLORS.good, fontWeight: 600 }}>配信は安定</span>
                </div>
                <div style={{ opacity: sub3Opacity, display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{ fontSize: 24, color: COLORS.textGray }}>→</span>
                    <span style={{ fontSize: 26, color: COLORS.good, fontWeight: 600 }}>改善もしやすい</span>
                </div>
            </div>

            {/* Next CTA */}
            <div
                style={{
                    position: "absolute",
                    bottom: 80,
                    opacity: nextSpring,
                    transform: `translateX(${interpolate(nextSpring, [0, 1], [30, 0])}px)`,
                    fontSize: 30,
                    color: COLORS.textWhite,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                }}
            >
                <span>次へ進みましょう</span>
                <span style={{ color: COLORS.accent, fontSize: 36 }}>→</span>
            </div>
        </AbsoluteFill>
    );
};
