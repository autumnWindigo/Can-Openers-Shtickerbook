import { Camera, makeScene2D, Txt } from "@motion-canvas/2d";
import { all, createRef, easeInOutCubic, waitFor } from "@motion-canvas/core";
import { CatppuccinColors } from "../components/colors";
import { DrawnBox } from "../components/drawnBox";
import { AnimationPresets } from "../components/animations.ts";

export default makeScene2D(function* (view) {
  const logo = createRef<Txt>();
  const cameraRef = createRef<Camera>();

  const baseGagAccBox = createRef<DrawnBox>();
  const gagTrackMasteryBox = createRef<DrawnBox>();
  const cogDefenceBox = createRef<DrawnBox>();
  const stunBox = createRef<DrawnBox>();
  const title = createRef<Txt>();

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
          y={-150}
          title="Base Gag Accuracy"
        />
        <DrawnBox
          ref={gagTrackMasteryBox}
          width={500}
          height={200}
          x={-300}
          y={0}
          title="Gag Track Mastery"
        />
        <DrawnBox
          ref={cogDefenceBox}
          width={500}
          height={200}
          title="Cog Defence"
        />
        <DrawnBox
          ref={stunBox}
          width={500}
          height={200}
          title="Stun"
        />
        <Txt
          ref={title}
          x={-600}
          y={-600}
          text="Static Accuracy"
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
    gagTrackMasteryBox().setColor(CatppuccinColors.Green, 0),
    cogDefenceBox().moveTextAbove(0),
    cogDefenceBox().drawBox(0),
    cameraRef().centerOn(cogDefenceBox(), 0),
    cameraRef().zoom(8, 0, easeInOutCubic),
    cameraRef().rotation(180, 0, easeInOutCubic),
  );

  yield* all(
    cameraRef().zoom(1, 2, easeInOutCubic),
    cameraRef().rotation(0, 2, easeInOutCubic),
  );

  yield* all(
    cogDefenceBox().moveTextInside(1),
    cogDefenceBox().setColor(CatppuccinColors.Sky, 1),
    cogDefenceBox().position.y(300, 1),
  );

  yield* cogDefenceBox().position.x(-600, 1);

  yield* waitFor(1);

  // Show Static Accuracy
  yield* all(
    baseGagAccBox().position.y(baseGagAccBox().position.y() + 50, 1),
    gagTrackMasteryBox().position.y(gagTrackMasteryBox().position.y() + 50, 1),
    cogDefenceBox().position.y(cogDefenceBox().position.y() + 50, 1),
    title().position.y(-420, 1)
  );

  yield* waitFor(1);

  yield* stunBox().drawBox(1);

  yield* waitFor(1);

  yield* all(
    stunBox().moveTextAbove(),
    cameraRef().centerOn(stunBox(), 2),
    cameraRef().zoom(8, 2, easeInOutCubic),
    cameraRef().rotation(180, 2, easeInOutCubic),
  );
});
