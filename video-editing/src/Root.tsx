import { Composition } from "remotion";
import { BrandCheck } from "./BrandCheck";
import { VIDEO } from "./brand";
import { Edit_IMG_5760 } from "./edit/IMG_5760/Edit_IMG_5760";
import { DURATION_FRAMES as IMG_5760_FRAMES } from "./edit/IMG_5760/timing";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Placeholder untuk cek brand.ts. Komposisi video asli ditambah per project. */}
      <Composition
        id="BrandCheck"
        component={BrandCheck}
        durationInFrames={VIDEO.fps * 3}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
      />
      <Composition id="IMG-5760" component={Edit_IMG_5760} durationInFrames={IMG_5760_FRAMES} fps={VIDEO.fps} width={VIDEO.width} height={VIDEO.height} />
    </>
  );
};
