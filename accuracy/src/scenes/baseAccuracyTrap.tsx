import { makeScene2D, Txt } from "@motion-canvas/2d";
import { Pill } from "../components/Pill";
import { all, createRef, Reference, sequence, waitFor } from "@motion-canvas/core";
import { Gag } from "../components/Gag";
import gagsJson from "../../public/data/gags.json";
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

  pills.forEach((ref, i) => {
    view.add(
      <Pill
        ref={ref}
        x={0}
        y={700}
        radius={45}
        fill={CatppuccinColors.Yellow}
        text={trapGags[i].GagName}
        imgSrc={GAG_IMG_DIR + trapGags[i].Resource}
      />
    );
  });

  const title = createRef<Txt>();
  const subTitle = createRef<Txt>();
  const currentGagTrackRef = createRef<Txt>();
  view.add(
    <>
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
        x={-575}
        y={100}
        text="Base Gag Accuracy"
        fill={CatppuccinColors.Peach}
        fontWeight={500}
        fontFamily="twilio sans mono"
        fontSize={40}
        opacity={100}
    />,
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
    ...pills.map((p, i) => p().setText("Perfect", 250))
  );

  yield * waitFor(1)
})
