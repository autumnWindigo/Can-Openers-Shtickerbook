
import { Camera, makeScene2D, Txt } from "@motion-canvas/2d";
import { all, createRef, easeInOutCubic, waitFor } from "@motion-canvas/core";
import { CatppuccinColors } from "../components/colors";
import { DrawnBox } from "../components/drawnBox";

export default makeScene2D(function* (view) {
  const logo = createRef<Txt>();
  const cameraRef = createRef<Camera>();

  const baseGagAccBox = createRef<DrawnBox>();
  const gagTrackMasteryBox = createRef<DrawnBox>();
  const cogDefenceBox = createRef<DrawnBox>();

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
          title="Gag Track Mastery"
        />
        <DrawnBox
          ref={cogDefenceBox}
          width={500}
          height={200}
          title="Cog Defence"
        />
      </Camera>
    </>
  )


  yield * all (
    baseGagAccBox().drawBox(0),
    baseGagAccBox().setColor(CatppuccinColors.Peach, 0),

    gagTrackMasteryBox().drawBox(0),
    gagTrackMasteryBox().moveTextAbove(0),

    cameraRef().centerOn(gagTrackMasteryBox(), 0),
    cameraRef().zoom(8, 0, easeInOutCubic),
    cameraRef().rotation(180, 0, easeInOutCubic),
  )

  yield * all (
    cameraRef().zoom(1, 2, easeInOutCubic),
    cameraRef().rotation(0, 2, easeInOutCubic),
  )

  yield * all(
    gagTrackMasteryBox().moveTextInside(1),
    gagTrackMasteryBox().setColor(CatppuccinColors.Green, 1),
    gagTrackMasteryBox().position.y(-50, 1)
  )

  yield * gagTrackMasteryBox().position.x(-600, 1)

  yield * waitFor(1)

  yield * cogDefenceBox().drawBox()

  yield * waitFor(1)

  yield * all (
    cogDefenceBox().moveTextAbove(),
    cameraRef().centerOn(cogDefenceBox(), 2),
    cameraRef().zoom(8, 2, easeInOutCubic),
    cameraRef().rotation(180, 2, easeInOutCubic),
  )

})
