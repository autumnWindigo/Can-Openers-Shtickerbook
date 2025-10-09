import { Camera, Layout, makeScene2D, Rect, Spline, Txt } from "@motion-canvas/2d";
import { all, createRef, Direction, fadeTransition, slideTransition, waitFor, zoomInTransition } from "@motion-canvas/core";
import { CatppuccinColors } from "../components/colors";
import { AnimationPresets, AnimationConfig } from "../components/animations";

export default makeScene2D(function* (view) {

  // atkAcc = propAcc + trackExp + tgtDef + bonus
  const atkAcc = createRef<Txt>();
  const propAcc = createRef<Txt>();
  const trackExp = createRef<Txt>();
  const tgtDef = createRef<Txt>();
  const bonus = createRef<Txt>();
  const formulaRef = createRef<Rect>();
  const cameraRef = createRef<Camera>();

  view.add(
      <Rect
        ref={formulaRef}
        layout
        gap={40}
        justifyContent="center"
        opacity={100}
      >
        <Txt
          ref={atkAcc}
          text="atkAcc"
          fill={CatppuccinColors.Text}
          fontWeight={600}
          fontFamily="twilio sans mono"
          fontSize={60}
        />,
        <Txt
          text="="
          fill={CatppuccinColors.Text}
          fontWeight={600}
          fontFamily="twilio sans mono"
          fontSize={60}
        />,
        <Txt
          ref={propAcc}
          text="propAcc"
          fill={CatppuccinColors.Text}
          fontWeight={600}
          fontFamily="twilio sans mono"
          fontSize={60}
        />,
        <Txt
          text="+"
          fill={CatppuccinColors.Text}
          fontWeight={600}
          fontFamily="twilio sans mono"
          fontSize={60}
        />,
        <Txt
          ref={trackExp}
          text="trackExp"
          fill={CatppuccinColors.Text}
          fontWeight={600}
          fontFamily="twilio sans mono"
          fontSize={60}
        />,
        <Txt
          text="+"
          fill={CatppuccinColors.Text}
          fontWeight={600}
          fontFamily="twilio sans mono"
          fontSize={60}
        />,
        <Txt
          ref={tgtDef}
          text="tgtDef"
          fill={CatppuccinColors.Text}
          fontWeight={600}
          fontFamily="twilio sans mono"
          fontSize={60}
        />,
        <Txt
          text="+"
          fill={CatppuccinColors.Text}
          fontWeight={600}
          fontFamily="twilio sans mono"
          fontSize={60}
        />,
        <Txt
          ref={bonus}
          text="bonus"
          fill={CatppuccinColors.Text}
          fontWeight={600}
          fontFamily="twilio sans mono"
          fontSize={60}
        />,
      </Rect>
  );


  yield * AnimationPresets.fadeInUp(formulaRef())
  yield * formulaRef().position.y(-300, 1)

  // Reveal Total Accuracy
  const totalAccuracy = yield* revealLabelWithLine({
    view,
    label: "Total Accuracy",
    target: atkAcc(),
    formulaRef,
    color: CatppuccinColors.Red,
    yOffset: 200,
    lineOffsetBottom: 150
  });

  // Reveal Base Gag Accuracy
  const baseGagAccuracy = yield* revealLabelWithLine({
    view,
    label: "Base Gag Accuracy",
    target: propAcc(),
    formulaRef,
    color: CatppuccinColors.Peach,
    yOffset: 300,
    lineOffsetBottom: 250
  });

  // Reveal Track Mastery
  const trackMastery = yield* revealLabelWithLine({
    view,
    label: "Gag Track Mastery",
    target: trackExp(),
    formulaRef,
    color: CatppuccinColors.Green,
    yOffset: 400,
    lineOffsetBottom: 350
  });

  // Reveal Cog Defence
  const cogDefence = yield* revealLabelWithLine({
    view,
    label: "Cog Defence",
    target: tgtDef(),
    formulaRef,
    color: CatppuccinColors.Sky,
    yOffset: 300,
    lineOffsetBottom: 250
  });

  // Reveal bonus
  const stunLTB = yield* revealLabelWithLine({
    view,
    label: "Stun + LTB ⃰",
    target: bonus(),
    formulaRef,
    color: CatppuccinColors.Mauve,
    yOffset: 200,
    lineOffsetBottom: 150
  });

  const ltbTip = createRef<Txt>();
  view.add(
    <Txt
      ref={ltbTip}
      text=" ⃰ Lure & Trap bonus only affect lure gags on the same turn."
      fill={CatppuccinColors.Mauve}
      fontWeight={400}
      fontFamily="twilio sans mono"
      fontSize={40}
      y={480}
      x={200}
      opacity={0}
    />
  )

  yield * AnimationPresets.fadeInUp(ltbTip())

  yield * waitFor(1)

  yield* all(
    atkAcc().opacity(0.4, 0.5),
    bonus().opacity(0.4, 0.5),
    trackExp().opacity(0.4, 0.5),
    tgtDef().opacity(0.4, 0.5),
    totalAccuracy.txtRef().opacity(0.4, 0.5),
    trackMastery.txtRef().opacity(0.4, 0.5),
    cogDefence.txtRef().opacity(0.4, 0.5),
    stunLTB.txtRef().opacity(0.4, 0.5),
    totalAccuracy.lineRef().opacity(0.4, 0.5),
    trackMastery.lineRef().opacity(0.4, 0.5),
    cogDefence.lineRef().opacity(0.4, 0.5),
    stunLTB.lineRef().opacity(0.4, 0.5),
    propAcc().scale(1.2, 0.5).to(1, 0.3),
    baseGagAccuracy.txtRef().scale(1.2, 0.5).to(1, 0.3),
);

  const fadeRectRef = createRef<Rect>();
  view.add(
    <Rect
      ref={fadeRectRef}
      zIndex={999}
      fill={CatppuccinColors.Crust}
      opacity={0}
      height={1080}
      width={1920}
    />
  )

  yield * waitFor(1)
  yield * AnimationPresets.fadeInStill(fadeRectRef())



});

export function* revealLabelWithLine({
  view,
  label,
  target,
  formulaRef,
  color,
  yOffset = 200,
  lineOffsetTop = 50,
  lineOffsetBottom = 150,
  fontSize = 60,
  fontFamily = "twilio sans mono",
  fontWeight = 600,
}) {
  const txtRef = createRef<Txt>();
  const lineRef = createRef<Spline>();

  const x = target.position.x();
  const formulaY = formulaRef().position.y();

  // Create label
  view.add(
    <Txt
      ref={txtRef}
      x={x}
      y={formulaY + yOffset}
      text={label}
      fill={color}
      fontWeight={fontWeight}
      fontFamily={fontFamily}
      fontSize={fontSize}
      opacity={0}
    />,
  );

  // Create connector line
  view.add(
    <Spline
      ref={lineRef}
      points={[
        [x, formulaY + lineOffsetTop],
        [x, formulaY + lineOffsetBottom],
      ]}
      stroke={CatppuccinColors.Text}
      lineWidth={8}
      smoothness={0}
      end={0}
    />
  );

  // Animate in
  yield* all(
    lineRef().start(0, 0.5),
    lineRef().end(1, 0.5),
    target.fill(color, 0.5),
    AnimationPresets.fadeInUp(txtRef())
  );

  return {txtRef, lineRef};
}
