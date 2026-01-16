import { makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { all, createRef, waitFor } from "@motion-canvas/core";
import { CatppuccinColors } from "../components/colors.tsx";
import { AnimationPresets } from "../components/animations.ts";

export default makeScene2D(function* (view) {
  const logo = createRef<Txt>();
  const title = createRef<Txt>();

  const toonsHitTxt = createRef<Txt>();
  const attackSosTxt = createRef<Txt>();
  const tipOneRect = createRef<Rect>();
  const tipTwoRect = createRef<Rect>();
  const tipThreeRect = createRef<Rect>();
  const tipFourRect = createRef<Rect>();

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
        text="SOS Toons"
        fill={CatppuccinColors.Mauve}
        fontWeight={700}
        fontFamily="twilio sans mono"
        fontSize={60}
        opacity={0}
      />
      <Txt
        ref={toonsHitTxt}
        x={-600}
        y={-300}
        text="Toons Hit"
        fill={CatppuccinColors.Text}
        fontWeight={700}
        fontFamily="twilio sans mono"
        fontSize={60}
        opacity={0}
      />
      <Txt
        ref={attackSosTxt}
        x={600}
        y={-300}
        text="Attack SOS"
        fill={CatppuccinColors.Text}
        fontWeight={700}
        fontFamily="twilio sans mono"
        fontSize={60}
        opacity={0}
      />
      <Rect
        ref={tipOneRect}
        fill={CatppuccinColors.Base}
        width={400}
        height={250}
        radius={40}
        y={-100}
        x={-600}
        opacity={0}
      >
        <Txt
          width={350}
          margin={10}
          text="All levels grant toons a 75% accuracy increase buff."
          fill={CatppuccinColors.Text}
          fontWeight={400}
          fontFamily="twilio sans mono"
          fontSize={35}
          lineHeight={45}
          textAlign="center"
          textWrap
          opacity={100}
        />
      </Rect>
      <Rect
        ref={tipTwoRect}
        fill={CatppuccinColors.Base}
        width={400}
        height={250}
        radius={40}
        y={200}
        x={-600}
        opacity={0}
      >
        <Txt
          width={350}
          margin={10}
          text="While active assume all gags will have max (95%) accuracy."
          fill={CatppuccinColors.Text}
          fontWeight={400}
          fontFamily="twilio sans mono"
          fontSize={35}
          lineHeight={45}
          textAlign="center"
          textWrap
          opacity={100}
        />
      </Rect>
      <Rect
        ref={tipThreeRect}
        fill={CatppuccinColors.Base}
        width={400}
        height={250}
        radius={40}
        y={-100}
        x={600}
        opacity={0}
      >
        <Txt
          width={350}
          margin={10}
          text="Attacking SOS Toons make all gags of the same track 100% accurate."
          fill={CatppuccinColors.Text}
          fontWeight={400}
          fontFamily="twilio sans mono"
          fontSize={35}
          lineHeight={45}
          textAlign="center"
          textWrap
          opacity={100}
        />
      </Rect>
      <Rect
        ref={tipFourRect}
        fill={CatppuccinColors.Base}
        width={400}
        height={250}
        radius={40}
        y={200}
        x={600}
        opacity={0}
      >
        <Txt
          width={350}
          margin={10}
          text="Useful to end fights when low on laff or save a unite."
          fill={CatppuccinColors.Text}
          fontWeight={400}
          fontFamily="twilio sans mono"
          fontSize={35}
          lineHeight={45}
          textAlign="center"
          textWrap
          opacity={100}
        />
      </Rect>
    </>,
  );

  yield* AnimationPresets.fadeInUp(title());
  yield* waitFor(1);

  yield* AnimationPresets.fadeInDown(toonsHitTxt());
  yield* waitFor(1);

  yield* AnimationPresets.fadeInDown(attackSosTxt());
  yield* waitFor(1);

  yield* AnimationPresets.fadeInDown(tipOneRect());
  yield* waitFor(1);

  yield* AnimationPresets.fadeInDown(tipTwoRect());

  yield* waitFor(1);
  yield* AnimationPresets.fadeInDown(tipThreeRect());

  yield* waitFor(1);
  yield* AnimationPresets.fadeInDown(tipFourRect());

  yield* waitFor(1);

  yield* all(
    AnimationPresets.fadeOutUp(tipOneRect()),
    AnimationPresets.fadeOutUp(tipTwoRect()),
    AnimationPresets.fadeOutUp(tipThreeRect()),
    AnimationPresets.fadeOutUp(tipFourRect()),
    AnimationPresets.fadeOutUp(toonsHitTxt()),
    AnimationPresets.fadeOutUp(attackSosTxt()),
  );

  yield* AnimationPresets.fadeOutUp(title());
});
