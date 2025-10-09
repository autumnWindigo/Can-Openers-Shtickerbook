import { makeScene2D, Spline, Txt } from "@motion-canvas/2d";
import { all, createRef, delay, fadeTransition, range, sequence, waitFor } from "@motion-canvas/core";
import type { Reference } from "@motion-canvas/core";
import { Pill } from "../components/Pill";
import { Gag } from "../components/Gag";
import gagsJson from "../../public/data/gags.json";
import { AnimationPresets } from "../components/animations";
import { CatppuccinColors } from "../components/colors";

export default makeScene2D(function* (view) {
  // Create your animations here

  const pills: Reference<Pill>[] = [];
  const gags: Gag[] = gagsJson;
  const toonUpGags = gags.filter((gag) => gag.GagType === "Toon-Up");
  const GAG_IMG_DIR = "../../public/data/";

  for (let i = 0; i < toonUpGags.length; i++) {
    pills.push(createRef<Pill>());
  }

  pills.forEach((ref, i) => {
    view.add(
      <Pill
        ref={ref}
        x={0}
        y={700}
        radius={45}
        fill={CatppuccinColors.Mauve}
        text={toonUpGags[i].GagName}
        imgSrc={GAG_IMG_DIR + toonUpGags[i].Resource}
      />,
    );
  });

  const title = createRef<Txt>();
  const currentGagTrackRef = createRef<Txt>();
  view.add(
    <>
      <Txt
        ref={title}
        x={-450}
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
        text="Toon-Up"
        fill={CatppuccinColors.Mauve}
        fontWeight={700}
        fontFamily="twilio sans mono"
        fontSize={60}
      />,
    </>
  );

  const subTitle = createRef<Txt>();
  view.add(
    <Txt
      ref={subTitle}
      x={-575}
      y={100}
      text="Base Gag Accuracy"
      fill={CatppuccinColors.Peach}
      fontWeight={500}
      fontFamily="twilio sans mono"
      fontSize={40}
      opacity={0}
    />,
  );

  // Load pills & Title
  yield * all (
    AnimationPresets.fadeInUp(title()),
    AnimationPresets.fadeInUp(currentGagTrackRef()),
    AnimationPresets.fadeInUp(subTitle())
  )

  yield * sequence (
    0.2,
    ...pills.map((p, i) => all(
      p().position.y(-325 + i * 115, 0.8),
      p().expand(350, 1.2)
    ))
  )

  yield * waitFor(1)

  // Change to Accuracy and load subtitle
  yield * all (
    ...pills.map((p, i) => p().setText(String(toonUpGags[i].Accuracy) + "%", 150))
  );

  yield * waitFor(1)

  // Highlight same Accuracy
  yield * all(
    ...pills.slice(0, -1).map(p => p().setColor(CatppuccinColors.Pink, 1))
  )

  const lineRefTop = createRef<Spline>();
  view.add(
    <Spline
      ref={lineRefTop}
      points={[
        [pills[0]().position.x() + pills[0]().getWidth() + 10, pills[0]().position.y()],
        [pills[0]().position.x() + pills[0]().getWidth() + 50, pills[0]().position.y()],
        [pills[0]().position.x() + pills[0]().getWidth() + 50, pills[2]().position.y()],
      ]}
      stroke={CatppuccinColors.Text}
      lineWidth={8}
      smoothness={0}
      end={0}
    />
  )

  const lineRefBottom = createRef<Spline>();
  view.add(
    <Spline
      ref={lineRefBottom}
      points={[
        [pills[0]().position.x() + pills[0]().getWidth() + 10, pills[5]().position.y()],
        [pills[0]().position.x() + pills[0]().getWidth() + 50, pills[5]().position.y()],
        [pills[0]().position.x() + pills[0]().getWidth() + 50, pills[3]().position.y()],
      ]}
      stroke={CatppuccinColors.Text}
      lineWidth={8}
      smoothness={0}
      end={0}
    />
  );

  const accracyNote = createRef<Txt>();
  view.add(
    <Txt
      ref={accracyNote}
      x={pills[0]().position.x() + pills[0]().getWidth() + 300}
      y={pills[3]().y() - 55}
      text="Same Accuracy"
      fill={CatppuccinColors.Text}
      fontWeight={400}
      fontFamily="twilio sans mono"
      fontSize={40}
    />,
  );

  // Note & Line on same accuracy
  yield * all(
    lineRefTop().start(0, 1.5),
    lineRefTop().end(1, 1.5),
    lineRefBottom().start(0, 1.5),
    lineRefBottom().end(1, 1.5),
    AnimationPresets.fadeInStill(accracyNote()),
    accracyNote().position.x(pills[0]().position.x() + pills[0]().getWidth() + 200, 0.5)
  );

  yield * waitFor(1)

  yield * all(
    lineRefTop().start(0, 1),
    lineRefTop().end(0, 1),
    lineRefBottom().start(0, 1),
    lineRefBottom().end(0, 1),
    AnimationPresets.fadeOutStill(accracyNote()),
  )

  // Clean it all up
  yield * all(
    ...pills.slice(0, -1).map(p => p().setColor(CatppuccinColors.Mauve, 0.5)),
  )
  yield * sequence( 0.05,
    ...pills.map((p, i) => all(
        p().position.y(-1000, 0.8),
        p().expand(25, 0.5)
    ))
  )

  yield * all (
    AnimationPresets.fadeOutUp(currentGagTrackRef()),
    title().position.x(title().position.x() - 40, 0.5)
  )
});
