import { makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { Pill } from "../components/Pill";
import { all, createRef, Reference, sequence, waitFor } from "@motion-canvas/core";
import { Gag } from "../components/Gag";
import gagsJson from "../data/gags.json";
import { CatppuccinColors } from "../components/colors";
import { AnimationPresets } from "../components/animations";

export default makeScene2D(function* (view) {
  // Create your animations here

  const pills: Reference<Pill>[] = [];
  const gags: Gag[] = gagsJson;
  const trapGags = gags.filter((gag) => gag.GagType === "Trap");
  const GAG_IMG_DIR = "../../public/data/";

  for (let i = 0; i < trapGags.length; i++) {
    pills.push(createRef<Pill>());
  }

  const title = createRef<Txt>();
  const subTitle = createRef<Txt>();
  const currentGagTrackRef = createRef<Txt>();
  const conditionsRef = createRef<Txt>();
  const tipOneRect = createRef<Rect>();
  const tipTwoRect = createRef<Rect>();
  const tipThreeRect = createRef<Rect>();
  const logo = createRef<Txt>();

  view.add(
    <>
      {pills.map((ref, i) => (
        <Pill
          ref={ref}
          x={0}
          y={700}
          radius={45}
          fill={CatppuccinColors.Yellow}
          text={trapGags[i].GagName}
          imgSrc={trapGags[i].Resource}
        />
      ))}
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
        x={-490}
        y={0}
        text="Track"
        fill={CatppuccinColors.Text}
        fontWeight={700}
        fontFamily="twilio sans mono"
        fontSize={60}
      />,
      <Txt
        ref={currentGagTrackRef}
        x={-680}
        y={0}
        text="Trap"
        fill={CatppuccinColors.Yellow}
        fontWeight={700}
        fontFamily="twilio sans mono"
        fontSize={60}
        opacity={0}
      />,
      <Txt
        ref={subTitle}
        x={-pills[0]().getWidth() - 525}
        y={100}
        text="Base Gag Accuracy"
        fill={CatppuccinColors.Peach}
        fontWeight={500}
        fontFamily="twilio sans mono"
        fontSize={40}
        opacity={100}
      />,
      <Txt
        ref={conditionsRef}
        x={pills[0]().getWidth() + 525}
        y={-400}
        text="Miss Conditions"
        fill={CatppuccinColors.Text}
        fontWeight={700}
        fontFamily="twilio sans mono"
        fontSize={60}
        opacity={0}
      />,
      <Rect
        ref={tipOneRect}
        fill={CatppuccinColors.Base}
        width={400}
        height={200}
        radius={40}
        y={-200}
        x={pills[0]().getWidth() + 525}
        opacity={0}
      >
        <Txt
          width={350}
          margin={10}
          text="1: Two trap gags are used on the same cog"
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
        height={200}
        radius={40}
        y={50}
        x={pills[0]().getWidth() + 525}
        opacity={0}
      >
        <Txt
          width={350}
          margin={10}
          text="2: The cog is never lured"
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
        height={200}
        radius={40}
        y={300}
        x={pills[0]().getWidth() + 525}
        opacity={0}
      >
        <Txt
          width={350}
          margin={10}
          text="3: Railroad is placed over existing trap gags"
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
    </>
  );

  // Gag Track Title
  yield * all (
    AnimationPresets.fadeInDown(currentGagTrackRef()),
  )

  // Load Pills
  yield * sequence (
    0.2,
    ...pills.map((p, i) => all(
      p().position.y(-325 + i * 115, 0.8),
      p().expand(350, 1.2)
    ))
  )

  // Swap to Accuracy Numbers
  yield * all (
    ...pills.map((p) => p().setText("Perfect", 250))
  );

  yield * waitFor(1)

  yield * AnimationPresets.fadeInUp(conditionsRef());
  yield * AnimationPresets.fadeInUp(tipOneRect());
  yield * AnimationPresets.fadeInUp(tipTwoRect());
  yield * AnimationPresets.fadeInUp(tipThreeRect());

  yield * waitFor(1)


  yield * all(
    AnimationPresets.fadeOutUp(conditionsRef()),
    AnimationPresets.fadeOutUp(tipOneRect()),
    AnimationPresets.fadeOutUp(tipTwoRect()),
    AnimationPresets.fadeOutUp(tipThreeRect()),
  )

  yield * sequence( 0.05,
    ...pills.map((p) => all(
        p().position.y(-1000, 0.8),
        p().expand(25, 0.5)
    ))
  )

  yield * AnimationPresets.fadeOutUp(currentGagTrackRef())
})
