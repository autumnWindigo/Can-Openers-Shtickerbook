import { makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { all, createRef, easeInCirc, easeInOutCubic, Reference, sequence, waitFor } from "@motion-canvas/core";
import { CatppuccinColors } from "../components/colors.tsx";
import { AnimationPresets } from "../components/animations.ts";
import { Pill } from "../components/Pill.tsx";
import { Gag } from "../components/Gag";
import gagsJson from "../data/gags.json";

export default makeScene2D(function* (view) {
  const logo = createRef<Txt>();
  const title = createRef<Txt>();

  const gags: Gag[] = gagsJson;
  const lureGags = gags.filter((gag) => gag.GagType === "Lure");
  const pills: Reference<Pill>[] = [];
  for (let i = 0; i < lureGags.length - 1; i++) {
    pills.push(createRef<Pill>());
  }

  const comboPills: Reference<Pill>[] = [];
  for (let i = 0; i < 4; i++) {
    comboPills.push(createRef<Pill>());
  }

  const singleTargetTxt = createRef<Txt>();
  const multiTargetTxt = createRef<Txt>();
  const comboDesignTxt = createRef<Txt>();
  const finalAccuracyTxt = createRef<Txt>();

  const tipOneRect = createRef<Rect>();
  const tipTwoRect = createRef<Rect>();
  const tipThreeRect = createRef<Rect>();
  const tipFourRect = createRef<Rect>();
  const snarkyTip = createRef<Rect>();

  const tntPills: Reference<Pill>[] = [];
  for (let i = 0; i < 5; i++) {
    tntPills.push(createRef<Pill>());
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
        text="Trap Bonus"
        fill={CatppuccinColors.Green}
        fontWeight={700}
        fontFamily="twilio sans mono"
        fontSize={60}
        opacity={0}
      />
      {pills.map((ref, i) => (
        <Pill
          ref={ref}
          x={0}
          y={1000}
          radius={45}
          fill={CatppuccinColors.Green}
          text={`${lureGags[i].Damage}% Base`}
          imgSrc={lureGags[i].Resource}
        />
      ))}
      {tntPills.map((ref) => (
        <Pill
          ref={ref}
          x={0}
          y={800}
          radius={45}
          fill={CatppuccinColors.Yellow}
          text="+10%"
          imgSrc="gags/inventory_tnt.png"
        />
      ))}
      {comboPills.map((ref) => (
        <Pill
          ref={ref}
          x={-1200}
          y={0}
          radius={45}
          fill={CatppuccinColors.Yellow}
          text="."
          imgSrc={lureGags[0].Resource}
        />
      ))}
      <Txt
        ref={singleTargetTxt}
        x={-500}
        y={-300}
        text="Single Target"
        fill={CatppuccinColors.Text}
        fontWeight={700}
        fontFamily="twilio sans mono"
        fontSize={60}
        opacity={0}
      />
      <Txt
        ref={multiTargetTxt}
        x={500}
        y={-300}
        text="Multi Target"
        fill={CatppuccinColors.Text}
        fontWeight={700}
        fontFamily="twilio sans mono"
        fontSize={60}
        opacity={0}
      />
      <Txt
        ref={comboDesignTxt}
        x={-500}
        y={-300}
        text="Combo Design"
        fill={CatppuccinColors.Text}
        fontWeight={700}
        fontFamily="twilio sans mono"
        fontSize={60}
        opacity={0}
      />
      <Txt
        ref={finalAccuracyTxt}
        x={-500}
        y={450}
        text="Accuracy: 75%"
        fill={CatppuccinColors.Text}
        fontWeight={400}
        fontFamily="twilio sans mono"
        fontSize={60}
        opacity={0}
      />
      <Txt
        ref={snarkyTip}
        x={0}
        y={400}
        text="*It's actuall very inoptimal but that's outside the scope of this video."
        fill={CatppuccinColors.Text}
        fontWeight={300}
        fontFamily="twilio sans mono"
        fontSize={40}
        opacity={0}
      />
      <Rect
        ref={tipOneRect}
        fill={CatppuccinColors.Base}
        width={400}
        height={250}
        radius={40}
        y={0}
        x={-500}
        opacity={0}
      >
        <Txt
          width={350}
          margin={10}
          text="+10% Accuracy added if trap is placed in front of targeted cog."
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
      <Rect
        ref={tipTwoRect}
        fill={CatppuccinColors.Base}
        width={400}
        height={250}
        radius={40}
        y={0}
        x={500}
        opacity={0}
      >
        <Txt
          width={350}
          margin={10}
          text="+10% Accuracy added for first trap placed"
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
      <Rect
        ref={tipThreeRect}
        fill={CatppuccinColors.Base}
        width={400}
        height={250}
        radius={40}
        y={300}
        x={500}
        opacity={0}
      >
        <Txt
          width={350}
          margin={10}
          text="+5% Accuracy for subsequent trap placements"
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
      <Rect
        ref={tipFourRect}
        fill={CatppuccinColors.Base}
        width={1400}
        height={600}
        radius={40}
        y={0}
        x={0}
        opacity={0}
      >
        <Txt
          width={1350}
          margin={10}
          text="Trap and Lure are designed to be used together. It is NOT a waste to leave a cog alive to guarantee a lure connection with double lure."
          fill={CatppuccinColors.Text}
          fontWeight={400}
          fontFamily="twilio sans mono"
          fontSize={50}
          lineHeight={80}
          textAlign="center"
          textWrap
          opacity={100}
        />
      </Rect>
    </>,
  );

  yield* AnimationPresets.fadeInDown(title());

  yield* waitFor(1);

  yield* sequence(
    0.2,
    AnimationPresets.fadeInDown(singleTargetTxt()),
    AnimationPresets.fadeInDown(multiTargetTxt()),
    ...pills.map((p, i) => {
      if (i%2 === 0) {
        return all(
          p().expand(20),
          p().position.x(-650 + Math.floor(i / 2)*150, 1, easeInOutCubic),
          p().position.y(-200, 1, easeInOutCubic),
        );
      } else {
        return all(
          p().expand(20),
          p().position.x(350 + Math.floor(i / 2)*150, 1, easeInOutCubic),
          p().position.y(-200, 1, easeInOutCubic),
        );
      }
    }),
  );

  yield* waitFor(1);

  yield* AnimationPresets.fadeInDown(tipOneRect());

  yield* all(
    tntPills[0]().position.y(200, 1, easeInOutCubic),
    tntPills[0]().position.x(-500, 1, easeInOutCubic),
    tntPills[0]().expand(250, 1.2)
  )

  yield* waitFor(1);

  yield* all (
    pills[4]().position.x(pills[4]().position.x() + 100, 1),
    pills[4]().expand(250, 1)
  )

  yield* waitFor(1);


  yield* sequence(1,
    AnimationPresets.fadeInDown(tipTwoRect()),
    AnimationPresets.fadeInDown(tipThreeRect()),
  )

  yield* all(
    AnimationPresets.fadeOutUp(singleTargetTxt()),
    AnimationPresets.fadeOutUp(tipOneRect())
  )

  yield* all(
    tntPills[0]().position.x(-1200, 1, easeInOutCubic),

    ...pills.map((p, i) => {
      if (i%2 === 0) {
        return all(
          p().expand(25, 0.5),
          p().position.x(-1200, 1, easeInOutCubic)
        );
      }
    })
  )

  yield* waitFor(1);

  yield* AnimationPresets.fadeInDown(comboDesignTxt());

  yield* all(
    comboPills[0]().setImage("gags/inventory_hypno_goggles.png", 0),
    comboPills[0]().setText("75% Base", 250),
    comboPills[0]().setColor(CatppuccinColors.Green, 0),

    ...comboPills.slice(1).map(p => {
      return all(
        p().expand(20),
        p().setImage("gags/inventory_tnt.png"),
      )
    })
  )

  yield* waitFor(1);

  yield* sequence(0.2,
    ...comboPills.map((p, i) => {
      return all (
        p().position.x(-500, 1, easeInOutCubic),
        p().position.y(-150 + (i*150), 1),
      )
    }),
    AnimationPresets.fadeInUp(finalAccuracyTxt()),
  )

  yield* waitFor(1)

  yield* sequence(0.2,
    comboPills[1]().setText("+10%", 150),
    ...comboPills.slice(2).map((p) => {
      return all (
        p().setText("+5%", 150)
      )
    }),
    AnimationPresets.typeText(finalAccuracyTxt, "Accuracy: 95%", 1)
  )

  yield* waitFor(1);

  yield* sequence(0.2,
    comboPills[0]().setText("65% Base", 250),
    comboPills[0]().setImage(lureGags[3].Resource),
    AnimationPresets.typeText(finalAccuracyTxt, "Accuracy: 85%", 1)
  )

  yield* waitFor(1);

  yield* all(
    comboPills[1]().setText("+20%", 150),
    comboPills[1]().setImage(lureGags[3].Resource),
    comboPills[1]().setColor(CatppuccinColors.Green, 1),

    comboPills[2]().setText("+10%", 150),

    AnimationPresets.typeText(finalAccuracyTxt, "Accuracy: 95%", 1)
  )

  yield* waitFor(1);

  yield* all(
    AnimationPresets.fadeOutUp(comboDesignTxt()),
    AnimationPresets.fadeOutUp(multiTargetTxt()),
    AnimationPresets.fadeOutUp(finalAccuracyTxt()),
    AnimationPresets.fadeOutUp(tipTwoRect()),
    AnimationPresets.fadeOutUp(tipThreeRect())
  )

  yield* waitFor(1);

  yield* sequence(0.2,
    ...pills.map(p => p().position.y(1000, 1, easeInOutCubic)),
    ...comboPills.map(p => p().position.y(1000, 1, easeInOutCubic)),
  )

  yield* AnimationPresets.fadeInUp(tipFourRect())
  yield* AnimationPresets.fadeInUp(snarkyTip())

  yield* waitFor(1);

  yield* AnimationPresets.fadeOutUp(tipFourRect())
  yield* AnimationPresets.fadeOutUp(snarkyTip())
  yield* AnimationPresets.fadeOutUp(title())
});
