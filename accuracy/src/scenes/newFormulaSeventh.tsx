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
  const lureBonusBox = createRef<DrawnBox>();
  const trapBonusBox = createRef<DrawnBox>();
  const staticTxt = createRef<Txt>();
  const dynamicTxt = createRef<Txt>();
  const lureTxt = createRef<Txt>();

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
          x={300}
          y={-100}
        />
        <DrawnBox
          ref={sosBox}
          width={500}
          height={200}
          title="SOS Toons"
          x={300}
          y={50}
        />
        <DrawnBox
          ref={lureBonusBox}
          width={500}
          height={200}
          title="Lure Bonus"
        />
        <DrawnBox
          ref={trapBonusBox}
          width={500}
          height={200}
          title="Trap Bonus"
          y={50}
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
          y={-400}
          text="Dynamic Accuracy"
          fill={CatppuccinColors.Text}
          fontWeight={700}
          fontFamily="twilio sans mono"
          fontSize={60}
        />
        <Txt
          ref={lureTxt}
          x={0}
          y={-1000}
          text="Lure Accuracy"
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
    stunBox().drawBox(0),
    stunBox().setColor(CatppuccinColors.Mauve),
    sosBox().drawBox(0),
    sosBox().setColor(CatppuccinColors.Mauve),

    cameraRef().centerOn(lureBonusBox(), 0),
    cameraRef().zoom(8, 0, easeInOutCubic),
    cameraRef().rotation(180, 0, easeInOutCubic),

    lureBonusBox().drawBox(0),
    lureBonusBox().moveTextAbove(0),

  );

  yield* all(
    cameraRef().zoom(1, 2, easeInOutCubic),
    cameraRef().rotation(0, 2, easeInOutCubic),
  );

  yield* all(
    lureBonusBox().moveTextInside(1),
    lureBonusBox().setColor(CatppuccinColors.Green, 1),
    lureBonusBox().position.y(-200, 1),
    lureTxt().position.y(-400, 1)
  );

  yield* waitFor(1);

  yield* trapBonusBox().drawBox(1);

  yield* waitFor(1);

  yield* all(
    trapBonusBox().moveTextAbove(),
    cameraRef().centerOn(trapBonusBox(), 2),
    cameraRef().zoom(15, 2, easeInOutCubic),
    cameraRef().rotation(180, 2, easeInOutCubic),
  );
});
