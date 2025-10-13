
import { makeScene2D, Rect, Spline, Txt } from "@motion-canvas/2d";
import { Pill } from "../components/Pill";
import { all, createRef, easeInOutCubic, easeOutCubic, Reference, sequence, waitFor } from "@motion-canvas/core";
import { Gag } from "../components/Gag";
import gagsJson from "../data/gags.json";
import { CatppuccinColors } from "../components/colors";
import { AnimationPresets } from "../components/animations";

export default makeScene2D(function* (view) {
  // Create your animations here

  const pills: Reference<Pill>[] = [];
  const orgPills: Reference<Pill>[] = [];
  const gags: Gag[] = gagsJson;
  const lureGags = gags.filter((gag) => gag.GagType === "Lure");
  const GAG_IMG_DIR = "../../public/data/";

  for (let i = 0; i < lureGags.length; i++) {
    pills.push(createRef<Pill>());
    orgPills.push(createRef<Pill>());
  }

  const title = createRef<Txt>();
  const subTitle = createRef<Txt>();
  const currentGagTrackRef = createRef<Txt>();
  const isNotOrganicTextRef = createRef<Txt>();
  const isOrganicTextRef = createRef<Txt>();
  const tipOneRect = createRef<Rect>();
  const logo = createRef<Txt>();

  view.add(
    <>
      {pills.map((ref, i) => (
        <Pill
          ref={ref}
          x={0}
          y={700}
          radius={45}
          fill={CatppuccinColors.Green}
          text={lureGags[i].GagName}
          imgSrc={lureGags[i].Resource}
        />
      ))}
      {orgPills.map((ref, i) => (
        <Pill
          ref={ref}
          x={pills[0]().getWidth() + 400}
          y={700}
          radius={45}
          fill={CatppuccinColors.Green}
          text={String(lureGags[i].OrgDamage) + "%"}
          imgSrc={lureGags[i].Resource}
        />
      ))}
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
        x={-490}
        y={0}
        text="Track"
        fill={CatppuccinColors.Text}
        fontWeight={700}
        fontFamily="twilio sans mono"
        fontSize={60}
      />,
      <Txt
        ref={currentGagTrackRef}
        x={-680}
        y={0}
        text="Lure"
        fill={CatppuccinColors.Green}
        fontWeight={700}
        fontFamily="twilio sans mono"
        fontSize={60}
        opacity={0}
      />,
      <Txt
        ref={subTitle}
        x={-pills[0]().getWidth() - 525}
        y={100}
        text="Base Gag Accuracy"
        fill={CatppuccinColors.Peach}
        fontWeight={500}
        fontFamily="twilio sans mono"
        fontSize={40}
        opacity={100}
      />,
      <Txt
        ref={isNotOrganicTextRef}
        y={-450}
        text="Non Organic"
        fill={CatppuccinColors.Subtext0}
        fontWeight={300}
        fontFamily="twilio sans mono"
        fontSize={60}
        opacity={0}
      />,
      <Txt
        ref={isOrganicTextRef}
        y={-450}
        x={pills[0]().getWidth() + 400}
        text="Organic"
        fill={CatppuccinColors.Subtext0}
        fontWeight={300}
        fontFamily="twilio sans mono"
        fontSize={60}
        opacity={0}
      />,
      <Rect
        ref={tipOneRect}
        fill={CatppuccinColors.Base}
        width={400}
        height={200}
        radius={40}
        y={300}
        x={-pills[0]().getWidth() - 525}
        opacity={0}
      >
        <Txt
          width={350}
          margin={10}
          text="Organic lure gives +10% accuracy on all lure gags"
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
  yield * AnimationPresets.fadeInDown(currentGagTrackRef())

  // Load pills
  yield * sequence (
    0.2,
    ...pills.map((p, i) => all(
      p().position.y(-325 + i * 115, 0.8),
      p().expand(350, 1.2)
    ))
  )

  yield * waitFor(1)

  // Swap to Accuracy Numbers
  yield * all (
    ...pills.map((p, i) => p().setText(String(lureGags[i].Damage) + "%", 150)),
    AnimationPresets.fadeInDown(isNotOrganicTextRef())
  );

  yield * waitFor(1)
  yield * sequence (
    0.2,
    ...orgPills.map((p, i) => all(
      p().position.y(-325 + i * 115, 0.8),
      p().expand(150, 1.2)
    ))
  )

  yield * all (
    AnimationPresets.fadeInDown(isOrganicTextRef()),
    AnimationPresets.fadeInDown(tipOneRect())
  )

  yield * waitFor(1)

  yield * all(
    ...[0,1,2,4,6].map(i => all(
      pills[i]().position.x(1100, 1, easeInOutCubic),
      orgPills[i]().position.x(1100, 1, easeInOutCubic),
      pills[i]().expand(25, 1),
      orgPills[i]().expand(25, 1)
    ))
  )

  yield * all (
    pills[3]().position.y(pills[0]().position.y(), 1, easeOutCubic),
    orgPills[3]().position.y(pills[0]().position.y(), 1, easeOutCubic),
    pills[5]().position.y(pills[1]().position.y(), 1, easeOutCubic),
    orgPills[5]().position.y(pills[1]().position.y(), 1, easeOutCubic)
  )

  const orgLine = createRef<Spline>();
  view.add(
    <>
      <Spline
        ref={orgLine}
        points={[
          [pills[5]().position.x() + pills[5]().getWidth() - 50, pills[5]().position.y()],
          [orgPills[3]().position.x() - pills[3]().getWidth() + 50, pills[3]().position.y()],
        ]}
        stroke={CatppuccinColors.Text}
        lineWidth={8}
        smoothness={0}
        end={0}
      />
    </>
  )

  yield * all(
    orgLine().start(0, 0.5),
    orgLine().end(1, 0.5),
  )

  yield * waitFor(1)

  yield * all(
    orgLine().start(0, 0.5),
    orgLine().end(0, 0.5),
    orgPills[3]().position.y(pills[1]().position.y(), 0.5, easeOutCubic),
    orgPills[5]().position.y(pills[2]().position.y(), 0.5, easeOutCubic)
  )

  const orgLineTwo = createRef<Spline>();
  view.add(
        <Spline
        ref={orgLineTwo}
        points={[
          [pills[5]().position.x() + pills[5]().getWidth() - 50, pills[5]().position.y()],
          [orgPills[3]().position.x() - pills[3]().getWidth() + 50, pills[5]().position.y()]
        ]}
        stroke={CatppuccinColors.Text}
        lineWidth={8}
        smoothness={0}
        end={0}
      />
  )

  yield * all(
    orgLineTwo().start(0, 0.5),
    orgLineTwo().end(1, 0.5),
  )

  yield * waitFor(1)

  yield * all(
    orgLineTwo().start(0, 0.5),
    orgLineTwo().end(0, 0.5),
  )

  yield * all(
    AnimationPresets.fadeOutUp(isOrganicTextRef()),
    AnimationPresets.fadeOutUp(isNotOrganicTextRef()),
    AnimationPresets.fadeOutUp(tipOneRect()),
    ...[3,5].map(i => all(
      pills[i]().position.x(1100, 1, easeInOutCubic),
      orgPills[i]().position.x(1100, 1, easeInOutCubic),
      pills[i]().expand(25, 1),
      orgPills[i]().expand(25, 1)
    ))
  )

  yield * all(
    AnimationPresets.fadeOutUp(currentGagTrackRef()),
    title().position.x(-480, 0.5, easeOutCubic)
  )
})
