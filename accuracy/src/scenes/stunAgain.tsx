import {
  CODE,
  Code,
  codeSignal,
  makeScene2D,
  Rect,
  Txt,
} from "@motion-canvas/2d";
import {
  all,
  createRef,
  easeInOutCubic,
  sequence,
  waitFor,
} from "@motion-canvas/core";
import { Pill } from "../components/Pill.tsx";
import { CatppuccinColors } from "../components/colors.tsx";
import { AnimationPresets } from "../components/animations.ts";
import { Flowchart } from "../components/FlowChart.tsx";
import { create } from "node:domain";
import bonusStun from "./bonusStun.tsx";

type RowData = {
  number: string;
  text: string;
  bubbleColor: string;
  bubbleImage: string;
};

const rows: RowData[] = [
  {
    number: "1.",
    text: "xxxx",
    bubbleColor: CatppuccinColors.Sky,
    bubbleImage: "gags/inventory_aoogah.png",
  },
  {
    number: "3.",
    text: "--x-",
    bubbleColor: CatppuccinColors.Peach,
    bubbleImage: "gags/inventory_cake.png",
  },
  {
    number: "4.",
    text: "xxxx",
    bubbleColor: CatppuccinColors.Blue,
    bubbleImage: "gags/inventory_ship.png",
  },
  {
    number: "2.",
    text: "xxxx",
    bubbleColor: CatppuccinColors.Sky,
    bubbleImage: "gags/inventory_aoogah.png",
  },
];

const rowRefs = rows.map(() => ({
  number: createRef<Txt>(),
  pill: createRef<Pill>(),
  text: createRef<Txt>(),
}));

