import { Camera, makeScene2D, Txt } from "@motion-canvas/2d";
import { all, createRef, easeInOutCubic, waitFor } from "@motion-canvas/core";
import { CatppuccinColors } from "../components/colors";
import { DrawnBox } from "../components/drawnBox";

export default makeScene2D(function* (view) {
  const logo = createRef<Txt>();
  const cameraRef = createRef<Camera>();

  const baseGagAccBox = createRef<DrawnBox>();
  const gagTrackMasteryBox = createRef<DrawnBox>();

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
          title="Base Gag Accuracy"
        />
        <DrawnBox
          ref={gagTrackMasteryBox}
          width={500}
          height={200}
          title="Gag Track Mastery"
        />
      </Camera>
    </>
  )


  yield * all (
    baseGagAccBox().drawBox(0),
    baseGagAccBox().moveTextAbove(0),
    cameraRef().centerOn(baseGagAccBox(), 0),
    cameraRef().zoom(8, 0, easeInOutCubic),
    cameraRef().rotation(180, 0, easeInOutCubic),
  )

  yield * all (
    cameraRef().zoom(1, 2, easeInOutCubic),
    cameraRef().rotation(0, 2, easeInOutCubic),
  )

  yield * all(
    baseGagAccBox().setColor(CatppuccinColors.Peach),
    baseGagAccBox().moveTextInside(1),
    baseGagAccBox().position.y(-300, 1),
  )
  yield * baseGagAccBox().position.x(-600, 1)

  yield * waitFor(1)

  yield * gagTrackMasteryBox().drawBox()

  yield * waitFor(1)

  yield * all (
    gagTrackMasteryBox().moveTextAbove(),
    cameraRef().centerOn(gagTrackMasteryBox(), 2),
    cameraRef().zoom(8, 2, easeInOutCubic),
    cameraRef().rotation(180, 2, easeInOutCubic),
  )
})
