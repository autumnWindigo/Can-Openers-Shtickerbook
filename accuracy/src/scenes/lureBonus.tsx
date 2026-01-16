import { makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import {
  all,
  createRef,
  easeInOutCubic,
  Reference,
  sequence,
  waitFor,
} from "@motion-canvas/core";
import { CatppuccinColors } from "../components/colors.tsx";
import { AnimationPresets } from "../components/animations.ts";
import { Gag } from "../components/Gag";
import gagsJson from "../data/gags.json";
import { Pill } from "../components/Pill.tsx";

export default makeScene2D(function* (view) {
  const gags: Gag[] = gagsJson;
  const lureGags = gags.filter((gag) => gag.GagType === "Lure");
  const pills: Reference<Pill>[] = [];
  for (let i = 0; i < lureGags.length - 1; i++) {
    pills.push(createRef<Pill>());
  }

  const logo = createRef<Txt>();
  const title = createRef<Txt>();
  const singleTargetTxt = createRef<Txt>();
  const multiTargetTxt = createRef<Txt>();
  const tierTxt = createRef<Txt>();
  const tierOneTxt = createRef<Txt>();
  const tierTwoTxt = createRef<Txt>();
  const tierThreeTxt = createRef<Txt>();
  const tipOneRect = createRef<Rect>();
  const tierHelperTxt = createRef<Txt>();

  const hypnoPill = createRef<Pill>();
  const bigMagnetPill = createRef<Pill>();
  const miniMagnetPill = createRef<Pill>();

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
      />,
      <Txt
        ref={title}
        x={0}
        y={-400}
        text="Lure Bonus"
        fill={CatppuccinColors.Green}
        fontWeight={700}
        fontFamily="twilio sans mono"
        fontSize={60}
        opacity={0}
      />
      {pills.map((ref, i) => (
        <Pill
          ref={ref}
          x={i % 2 !== 0 ? 500 : -500}
          y={700}
          radius={45}
          fill={CatppuccinColors.Green}
          text={lureGags[i].GagName}
          imgSrc={lureGags[i].Resource}
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
        ref={tierTxt}
        x={0}
        y={400}
        text="Lure is sorted into three tiers"
        fill={CatppuccinColors.Text}
        fontWeight={400}
        fontFamily="twilio sans mono"
        fontSize={60}
        opacity={0}
      />
      <Txt
        ref={tierOneTxt}
        x={0}
        y={-150}
        text="Tier One"
        fill={CatppuccinColors.Text}
        fontWeight={400}
        fontFamily="twilio sans mono"
        fontSize={60}
        opacity={0}
      />
      <Txt
        ref={tierTwoTxt}
        x={0}
        y={0}
        text="Tier Two"
        fill={CatppuccinColors.Text}
        fontWeight={400}
        fontFamily="twilio sans mono"
        fontSize={60}
        opacity={0}
      />
      <Txt
        ref={tierThreeTxt}
        x={0}
        y={150}
        text="Tier Three"
        fill={CatppuccinColors.Text}
        fontWeight={400}
        fontFamily="twilio sans mono"
        fontSize={60}
        opacity={0}
      />
      <Txt
        ref={tierHelperTxt}
        x={0}
        y={400}
        text="The highest tier lure is the 'base'"
        fill={CatppuccinColors.Text}
        fontWeight={400}
        fontFamily="twilio sans mono"
        fontSize={60}
        opacity={0}
      />
      <Pill
        ref={hypnoPill}
        x={600}
        y={800}
        radius={45}
        fill={CatppuccinColors.Green}
        text={"+20%"}
        imgSrc={lureGags[5].Resource}
      />
      <Pill
        ref={bigMagnetPill}
        x={600}
        y={800}
        radius={45}
        fill={CatppuccinColors.Green}
        text={"+15%"}
        imgSrc={lureGags[3].Resource}
      />
      <Pill
        ref={miniMagnetPill}
        x={600}
        y={800}
        radius={45}
        fill={CatppuccinColors.Green}
        text={"+10%"}
        imgSrc={lureGags[1].Resource}
      />
      <Rect
        ref={tipOneRect}
        fill={CatppuccinColors.Base}
        width={400}
        height={300}
        radius={40}
        y={-100}
        x={0}
        opacity={0}
      >
        <Txt
          width={350}
          margin={10}
          text="Lure gags can only give bonuses to the same affect type."
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
    </>,
  );

  yield* AnimationPresets.fadeInDown(title());

  yield* waitFor(1);

  yield* AnimationPresets.fadeInDown(tipOneRect());

  yield* waitFor(1);

  yield* sequence(
    0.2,
    AnimationPresets.fadeInDown(singleTargetTxt()),
    AnimationPresets.fadeInDown(multiTargetTxt()),
  );

  const baseY = -150;
  const groupSpacing = 150;

  yield* sequence(
    0.2,
    ...pills.map((p, i) => {
      const groupIndex = Math.floor(i / 2);
      const targetY = baseY + groupIndex * groupSpacing;

      return all(
        p().position.y(targetY, 0.8),
        p().expand(350, 1.2),
      );
    }),
  );
  yield* waitFor(1);

  yield* AnimationPresets.fadeOutDown(tipOneRect());

  yield* waitFor(1);

  yield* AnimationPresets.fadeInDown(tierTxt());
  yield* waitFor(1);
  yield* AnimationPresets.fadeInDown(tierOneTxt());
  yield* waitFor(1);
  yield* AnimationPresets.fadeInDown(tierTwoTxt());
  yield* waitFor(1);
  yield* AnimationPresets.fadeInDown(tierThreeTxt());
  yield* waitFor(1);

  yield* all(
    singleTargetTxt().position.x(-1400, 1, easeInOutCubic),
    multiTargetTxt().position.x(1400, 1, easeInOutCubic),
    tierTxt().position.y(1000, 1, easeInOutCubic),
    ...pills.map((p, i) => {
      if (i%2 === 0) {
        return all(
          p().position.x(-1400, 1, easeInOutCubic),
        );
      }
    }),
  );

const targets = [
  { index: 1, x: -600 },
  { index: 3, x: 0 },
  { index: 5, x: 600 },
];

  yield* sequence(
    0.2,
    tierOneTxt().position.x(-600, 1, easeInOutCubic),
    tierOneTxt().position.y(-250, 1, easeInOutCubic),
    tierTwoTxt().position.x(0, 1, easeInOutCubic),
    tierTwoTxt().position.y(-250, 1, easeInOutCubic),
    tierThreeTxt().position.x(600, 1, easeInOutCubic),
    tierThreeTxt().position.y(-250, 1, easeInOutCubic),
    all (
      ...targets.flatMap(({ index, x }) => [
        pills[index]().position.x(x, 1, easeInOutCubic),
        pills[index]().position.y(-150, 1, easeInOutCubic),
        pills[index]().setText(`Base ${lureGags[index].Damage}% Accuracy`, 400)
      ]),
  ))

  yield* waitFor(1);

  yield* AnimationPresets.fadeInDown(tierHelperTxt());

  yield* waitFor(1);

  yield* all(
    AnimationPresets.growShrink(pills[5]()),
    ...[1, 3].map(i => pills[i]().opacity(0.4, 1)),
  );

  yield* all(
    hypnoPill().position.y(0, 1, easeInOutCubic),
    hypnoPill().expand(150, 1.2),
  )

  yield* waitFor(1);

  yield* all(
    bigMagnetPill().position.y(125, 1, easeInOutCubic),
    bigMagnetPill().expand(150, 1.2),
  )

  yield* waitFor(1);

  yield* all(
    miniMagnetPill().position.y(250, 1, easeInOutCubic),
    miniMagnetPill().expand(150, 1.2),
  )

  yield* waitFor(1);

  yield* all(
    AnimationPresets.growShrink(pills[3]()),
    pills[3]().opacity(1, 0.2),
    ...[1, 5].map(i => pills[i]().opacity(0.4, 0.2)),
  );

  yield* waitFor(1);

  yield* hypnoPill().position.x(1200, 1, easeInOutCubic),
  yield* all(
    bigMagnetPill().position.y(0, 1, easeInOutCubic),
    bigMagnetPill().position.x(0, 1, easeInOutCubic),
    bigMagnetPill().setText("+20%", 150),
  )
  yield* all(
    miniMagnetPill().position.y(125, 1, easeInOutCubic),
    miniMagnetPill().position.x(0, 1, easeInOutCubic),
    miniMagnetPill().setText("+15%", 150),
  )

  yield* waitFor(1);

  yield* all(
    AnimationPresets.growShrink(pills[1]()),
    pills[1]().opacity(1, 0.2),
    ...[3, 5].map(i => pills[i]().opacity(0.4, 0.2)),
  );

  yield* bigMagnetPill().position.x(1200, 1, easeInOutCubic);

  yield* all(
    miniMagnetPill().position.y(0, 1, easeInOutCubic),
    miniMagnetPill().position.x(-600, 1, easeInOutCubic),
    miniMagnetPill().setText("+20%", 150),
  )

  yield* waitFor(1);
  yield* all(
    AnimationPresets.fadeOutDown(tierHelperTxt()),
    AnimationPresets.fadeOutUp(tierOneTxt()),
    AnimationPresets.fadeOutUp(tierTwoTxt()),
    AnimationPresets.fadeOutUp(tierThreeTxt()),
  )
  miniMagnetPill().position.y(1000, 1, easeInOutCubic)
    yield* all (
    ...pills.map(p => {
      return all(
        miniMagnetPill().position.y(1000, 1, easeInOutCubic),
        p().position.y(1000, 1, easeInOutCubic)
      )
    }
  ))

  yield* AnimationPresets.fadeOutUp(title());

});