export default makeScene2D(function* (view) {
  const title = createRef<Txt>();
  const logo = createRef<Txt>();
  const bonusCounter = createRef<Txt>();
  const bonusStunTxt = createRef<Txt>();
  const prevGagTxt = createRef<Txt>();

  const rowSpacing = 325;
  const xOffSet = 475;

  rows.forEach((row, i) => {
    view.add(
      <>
        <Pill
          ref={rowRefs[i].pill}
          x={i * rowSpacing - xOffSet}
          y={600}
          radius={45}
          fill={row.bubbleColor}
          imgSrc={row.bubbleImage}
          text={row.text}
        />
      </>,
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
        opacity={1}
      />,
      <Txt
        ref={title}
        x={0}
        y={-400}
        text="Stun Flow Chart"
        fill={CatppuccinColors.Mauve}
        fontWeight={700}
        fontFamily="twilio sans mono"
        fontSize={60}
        opacity={0}
      />,
      <Txt
        ref={bonusStunTxt}
        x={-600}
        y={-300}
        text={`Bonus Stun`}
        fill={CatppuccinColors.Mauve}
        fontWeight={700}
        fontFamily="twilio sans mono"
        fontSize={50}
        opacity={0}
      />
      <Txt
        ref={bonusCounter}
        x={-600}
        y={-200}
        text={`0%`}
        fill={CatppuccinColors.Mauve}
        fontWeight={700}
        fontFamily="twilio sans mono"
        fontSize={80}
        opacity={0}
      />,
      <Txt
        ref={prevGagTxt}
        x={0}
        y={-300}
        text={`Current Gag`}
        fill={CatppuccinColors.Mauve}
        fontWeight={700}
        fontFamily="twilio sans mono"
        fontSize={40}
        opacity={0}
      />
    </>,
  );

  const flow = new Flowchart({
    titles: [
      "Previous Gags",
      "Damage?",
      "Same Target?",
      "Different Track?",
      "Bonus",
    ],
    size: view.size(),
    y: 0,
    fontSize: 40,
  });

  view.add(flow);

  yield* AnimationPresets.fadeInDown(title());

  yield* all(
    ...rowRefs.map((row) => {
      return all(
        row.pill().expand(200, 0),
        row.pill().y(450, 1, easeInOutCubic),
      );
    }),
  );

  yield* sequence(
    0.2,
    ...flow.nodes.map((title) => {
      return AnimationPresets.fadeInDown(title);
    }),
    AnimationPresets.fadeInDown(bonusStunTxt()),
    AnimationPresets.fadeInDown(bonusCounter()),
    AnimationPresets.fadeInDown(prevGagTxt()),
  );

  yield* waitFor(1);
  // GAG 1

  yield* all(
    rowRefs[0].pill().y(-150, 1, easeInOutCubic),
    rowRefs[0].pill().x(0, 1, easeInOutCubic),
  );

  yield* AnimationPresets.pulseHighlight(flow.nodes[0], CatppuccinColors.Red);

  yield* all(
    rowRefs[0].pill().y(100, 1, easeInOutCubic),
    rowRefs[0].pill().x(flow.nodes[0].x(), 1, easeInOutCubic),
  );

  yield* waitFor(1);

  // GAG 2

  yield* all(
    rowRefs[3].pill().y(-150, 1, easeInOutCubic),
    rowRefs[3].pill().x(0, 1, easeInOutCubic),
  );

  yield* all(
    AnimationPresets.growShrink(rowRefs[0].pill()),
  );

  yield* all(
    rowRefs[0].pill().x(flow.nodes[1].x(), 1, easeInOutCubic),
  );

  yield* AnimationPresets.pulseHighlight(flow.nodes[1], CatppuccinColors.Green);

  yield* all(
    rowRefs[0].pill().x(flow.nodes[2].x(), 1, easeInOutCubic),
  );

  yield* AnimationPresets.pulseHighlight(flow.nodes[2], CatppuccinColors.Green);

  yield* all(
    rowRefs[0].pill().x(flow.nodes[3].x(), 1, easeInOutCubic),
  );

  yield* AnimationPresets.pulseHighlight(flow.nodes[3], CatppuccinColors.Red);

  yield* all(
    rowRefs[0].pill().x(flow.nodes[0].x(), 1, easeInOutCubic),
  );

  yield* all(
    rowRefs[3].pill().y(250, 1, easeInOutCubic),
    rowRefs[3].pill().x(flow.nodes[0].x(), 1, easeInOutCubic),
  );

  yield* waitFor(1);

  // GAG 3
  yield* all(
    rowRefs[1].pill().y(-150, 1, easeInOutCubic),
    rowRefs[1].pill().x(0, 1, easeInOutCubic),
  );

  yield* rowRefs[0].pill().x(flow.nodes[1].x(), 1, easeInOutCubic)
  yield* AnimationPresets.pulseHighlight(flow.nodes[1], CatppuccinColors.Green);

  yield* rowRefs[0].pill().x(flow.nodes[2].x(), 1, easeInOutCubic)
  yield* AnimationPresets.pulseHighlight(flow.nodes[2], CatppuccinColors.Green);

  yield* rowRefs[0].pill().x(flow.nodes[3].x(), 1, easeInOutCubic)
  yield* AnimationPresets.pulseHighlight(flow.nodes[3], CatppuccinColors.Green);

  yield* rowRefs[0].pill().x(flow.nodes[4].x(), 1, easeInOutCubic)
  yield* AnimationPresets.pulseHighlight(flow.nodes[4], CatppuccinColors.Green);


  yield* all(
    AnimationPresets.growShrink(bonusCounter()),
    AnimationPresets.growShrink(bonusStunTxt()),
    bonusCounter().text("25%", 0.75)
  )
  yield* rowRefs[0].pill().x(flow.nodes[0].x(), 1, easeInOutCubic)

  yield* rowRefs[3].pill().x(flow.nodes[1].x(), 1, easeInOutCubic)
  yield* AnimationPresets.pulseHighlight(flow.nodes[1], CatppuccinColors.Green);

  yield* rowRefs[3].pill().x(flow.nodes[2].x(), 1, easeInOutCubic)
  yield* AnimationPresets.pulseHighlight(flow.nodes[2], CatppuccinColors.Green);

  yield* rowRefs[3].pill().x(flow.nodes[3].x(), 1, easeInOutCubic)
  yield* AnimationPresets.pulseHighlight(flow.nodes[3], CatppuccinColors.Green);

  yield* rowRefs[3].pill().x(flow.nodes[4].x(), 1, easeInOutCubic)
  yield* AnimationPresets.pulseHighlight(flow.nodes[4], CatppuccinColors.Green);


  yield* all(
    AnimationPresets.growShrink(bonusCounter()),
    AnimationPresets.growShrink(bonusStunTxt()),
    bonusCounter().text("50%", 0.75)
  )
  yield* rowRefs[3].pill().x(flow.nodes[0].x(), 1, easeInOutCubic)

  yield* all(
    rowRefs[1].pill().y(400, 1, easeInOutCubic),
    rowRefs[1].pill().x(flow.nodes[0].x(), 1, easeInOutCubic),
    bonusCounter().text("0%", 0.75)
  );

  // GAG 4

  yield* all(
    rowRefs[2].pill().y(-150, 1, easeInOutCubic),
    rowRefs[2].pill().x(0, 1, easeInOutCubic),
  );

  yield* rowRefs[0].pill().x(flow.nodes[1].x(), 1, easeInOutCubic)
  yield* AnimationPresets.pulseHighlight(flow.nodes[1], CatppuccinColors.Green);

  yield* rowRefs[0].pill().x(flow.nodes[2].x(), 1, easeInOutCubic)
  yield* AnimationPresets.pulseHighlight(flow.nodes[2], CatppuccinColors.Green);

  yield* rowRefs[0].pill().x(flow.nodes[3].x(), 1, easeInOutCubic)
  yield* AnimationPresets.pulseHighlight(flow.nodes[3], CatppuccinColors.Green);

  yield* rowRefs[0].pill().x(flow.nodes[4].x(), 1, easeInOutCubic)
  yield* AnimationPresets.pulseHighlight(flow.nodes[4], CatppuccinColors.Green);


  yield* all(
    AnimationPresets.growShrink(bonusCounter()),
    AnimationPresets.growShrink(bonusStunTxt()),
    bonusCounter().text("25%", 0.75)
  )
  yield* rowRefs[0].pill().x(flow.nodes[0].x(), 1, easeInOutCubic)

  yield* rowRefs[3].pill().x(flow.nodes[1].x(), 1, easeInOutCubic)
  yield* AnimationPresets.pulseHighlight(flow.nodes[1], CatppuccinColors.Green);

  yield* rowRefs[3].pill().x(flow.nodes[2].x(), 1, easeInOutCubic)
  yield* AnimationPresets.pulseHighlight(flow.nodes[2], CatppuccinColors.Green);

  yield* rowRefs[3].pill().x(flow.nodes[3].x(), 1, easeInOutCubic)
  yield* AnimationPresets.pulseHighlight(flow.nodes[3], CatppuccinColors.Green);

  yield* rowRefs[3].pill().x(flow.nodes[4].x(), 1, easeInOutCubic)
  yield* AnimationPresets.pulseHighlight(flow.nodes[4], CatppuccinColors.Green);


  yield* all(
    AnimationPresets.growShrink(bonusCounter()),
    AnimationPresets.growShrink(bonusStunTxt()),
    bonusCounter().text("50%", 0.75)
  )
  yield* rowRefs[3].pill().x(flow.nodes[0].x(), 1, easeInOutCubic)

  yield* rowRefs[1].pill().x(flow.nodes[1].x(), 1, easeInOutCubic)
  yield* AnimationPresets.pulseHighlight(flow.nodes[1], CatppuccinColors.Green);

  yield* rowRefs[1].pill().x(flow.nodes[2].x(), 1, easeInOutCubic)
  yield* AnimationPresets.pulseHighlight(flow.nodes[2], CatppuccinColors.Green);

  yield* rowRefs[1].pill().x(flow.nodes[3].x(), 1, easeInOutCubic)
  yield* AnimationPresets.pulseHighlight(flow.nodes[3], CatppuccinColors.Green);

  yield* rowRefs[1].pill().x(flow.nodes[4].x(), 1, easeInOutCubic)
  yield* AnimationPresets.pulseHighlight(flow.nodes[4], CatppuccinColors.Green);


  yield* all(
    AnimationPresets.growShrink(bonusCounter()),
    AnimationPresets.growShrink(bonusStunTxt()),
    bonusCounter().text("75%", 0.75)
  )
  yield* rowRefs[1].pill().x(flow.nodes[0].x(), 1, easeInOutCubic)

  yield* waitFor(4);
});
