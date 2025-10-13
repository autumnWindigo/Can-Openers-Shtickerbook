import { makeScene2D, Spline, Txt } from "@motion-canvas/2d";
import { all, createRef, Reference, sequence, waitFor } from "@motion-canvas/core";
import { Pill } from "../components/Pill";
import { Gag } from "../components/Gag";
import gagsJson from "../data/gags.json";
import { CatppuccinColors } from "../components/colors";
import { AnimationPresets } from "../components/animations";

export default makeScene2D(function* (view) {
  // Create your animations here

  const pills: Reference<Pill>[] = [];
  const gags: Gag[] = gagsJson;
  const soundGags = gags.filter((gag) => gag.GagType === "Sound");

  for (let i = 0; i < soundGags.length; i++) {
    pills.push(createRef<Pill>());
  }

  const title = createRef<Txt>();
  const subTitle = createRef<Txt>();
  const currentGagTrackRef = createRef<Txt>();
  const lineRefTop = createRef<Spline>();
  const lineRefBottom = createRef<Spline>();
  const accuracyNote = createRef<Txt>();
  const logo = createRef<Txt>();

  view.add(
    <>
      {pills.map((ref, i) => (
        <Pill
          ref={ref}
          x={0}
          y={700}
          radius={45}
          fill={CatppuccinColors.Blue}
          text={soundGags[i].GagName}
          imgSrc={soundGags[i].Resource}
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
        x={-480}
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
        text="Sound"
        fill={CatppuccinColors.Blue}
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
      />
    </>
  )

  yield * AnimationPresets.fadeInDown(currentGagTrackRef())

  // Load Pills
  yield * sequence (
    0.2,
    ...pills.map((p, i) => all(
      p().position.y(-325 + i * 115, 0.8),
      p().expand(350, 1.2)
    ))
  )

  yield * waitFor(1)

  // Swap to Accuracy Numbers
  yield * all (
    ...pills.map((p, i) => p().setText(String(soundGags[i].Accuracy) + "%", 150)),
  );

  yield * waitFor(1)

  view.add(
  <>
    <Spline
      ref={lineRefTop}
      points={[
        [pills[0]().position.x() + pills[0]().getWidth() + 10, pills[0]().position.y()],
        [pills[0]().position.x() + pills[0]().getWidth() + 50, pills[0]().position.y()],
        [pills[0]().position.x() + pills[0]().getWidth() + 50, pills[3]().position.y() - 75],
      ]}
      stroke={CatppuccinColors.Text}
      lineWidth={8}
      smoothness={0}
      end={0}
    />
    <Spline
      ref={lineRefBottom}
      points={[
        [pills[0]().position.x() + pills[0]().getWidth() + 10, pills[6]().position.y()],
        [pills[0]().position.x() + pills[0]().getWidth() + 50, pills[6]().position.y()],
        [pills[0]().position.x() + pills[0]().getWidth() + 50, pills[3]().position.y() + 75],
      ]}
      stroke={CatppuccinColors.Text}
      lineWidth={8}
      smoothness={0}
      end={0}
    />
    <Txt
      ref={accuracyNote}
      x={pills[0]().position.x() + pills[0]().getWidth() + 300}
      y={pills[3]().y() }
      text="Same Accuracy"
      fill={CatppuccinColors.Text}
      fontWeight={400}
      fontFamily="twilio sans mono"
      fontSize={40}
    />,
  </>
  )

  yield * all(
    lineRefTop().start(0, 1.5),
    lineRefTop().end(1, 1.5),
    lineRefBottom().start(0, 1.5),
    lineRefBottom().end(1, 1.5),
    AnimationPresets.fadeInStill(accuracyNote()),
    accuracyNote().position.x(pills[0]().position.x() + pills[0]().getWidth() + 150, 0.5),
    ...pills.map((p) => p().setColor(CatppuccinColors.Sky, 1.5)),
  );

  yield * waitFor(1)

  yield * all(
    lineRefTop().start(0, 1),
    lineRefTop().end(0, 1),
    lineRefBottom().start(0, 1),
    lineRefBottom().end(0, 1),
    AnimationPresets.fadeOutStill(accuracyNote()),
    ...pills.map((p) => p().setColor(CatppuccinColors.Blue, 1.5)),
  )

  yield * sequence( 0.05,
    ...pills.map((p) => all(
        p().position.y(-1000, 0.8),
        p().expand(25, 0.5)
    ))
  )

  yield * AnimationPresets.fadeOutUp(currentGagTrackRef())

})
