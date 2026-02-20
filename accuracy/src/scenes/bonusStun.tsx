import { makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import {
  all,
  createRef,
  easeInOutCubic,
  Reference,
  sequence,
  waitFor,
} from "@motion-canvas/core";
import { AnimationPresets } from "../components/animations";
import gagsJson from "../data/gags.json";
import { CatppuccinColors } from "../components/colors";
import { Pill } from "../components/Pill.tsx";

type AccuracyStats = {
  baseAccuracy: number;
  gagTrackMastery: number;
  cogDefense: number;
  cogLevel: number;
  staticAccuracy: number;
  stun: number;
  stunFrom: string;
  finalAccuracy: number;
};

const pillColors = [
  CatppuccinColors.Mauve,
  CatppuccinColors.Yellow,
  CatppuccinColors.Green,
  CatppuccinColors.Blue,
  CatppuccinColors.Peach,
  CatppuccinColors.Pink,
  CatppuccinColors.Sky,
];

const exampleStats: AccuracyStats[] = [
  {
    baseAccuracy: 95,
    gagTrackMastery: 60,
    cogDefense: -60,
    cogLevel: 13,
    staticAccuracy: 95,
    stun: 0,
    stunFrom: "None",
    finalAccuracy: 95,
  },
  {
    baseAccuracy: 75,
    gagTrackMastery: 60,
    cogDefense: -60,
    cogLevel: 13,
    staticAccuracy: 75,
    stun: 25,
    stunFrom: "Sound",
    finalAccuracy: 95,
  },
  {
    baseAccuracy: 50,
    gagTrackMastery: 60,
    cogDefense: -60,
    cogLevel: 13,
    staticAccuracy: 50,
    stun: 50,
    stunFrom: "Sound & Throw",
    finalAccuracy: 95,
  },
];

const stunValues = [0, 50, 0, 25, 25, 25, 25];

export default makeScene2D(function* (view) {
  const logo = createRef<Txt>();
  const title = createRef<Txt>();
  const totalAcc = createRef<Txt>();
  const tipOneRect = createRef<Rect>();
  const tipTwoRect = createRef<Rect>();

  const selectedGags = [];

  for (let i = 0; i < 7; i++) {
    selectedGags.push(gagsJson[5 + i * 7]);
  }
  const pills: Reference<Pill>[] = [];

  for (let i = 0; i < selectedGags.length; i++) {
    pills.push(createRef<Pill>());
  }

  selectedGags.forEach((gag, i) => {
    view.add(
      <Pill
        ref={pills[i]}
        x={-750 + i * 250}
        y={700}
        radius={45}
        fill={pillColors[i]}
        text={gag.GagName}
        imgSrc={gag.Resource}
      />,
    );
  });

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
        text="Stun"
        fill={CatppuccinColors.Mauve}
        fontWeight={700}
        fontFamily="twilio sans mono"
        fontSize={60}
        opacity={0}
      />
      <Txt
        ref={totalAcc}
        x={0}
        y={400}
        text="Full Combo Accuracy: 86%"
        fill={CatppuccinColors.Text}
        fontWeight={700}
        fontFamily="twilio sans mono"
        fontSize={60}
        opacity={0}
      />
      <Rect
        ref={tipOneRect}
        fill={CatppuccinColors.Base}
        width={400}
        height={200}
        radius={40}
        y={-350}
        x={500}
        opacity={0}
      >
        <Txt
          width={350}
          margin={10}
          text="Stun is applied on damage not on gag use."
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
        height={200}
        radius={40}
        y={-350}
        x={-500}
        opacity={0}
      >
        <Txt
          width={350}
          margin={10}
          text="Stun is only applied once per gag track."
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

  yield* AnimationPresets.fadeInUp(title());

  yield* sequence(
    0.2,
    ...pills.map((p) =>
      all(
        p().position.y(0, 0.8, easeInOutCubic),
        p().expand(20, 1.2),
      )
    ),
  );

  yield* all(
    ...pills.map((p, i) => p().setText(`+${stunValues[i]}%`, 125)),
  );

  yield* AnimationPresets.fadeInUp(tipOneRect());
  yield* waitFor(1);

  yield* all(
    ...pills.map((p, i) =>
      (i === 0 || i === 2) && AnimationPresets.growShrink(p())
    ),
  );

  yield* waitFor(1);

  yield* all(
    ...pills.map((p, i) =>
      i === 0 || i === 2
        ? p().position.y(700, 0.8)
        : p().position.y(0, 0.8, easeInOutCubic)
    ),
  );

  const removedIndices = new Set([0, 2]);
  const visiblePills = pills.filter((_, i) => !removedIndices.has(i));

  const spacing = 250;
  const startX = -((visiblePills.length - 1) * spacing) / 2;

  yield* sequence(
    0.2,
    ...visiblePills.map((p, i) =>
      p().position.x(startX + i * spacing, 0.8, easeInOutCubic)
    ),
  );

  visiblePills.forEach((p, i) => {
    p().position.x(startX + i * spacing, 0.8, easeInOutCubic);
  });

  const exampleIndices = new Set([3, 4, 6]);

  yield* all(
    ...pills.map((p, i) =>
      exampleIndices.has(i)
        ? p().position.y(0, 0.8, easeInOutCubic)
        : p().position.y(700, 0.8)
    ),
  );

  const remainingPills = pills.filter((_, i) => exampleIndices.has(i));

  const startXLast = -((remainingPills.length - 1) * spacing) / 2;

  yield* all(
    ...remainingPills.map((p, i) =>
      p().position.x(startXLast + i * spacing, 0.8)
    ),
  );

  yield* all(
    ...pills.map((p, i) => exampleIndices.has(i) && p().y(-300, 1)),
    AnimationPresets.fadeOutUp(tipOneRect()),
  );

  const examplePills = pills.filter((_, i) => exampleIndices.has(i));

  yield* all(
    ...examplePills.map((p, i) => p().position.x(-640 + i * 640, 0.8)),
    ...examplePills.map((p) => p().expand(20)),
  );

  const exampleTextBoxes = examplePills.map(() => ({
    container: createRef<Rect>(),
    text: createRef<Txt>(),
  }));

  examplePills.forEach((p, i) => {
    view.add(
      <Rect
        ref={exampleTextBoxes[i].container}
        width={500}
        height={375}
        radius={14}
        fill={CatppuccinColors.Mantle}
        stroke={CatppuccinColors.Text}
        lineWidth={3}
        x={() => p().position.x()}
        y={() => p().position.y() + 300}
        opacity={0}
      >
        <Txt
          ref={exampleTextBoxes[i].text}
          text={formatStatsText(exampleStats[i])}
          fill={CatppuccinColors.Text}
          fontSize={40}
          lineHeight={60}
          textAlign="left"
          width={500}
          padding={10}
        />
      </Rect>,
    );
  });

  yield* sequence(
    0.15,
    ...exampleTextBoxes.map(({ container }) =>
      all(
        container().opacity(1, 0.6),
        container().position.y(
          container().position.y() - 10,
          0.6,
        ),
      )
    ),
  );

  yield* waitFor(1);

  yield* all(
    ...examplePills.map((p, i) => (
      i === 0 ? AnimationPresets.growShrink(p()) : p().opacity(0.4, 0.5)
    )),
    ...exampleTextBoxes.map((p, i) => (
      i === 0
        ? AnimationPresets.growShrink(p.container())
        : p.container().opacity(0.4, 0.5)
    )),
  );

  yield* waitFor(1);
  yield* all(
    ...examplePills.map((p, i) => (
      i === 1
        ? all(AnimationPresets.growShrink(p()), p().opacity(1, 0.5))
        : p().opacity(0.4, 0.5)
    )),
    ...exampleTextBoxes.map((p, i) => (
      i === 1
        ? all(
          AnimationPresets.growShrink(p.container()),
          p.container().opacity(1, 0.5),
        )
        : p.container().opacity(0.4, 0.5)
    )),
  );
  yield* waitFor(1);
  yield* all(
    ...examplePills.map((p, i) => (
      i === 2
        ? all(AnimationPresets.growShrink(p()), p().opacity(1, 0.5))
        : p().opacity(0.4, 0.5)
    )),
    ...exampleTextBoxes.map((p, i) => (
      i === 2
        ? all(
          AnimationPresets.growShrink(p.container()),
          p.container().opacity(1, 0.5),
        )
        : p.container().opacity(0.4, 0.5)
    )),
  );
  yield* waitFor(1);

  yield* waitFor(1);

  yield* all(
    AnimationPresets.fadeInUp(totalAcc()),
    ...examplePills.map((p) => (
      p().opacity(1, 0.5)
    )),
    ...exampleTextBoxes.map((p) => (
      p.container().opacity(1, 0.5)
    )),
  );

  yield* waitFor(1);

  yield* all(
    AnimationPresets.fadeOutUp(exampleTextBoxes[0].container()),
    AnimationPresets.fadeOutUp(exampleTextBoxes[1].container()),
    AnimationPresets.fadeOutUp(exampleTextBoxes[2].container()),
    AnimationPresets.fadeOutUp(totalAcc()),
    AnimationPresets.fadeOutUp(title()),
  );

  yield* all(
    ...examplePills.map((p) => (
      p().position.y(600, 1, easeInOutCubic)
    )),
  );
});

function formatStatsText(stats: AccuracyStats): string {
  return [
    `Static Accuracy: ${stats.staticAccuracy}%`,
    ``,
    `Prev Hits: ${stats.stunFrom}`,
    `Stun: ${stats.stun}%`,
    ``,
    `Final Accuracy: ${stats.finalAccuracy}%`,
  ].join("\n");
}
// STATIC VS DYNAMIC NUMBERS IN FORMULA
