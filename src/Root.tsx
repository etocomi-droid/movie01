import "./index.css";
import { Composition } from "remotion";
import { LiverVideo, TOTAL_DURATION_FRAMES } from "./LiverVideo";
import { loadFont } from "@remotion/google-fonts/NotoSansJP";

// Load Noto Sans JP font (side effect - preloads the font)
loadFont("normal", {
  weights: ["400", "500", "700", "900"],
  subsets: ["latin"],
});

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="LiverVideo"
        component={LiverVideo}
        durationInFrames={TOTAL_DURATION_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
