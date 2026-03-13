import React, { useMemo } from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "./styles";

export const Particles: React.FC<{ count?: number; color?: string }> = ({
    count = 30,
    color = COLORS.accent,
}) => {
    const frame = useCurrentFrame();

    const particles = useMemo(() => {
        return Array.from({ length: count }, (_, i) => ({
            x: (i * 137.5) % 100,
            y: (i * 73.1) % 100,
            size: 2 + (i % 5) * 1.5,
            speed: 0.3 + (i % 4) * 0.15,
            opacity: 0.15 + (i % 3) * 0.1,
        }));
    }, [count]);

    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                overflow: "hidden",
                pointerEvents: "none",
            }}
        >
            {particles.map((p, i) => {
                const yPos = (p.y + frame * p.speed * 0.15) % 110 - 5;
                const xOffset = Math.sin((frame * 0.02 + i) * 0.5) * 20;
                const currentOpacity = interpolate(
                    Math.sin(frame * 0.03 + i * 0.5),
                    [-1, 1],
                    [p.opacity * 0.5, p.opacity],
                );
                return (
                    <div
                        key={i}
                        style={{
                            position: "absolute",
                            left: `${p.x + xOffset * 0.1}%`,
                            top: `${yPos}%`,
                            width: p.size,
                            height: p.size,
                            borderRadius: "50%",
                            backgroundColor: color,
                            opacity: currentOpacity,
                        }}
                    />
                );
            })}
        </div>
    );
};
