import { Camera, makeScene2D, Txt } from "@motion-canvas/2d";
import { all, createRef, easeInOutCubic, waitFor } from "@motion-canvas/core";
import { DrawnBox } from "../components/drawnBox.tsx";
import { CatppuccinColors } from "../components/colors.tsx";

export default makeScene2D(function* (view) {
  const logo = createRef<Txt>();
  const cameraRef = createRef<Camera>();

  const baseGagAccBox = createRef<DrawnBox>();
  const gagTrackMasteryBox = createRef<DrawnBox>();
  const cogDefenceBox = createRef<DrawnBox>();
  const stunBox = createRef<DrawnBox>();
  const sosBox = createRef<DrawnBox>();
  const staticTxt = createRef<Txt>();
  const dynamicTxt = createRef<Txt>();

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
      <Camera ref={cameraRef}>
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
        <DrawnBox
          ref={stunBox}
          width={500}
          height={200}
          title="Stun"
        />
        <DrawnBox
          ref={sosBox}
          width={500}
          height={200}
          title="SOS Toons"
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
        <Txt
          ref={dynamicTxt}
          x={600}
          y={-1000}
          text="Dynamic Accuracy"
          fill={CatppuccinColors.Text}
          fontWeight={700}
          fontFamily="twilio sans mono"
          fontSize={60}
        />
      </Camera>
    </>,
  );

  yield* all(
    baseGagAccBox().drawBox(0),
    baseGagAccBox().setColor(CatppuccinColors.Peach, 0),
    gagTrackMasteryBox().drawBox(0),
    gagTrackMasteryBox().setColor(CatppuccinColors.Red, 0),
    cogDefenceBox().drawBox(0),
    cogDefenceBox().setColor(CatppuccinColors.Sky),
    cameraRef().centerOn(stunBox(), 0),
    cameraRef().zoom(8, 0, easeInOutCubic),
    cameraRef().rotation(180, 0, easeInOutCubic),

    stunBox().drawBox(0),
    stunBox().moveTextAbove(0),
  );

  yield* all(
    cameraRef().zoom(1, 2, easeInOutCubic),
    cameraRef().rotation(0, 2, easeInOutCubic),
  );

  yield* all(
    stunBox().moveTextInside(1),
    stunBox().setColor(CatppuccinColors.Mauve, 1),
    stunBox().position.y(-200, 1),
  );


  yield * all (
    stunBox().position.x(600, 1),
    dynamicTxt().position.y(-400, 1),
  )

  yield* waitFor(1);

  yield * sosBox().drawBox(1);

  yield* waitFor(1);

  yield* all(
    sosBox().moveTextAbove(),
    cameraRef().centerOn(sosBox(), 2),
    cameraRef().zoom(8, 2, easeInOutCubic),
    cameraRef().rotation(180, 2, easeInOutCubic),
  );
});
