import { makeScene2D, Txt } from "@motion-canvas/2d";
import { all, createRef, easeOutCubic, Reference, sequence, waitFor } from "@motion-canvas/core";
import { Pill } from "../components/Pill";
import { Gag } from "../components/Gag";
import gagsJson from "../data/gags.json";
import { CatppuccinColors } from "../components/colors";
import { AnimationPresets } from "../components/animations";

export default makeScene2D(function* (view) {
  // Create your animations here

  const pills: Reference<Pill>[] = [];
  const gags: Gag[] = gagsJson;
  const throwGags = gags.filter((gag) => gag.GagType === "Throw");
  const GAG_IMG_DIR = "../../public/data/";

  for (let i = 0; i < throwGags.length; i++) {
    pills.push(createRef<Pill>());
  }

  const title = createRef<Txt>();
  const subTitle = createRef<Txt>();
  const currentGagTrackRef = createRef<Txt>();
  const logo = createRef<Txt>();

  view.add(
    <>
      {pills.map((ref, i) => (
        <Pill
          ref={ref}
          x={0}
          y={700}
          radius={45}
          fill={CatppuccinColors.Peach}
          text={throwGags[i].GagName}
          imgSrc={throwGags[i].Resource}
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
        text="Throw"
        fill={CatppuccinColors.Peach}
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
      p().position.y(-325 + i * 115, 0.5),
      p().expand(350, 0.5)
    ))
  )

  yield * waitFor(1)

  // Swap to Accuracy Numbers
  yield * all (
    ...pills.map((p, i) => p().setText(String(throwGags[i].Accuracy) + "%", 150)),
  );

  yield * waitFor(1)

    yield * sequence( 0.05,
    ...pills.map((p) => all(
        p().position.y(-1000, 0.5),
        p().expand(25, 0.5)
    ))
  )

  yield * all (
    AnimationPresets.fadeOutUp(currentGagTrackRef()),
    title().position.x(-460, 0.5, easeOutCubic)
  )
})
