import { makeScene2D, Txt } from "@motion-canvas/2d";
import { createRef, waitFor } from "@motion-canvas/core";
import { CatppuccinColors } from "../components/colors";
import { AnimationPresets } from "../components/animations";
import { CogPanel } from "../components/Cog";

export default makeScene2D(function* (view) {

  const logo = createRef<Txt>();
  const title = createRef<Txt>();
  const cogPanelTest = createRef<CogPanel>();

  view.add(
    <>
      <Txt
        ref={logo}
        text="Can Opener's Shtickerbook"
        fill={CatppuccinColors.Text}
        fontWeight={300}
        fontFamily="twilio sans mono"
        fontSize={35}
        y={-500}
        x={-680}
        zIndex={999}
        opacity={100}
      />
      <Txt
        ref={title}
        x={0}
        y={-400}
        text="Cog Defence"
        fill={CatppuccinColors.Sky}
        fontWeight={700}
        fontFamily="twilio sans mono"
        fontSize={60}
        opacity={0}
      />
      <CogPanel
        ref={cogPanelTest}
        level={8}
        suit={8}
        department="Sellbot"
        opacity={0}
      />
  </>
  )

  yield * AnimationPresets.fadeInUp(title());
  yield * AnimationPresets.fadeInUp(cogPanelTest());

  yield * cogPanelTest().growShrinkDefence();

  yield * waitFor(1)
})
