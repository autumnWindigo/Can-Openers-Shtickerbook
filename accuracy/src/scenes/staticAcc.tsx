import { makeScene2D, Txt } from "@motion-canvas/2d";
import { createRef, waitFor } from "@motion-canvas/core";
import { DrawnBox } from "../components/drawnBox.tsx";
import { CatppuccinColors } from "../components/colors.tsx";

export default makeScene2D(function* (view) {
  const baseGagAccBox = createRef<DrawnBox>();
  const gagTrackMasteryBox = createRef<DrawnBox>();
  const cogDefenceBox = createRef<DrawnBox>();
  const stunBox = createRef<DrawnBox>();
  const staticTxt = createRef<Txt>();
  const logo = createRef<Txt>();

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
        opacity={100}
        zIndex={999}
      />
      <DrawnBox
        ref={baseGagAccBox}
        width={500}
        height={200}
        x={-300}
        y={-100}
        title="Base Gag Accuracy"
      />
      <DrawnBox
        ref={gagTrackMasteryBox}
        width={500}
        height={200}
        x={-300}
        y={50}
        title="Gag Track Mastery"
      />
      <DrawnBox
        ref={cogDefenceBox}
        width={500}
        height={200}
        title="Cog Defence"
        y={200}
        x={-300}
      />
      <Txt
        ref={staticTxt}
        x={-600}
        y={-400}
        text="Static Accuracy"
        fill={CatppuccinColors.Text}
        fontWeight={700}
        fontFamily="twilio sans mono"
        fontSize={60}
      />
    </>,
  );

  yield* waitFor(1);
});
