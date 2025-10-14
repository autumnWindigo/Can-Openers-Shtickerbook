
import { Camera, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { all, createRef, easeInOutCubic, waitFor, Reference, sequence } from "@motion-canvas/core";
import { CatppuccinColors } from "../components/colors";
import { Pill } from "../components/Pill";
import { CogDefenceTable } from "../components/Cog";
import { AnimationPresets } from "../components/animations";


export default makeScene2D(function* (view) {
  const cameraRef = createRef<Camera>();

  const logo = createRef<Txt>();
  const title = createRef<Txt>();
  const tipOneRect = createRef<Txt>();

  const baseCogHelperTxt = createRef<Txt>();
  const baseCogsPills: Array<Reference<Pill>> = []
  const specialCogsPills: Array<Reference<Pill>> = []
  const specialCogsPillsText = [
    `Level 13-14: ${CogDefenceTable[13]} ⃰`,
    `Supervisors: ${CogDefenceTable[13]} ⃰`,
    `Level 15-20: ${CogDefenceTable[15]} ⃰`,
    "The Boiler: PERFECT"
  ]

  const baseCogGelperPill = createRef<Pill>

  for (let i = 0; i < 12; i++) {
    baseCogsPills.push(createRef<Pill>());
  }

  for (let i = 0; i < 4; i++) {
    specialCogsPills.push(createRef<Pill>());
  }

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
        zIndex={999}
        opacity={100}
      />
      <Txt
        ref={title}
        x={0}
        y={-400}
        text="Cog Defence"
        fill={CatppuccinColors.Sky}
        fontWeight={700}
        fontFamily="twilio sans mono"
        fontSize={60}
        opacity={100}
      />
      {baseCogsPills.map((ref, i) => (
        <Pill
          ref={ref}
          x={i < 6 ? -400 : 0}
          y={700}
          radius={40}
          fill={CatppuccinColors.LatteBase}
          text={`Level ${i+1}: ${CogDefenceTable[i+1]}`}
          imgSrc={"/gear.png"}
        />
      ))}
      {specialCogsPills.map((ref, i) => (
        <Pill
          ref={ref}
          x={450}
          y={700}
          radius={40}
          fill={CatppuccinColors.LatteBase}
          text={specialCogsPillsText[i]}
          imgSrc={"/gear.png"}
        />
      ))}
      <Txt
        ref={baseCogHelperTxt}
        x={0}
        y={450}
        text="Gag Track Mastery: 0%"
        fill={CatppuccinColors.Text}
        fontWeight={700}
        fontFamily="twilio sans mono"
        fontSize={60}
        opacity={0}
      />,
      <Rect
        ref={tipOneRect}
        fill={CatppuccinColors.Base}
        width={400}
        height={100}
        radius={40}
        y={1000}
        x={450}
        opacity={100}
      >
        <Txt
          width={350}
          margin={10}
          text="Unconfirmed ⃰"
          fill={CatppuccinColors.Text}
          fontWeight={400}
          fontFamily="twilio sans mono"
          fontSize={35}
          lineHeight={45}
          textAlign="center"
          textWrap
          opacity={100}
        />
      </Rect>
    </>
  )


  // Load Pills
  yield * sequence (
    0.2,
    ...baseCogsPills.map((p, i) => {
      const indexInColumn = i % 6;
      const yTarget = -200 + indexInColumn * 100

    return all (
      p().position.y(yTarget, 0.8),
      p().expand(300, 1.2)
      );
    }),
    ...specialCogsPills.map((p, i) => {
      const indexInColumn = i % 6;
      const yTarget = -200 + indexInColumn * 100

    return all (
      p().position.y(yTarget, 0.8),
      p().expand(400, 1.2)
      );
    }),
    tipOneRect().position.y(250, 1.2, easeInOutCubic)
  )

  yield * waitFor(2)

  yield * sequence (0.1,
    ...baseCogsPills.map((p) => (
      p().opacity(0.4, 1)
    ))
  )

  yield * waitFor(1)

  yield * all(
    ...baseCogsPills.map((p) => (
      p().opacity(1, 1)
    ))
  )

  yield * AnimationPresets.fadeInUp(baseCogHelperTxt())

  yield * waitFor(2)

  yield * sequence (0.1,
    ...specialCogsPills.map((p) => (
      p().opacity(0.4, 1)
    ))
  )

  yield * all(
    AnimationPresets.typeText(baseCogHelperTxt, "Gag Track Mastery: 10%", 0.8),
    ...baseCogsPills.map((p, i) => (
      p().setText(`Level ${i+1}: ${CogDefenceTable[i+1]+10}`, 300)
    ))
  )

  yield * waitFor(2)

  yield * all(
    AnimationPresets.typeText(baseCogHelperTxt, "Gag Track Mastery: 20%", 0.8),
    ...baseCogsPills.map((p, i) => (
      p().setText(`Level ${i+1}: ${CogDefenceTable[i+1]+20}`, 300)
    ))
  )

  yield * waitFor(2)
})


function *highlightMasteryIncrease(pills: Array<Reference<Pill>>, text: Reference<Txt>, mastery: number) {


}
