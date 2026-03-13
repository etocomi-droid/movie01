// Main Composition: Liver Video - ライバーの役割と全体像
// Total: 5 minutes = 300s = 9000 frames @30fps
import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

import { Scene1Opening } from "./Scene1Opening";
import { Scene2Conclusion } from "./Scene2Conclusion";
import { Scene3Premise } from "./Scene3Premise";
import { Scene4KPI } from "./Scene4KPI";
import { Scene5ThreePoints } from "./Scene5ThreePoints";
import { Scene6Good } from "./Scene6Good";
import { Scene7NG } from "./Scene7NG";
import { Scene8Risk } from "./Scene8Risk";
import { Scene9Drill } from "./Scene9Drill";
import { Scene10Summary } from "./Scene10Summary";

// Scene durations in seconds (total = ~300s with transitions)
const FPS = 30;
const TRANSITION_FRAMES = 15; // 0.5s crossfade

const scenes = [
    { component: Scene1Opening, durationSec: 15 },
    { component: Scene2Conclusion, durationSec: 25 },
    { component: Scene3Premise, durationSec: 25 },
    { component: Scene4KPI, durationSec: 30 },
    { component: Scene5ThreePoints, durationSec: 30 },
    { component: Scene6Good, durationSec: 40 },
    { component: Scene7NG, durationSec: 40 },
    { component: Scene8Risk, durationSec: 30 },
    { component: Scene9Drill, durationSec: 40 },
    { component: Scene10Summary, durationSec: 25 },
];

// Total scene frames = sum of all durations
// Total transition frames = (scenes.length - 1) * TRANSITION_FRAMES
// Actual duration = totalSceneFrames - totalTransitionFrames
const totalSceneFrames = scenes.reduce((sum, s) => sum + s.durationSec * FPS, 0);
const totalTransitionFrames = (scenes.length - 1) * TRANSITION_FRAMES;
export const TOTAL_DURATION_FRAMES = totalSceneFrames - totalTransitionFrames;

export const LiverVideo: React.FC = () => {
    const transitionChildren = [];
    for (let i = 0; i < scenes.length; i++) {
        const SceneComponent = scenes[i].component;
        const durationInFrames = scenes[i].durationSec * FPS;

        transitionChildren.push(
            <TransitionSeries.Sequence key={`seq-${i}`} durationInFrames={durationInFrames}>
                <SceneComponent />
            </TransitionSeries.Sequence>
        );

        if (i < scenes.length - 1) {
            transitionChildren.push(
                <TransitionSeries.Transition
                    key={`trans-${i}`}
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
                />
            );
        }
    }

    return (
        <AbsoluteFill style={{ backgroundColor: "#0f0f1a" }}>
            <TransitionSeries>
                {transitionChildren}
            </TransitionSeries>
        </AbsoluteFill>
    );
};
