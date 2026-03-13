// Scene 1: Opening - Title screen (0:00~0:15, 15s = 450 frames)
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { COLORS, FONT_FAMILY } from "./styles";
import { Particles } from "./Particles";

export const Scene1Opening: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Title animation
    const titleScale = spring({ frame, fps, config: { damping: 200 }, durationInFrames: Math.round(1 * fps) });
    const titleOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], { extrapolateRight: "clamp" });

    // Subtitle animation (delayed)
    const subDelay = Math.round(1.5 * fps);
    const subOpacity = interpolate(frame, [subDelay, subDelay + fps], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const subY = interpolate(frame, [subDelay, subDelay + fps], [20, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // Mic icon animation
    const micScale = spring({ frame, fps, delay: Math.round(0.8 * fps), config: { damping: 12 } });

    return (
        <AbsoluteFill
            style={{
                background: `linear-gradient(135deg, ${COLORS.bgGrad1} 0%, ${COLORS.bgGrad2} 50%, ${COLORS.bgMain} 100%)`,
                fontFamily: FONT_FAMILY,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Audio src={staticFile("audio/scene1.mp3")} />
            <Particles count={40} />

            {/* Mic Icon */}
            <div style={{ fontSize: 72, transform: `scale(${micScale})`, marginBottom: 20 }}>🎙️</div>

            {/* Title */}
            <div
                style={{
                    fontSize: 72,
                    fontWeight: 900,
                    color: COLORS.textWhite,
                    opacity: titleOpacity,
                    transform: `scale(${0.8 + titleScale * 0.2})`,
                    textAlign: "center",
                    letterSpacing: 4,
                }}
            >
                ライバーの役割と全体像
            </div>

            {/* Subtitle */}
            <div
                style={{
                    fontSize: 28,
                    color: COLORS.textGray,
                    opacity: subOpacity,
                    transform: `translateY(${subY}px)`,
                    marginTop: 24,
                    letterSpacing: 2,
                }}
            >
                〜 "売上を作るMC" になるための第一歩 〜
            </div>

            {/* Bottom accent line */}
            <div
                style={{
                    position: "absolute",
                    bottom: 60,
                    width: interpolate(frame, [0, 2 * fps], [0, 300], { extrapolateRight: "clamp" }),
                    height: 3,
                    background: `linear-gradient(90deg, transparent, ${COLORS.accent}, transparent)`,
                }}
            />
        </AbsoluteFill>
    );
};
