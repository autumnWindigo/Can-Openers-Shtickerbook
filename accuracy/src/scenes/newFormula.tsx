import { Camera, makeScene2D, Txt } from "@motion-canvas/2d";
import { all, createRef, easeInOutCubic, waitFor } from "@motion-canvas/core";
import { CatppuccinColors } from "../components/colors";
import { DrawnBox } from "../components/drawnBox";

export default makeScene2D(function* (view) {
  const logo = createRef<Txt>();
  const cameraRef = createRef<Camera>();

  const baseGagAccBox = createRef<DrawnBox>();

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
      </Camera>
    </>
  )

  yield * baseGagAccBox().drawBox()

  yield * waitFor(2)

  yield * baseGagAccBox().moveTextAbove(1),

  yield * all (
    cameraRef().centerOn(baseGagAccBox(), 2),
    cameraRef().zoom(8, 2, easeInOutCubic),
    cameraRef().rotation(180, 2, easeInOutCubic),
  )

})
