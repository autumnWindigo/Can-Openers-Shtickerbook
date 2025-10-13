import { makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { Pill } from "../components/Pill";
import { all, createRef, Reference, sequence, waitFor } from "@motion-canvas/core";
import { Gag } from "../components/Gag";
import gagsJson from "../data/gags.json";
import { CatppuccinColors } from "../components/colors";
import { AnimationPresets } from "../components/animations";

export default makeScene2D(function* (view) {
  const pills: Reference<Pill>[] = [];
  const gags: Gag[] = gagsJson;
  const soundGags = gags.filter((gag) => gag.GagType === "Sound");

  for (let i = 0; i < soundGags.length; i++) {
    pills.push(createRef<Pill>());
  }

  const logo = createRef<Txt>();
  const title = createRef<Txt>();
  const subTitle = createRef<Txt>();
  const fogBubbleRef = createRef<Pill>();
  const whistleBubbleRef = createRef<Pill>();
  const tipOneRect = createRef<Rect>();
  const descRef = createRef<Txt>();

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

      {pills.map((ref, i) => (
        <Pill
          ref={ref}
          x={-750 + i*250}
          y={700}
          radius={45}
          fill={CatppuccinColors.Blue}
          text=""
          imgSrc={soundGags[i].Resource}
        />
      ))}
      <Txt
        ref={title}
        x={0}
        y={-400}
        text="All Tracks"
        fill={CatppuccinColors.Text}
        fontWeight={700}
        fontFamily="twilio sans mono"
        fontSize={60}
        opacity={0}
      />,
      <Txt
        ref={subTitle}
        x={0}
        y={-300}
        text="Gag Track Mastery"
        fill={CatppuccinColors.Green}
        fontWeight={500}
        fontFamily="twilio sans mono"
        fontSize={40}
        opacity={0}
      />,
      <Pill
        ref={fogBubbleRef}
        radius={45}
        y={700}
        x={250}
        fill={CatppuccinColors.Blue}
        text={soundGags[5].GagName}
        imgSrc={soundGags[5].Resource}
      />,
      <Pill
        ref={whistleBubbleRef}
        radius={45}
        y={700}
        x={-250}
        fill={CatppuccinColors.Blue}
        text={soundGags[1].GagName}
        imgSrc={soundGags[1].Resource}
      />

      <Rect
        ref={tipOneRect}
        fill={CatppuccinColors.Base}
        width={400}
        height={200}
        radius={40}
        y={-350}
        x={500}
        opacity={0}
      >
        <Txt
          width={350}
          margin={10}
          text="Track Mastery is about a Toons skill, not the gag being used."
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
      <Txt
        ref={descRef}
        x={0}
        y={400}
        text="Whistle is highest gag unlocked"
        fill={CatppuccinColors.Text}
        fontWeight={400}
        fontFamily="twilio sans mono"
        fontSize={50}
        opacity={0}
      />,
    </>
  )

  // Load Pills
  yield * sequence (
    0.2,
    ...pills.map((p) => all(
      p().position.y(0, 0.8),
      p().expand(20, 1.2)
    ))
  )

  // Set to trackXP bonus
  yield * all (
    AnimationPresets.fadeInUp(title()),
    AnimationPresets.fadeInUp(subTitle()),
    ...pills.map((p, i) => all (
      p().setText("+" + String(10*i) + "%", 125)
    ))
  )

  yield * waitFor(1)

  // Expand down the line
  yield * sequence ( 0.2,
    ...pills.map((p) => all (
      AnimationPresets.growShrink(p())
    ))
  )

  yield * AnimationPresets.fadeInUp(tipOneRect())
  yield * waitFor(1)

  // whistle showcase
  yield all (
    AnimationPresets.growShrink(pills[1]()),
    AnimationPresets.fadeInUp(descRef())
  )
  yield * waitFor(1)

  yield * all (
    ...pills.slice(2).map((p) => all (
      p().opacity(0.4, 1),
      p().setText("---", 125)
    )),
    ...pills.slice(0,2).map((p) => all (
      p().setText("+10%", 125)
    ))
  )


  yield * waitFor(1)

  yield * all (
    ...pills.map((p, i) => all (
      p().setText("+" + String(10*i) + "%", 125),
      p().opacity(1,1),
      AnimationPresets.fadeOutDown(descRef())
    ))
  )

  yield * waitFor(1)
  descRef().text("Elephant is highest gag unlocked")

  yield * all (
    AnimationPresets.growShrink(pills[4]()),
    AnimationPresets.fadeInUp(descRef())
  )

  // elephant showcase
  yield * waitFor(1)

  yield * all (
    ...pills.slice(5).map((p) => all (
      p().opacity(0.4, 1),
      p().setText("---", 125)
    )),
    ...pills.slice(0,5).map((p) => all (
      p().setText("+40%", 125)
    ))
  )

  yield * waitFor(1)

  // Reset pills
  yield * all (
    ...pills.map((p, i) => all (
      p().setText("+" + String(10*i) + "%", 125),
      p().opacity(1,1),
      AnimationPresets.fadeOutDown(descRef())
    ))
  )

  yield * waitFor(1)

  // Opera showcase
  descRef().text("Opera is highest gag unlocked")
  yield * all (
    AnimationPresets.growShrink(pills[6]()),
    AnimationPresets.fadeInUp(descRef())
  )
  yield * waitFor(1)

  yield * all (
    ...pills.map((p) => all (
      p().setText("+60%", 125),
    ))
  )

  yield * waitFor(1)


  yield * all(
    ...pills.map((p, i) => all (
      p().setText("+" + String(10*i) + "%", 125),
      AnimationPresets.fadeOutDown(descRef())
    ))
  )

  // Overlapping gags showcase
  yield * waitFor(1)
  descRef().text("Toons of different mastery attack the same cog")


  yield * all(
    fogBubbleRef().position.y(200, 0.8),
    fogBubbleRef().expand(300, 1.2),
    whistleBubbleRef().position.y(200, 0.8),
    whistleBubbleRef().expand(300, 1.2)
  )
  yield * AnimationPresets.fadeInUp(descRef()),

  yield * waitFor(1)

  yield * AnimationPresets.growShrink(fogBubbleRef())

  yield * all (
    ...pills.slice(6).map((p) => all (
      p().opacity(0.4, 1),
      p().setText("---", 125)
    )),
    ...pills.slice(0,6).map((p) => all (
      p().setText("+50%", 125)
    )),
    whistleBubbleRef().opacity(0.4, 1),
  )

  yield * waitFor(1)

  // Clean Up
  yield * all (
    AnimationPresets.fadeOutDown(descRef()),
    fogBubbleRef().expand(20, 0.8),
    whistleBubbleRef().expand(20, 0.8),
    fogBubbleRef().position.y(700, 0.8),
    whistleBubbleRef().position.y(700, 0.8),
  )

  yield * all (
    AnimationPresets.fadeOutUp(title()),
    AnimationPresets.fadeOutUp(subTitle()),
    AnimationPresets.fadeOutUp(tipOneRect()),
  )

  // Unload Pills
  yield * sequence (
    0.2,
    ...pills.map((p) => all(
      p().position.y(700, 0.8),
      p().expand(20, 1.2)
    )),
  )
})
