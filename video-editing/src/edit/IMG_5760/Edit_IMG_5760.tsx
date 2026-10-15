// Komposisi IMG_5760 sesuai plans/IMG_5760-plan.json (final, disetujui Adrian).
// Track: 1 speaker · 2 grafik half/full · 3 on-screen UI · 4 caption · 5 progress tracker · 6 transisi (flash di Scene02).
import { AbsoluteFill } from "remotion";
import { Captions } from "./Captions";
import { Sound } from "./Sound";
import { Speaker } from "./Speaker";
import { Tracker } from "./Tracker";
import { Scene01_Hook_PikirPikir } from "./scenes/Scene01_Hook_PikirPikir";
import { Scene02_Caption_ClaudeSeKeren } from "./scenes/Scene02_Caption_ClaudeSeKeren";
import { Scene03_Caption_PakeHP } from "./scenes/Scene03_Caption_PakeHP";
import { Scene04_HalfScreen_100Persen } from "./scenes/Scene04_HalfScreen_100Persen";
import { Scene05_Caption_TanpaCapCut } from "./scenes/Scene05_Caption_TanpaCapCut";
import { Scene06_FullScreen_Hasilnya } from "./scenes/Scene06_FullScreen_Hasilnya";
import { Scene07_Caption_60Menit } from "./scenes/Scene07_Caption_60Menit";
import { Scene08_Caption_GampangBanget } from "./scenes/Scene08_Caption_GampangBanget";
import { Scene09_HalfScreen_InstallRemotion } from "./scenes/Scene09_HalfScreen_InstallRemotion";
import { Scene10_Caption_ClaudePro } from "./scenes/Scene10_Caption_ClaudePro";
import { Scene11_FullScreen_Prompting } from "./scenes/Scene11_FullScreen_Prompting";
import { Scene12_HalfScreen_BeforeAfter } from "./scenes/Scene12_HalfScreen_BeforeAfter";
import { Scene13_CTA_KomenClaude } from "./scenes/Scene13_CTA_KomenClaude";

export const Edit_IMG_5760: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    {/* Track 1 */}
    <Speaker />
    {/* Track 2: half / full screen */}
    <Scene04_HalfScreen_100Persen />
    <Scene09_HalfScreen_InstallRemotion />
    <Scene12_HalfScreen_BeforeAfter />
    <Scene06_FullScreen_Hasilnya />
    <Scene11_FullScreen_Prompting />
    {/* Track 3: on-screen UI */}
    <Scene01_Hook_PikirPikir />
    <Scene02_Caption_ClaudeSeKeren />
    <Scene03_Caption_PakeHP />
    <Scene05_Caption_TanpaCapCut />
    <Scene07_Caption_60Menit />
    <Scene08_Caption_GampangBanget />
    <Scene10_Caption_ClaudePro />
    <Scene13_CTA_KomenClaude />
    {/* Track 4 + 5 */}
    <Captions />
    <Tracker />
    {/* Audio: SFX per keluarga (sfx-cues.ts) */}
    <Sound />
  </AbsoluteFill>
);
