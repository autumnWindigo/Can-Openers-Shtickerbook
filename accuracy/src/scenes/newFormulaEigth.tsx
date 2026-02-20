import { Camera, Img, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import {
  all,
  any,
  createRef,
  easeInOutCubic,
  Reference,
  sequence,
  waitFor,
} from "@motion-canvas/core";
import { DrawnBox } from "../components/drawnBox.tsx";
import { CatppuccinColors } from "../components/colors.tsx";
import { AnimationPresets } from "../components/animations.ts";
import { Pill } from "../components/Pill.tsx";
import { log } from "node:console";

export default makeScene2D(function* (view) {
  const logo = createRef<Txt>();
  const cameraRef = createRef<Camera>();

  const baseGagAccBox = createRef<DrawnBox>();
  const gagTrackMasteryBox = createRef<DrawnBox>();
  const cogDefenceBox = createRef<DrawnBox>();
  const stunBox = createRef<DrawnBox>();
  const sosBox = createRef<DrawnBox>();
  const lureBonusBox = createRef<DrawnBox>();
  const trapBonusBox = createRef<DrawnBox>();
  const staticTxt = createRef<Txt>();
  const dynamicTxt = createRef<Txt>();
  const lureTxt = createRef<Txt>();
  const rulesTxt = createRef<Txt>();
  const typedRuleTxt = createRef<Txt>();
  const tipOneRect = createRef<Rect>();
  const tipTwoRect = createRef<Rect>();
  const tipLureRect = createRef<Rect>();
  const snarkyTip = createRef<Txt>();
  const chartTxt = createRef<Txt>();
  const chart = createRef<Img>();

  const fourPills: Reference<Pill>[] = [];
  for (let i = 0; i < 4; i++) {
    fourPills.push(createRef<Pill>());
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
        opacity={100}
        zIndex={999}
      />
      <Txt
        ref={rulesTxt}
        x={0}
        y={-400}
        text="Rules To Be Lazy & Correct"
        fill={CatppuccinColors.Text}
        fontWeight={700}
        fontFamily="twilio sans mono"
        fontSize={60}
        opacity={0}
      />
      <Txt
        ref={typedRuleTxt}
        x={0}
        y={-225}
        text="Rule One: Assume you have maxed gags."
        fill={CatppuccinColors.Text}
        fontWeight={200}
        fontFamily="twilio sans mono"
        fontSize={60}
        opacity={0}
      />
      {fourPills.map((ref) => (
        <Pill
          ref={ref}
          x={0}
          y={1000}
          radius={45}
          fill={CatppuccinColors.Green}
          text="75% Base Accuracy"
          imgSrc="gags/inventory_hypno_goggles.png"
        />
      ))}
      <Rect
        ref={tipOneRect}
        fill={CatppuccinColors.Base}
        width={400}
        height={250}
        radius={40}
        y={100}
        x={-600}
        opacity={0}
      >
        <Txt
          width={350}
          margin={10}
          text="If 9 or below I like to pretend it has +1 stun"
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
        width={500}
        height={400}
        radius={40}
        y={100}
        x={600}
        opacity={0}
      >
        <Txt
          width={450}
          margin={10}
          text="If you follow the rules you almost never have to consider these! Use these to BREAK the rules."
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
        ref={tipLureRect}
        fill={CatppuccinColors.Base}
        width={1400}
        height={500}
        radius={40}
        y={100}
        x={0}
        opacity={0}
      >
        <Txt
          width={1350}
          margin={10}
          text="Don't be afraid to double, triple, or quadruple lure: Consistency is key in Toontown!"
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
      <Txt
        ref={snarkyTip}
        x={0}
        y={450}
        text="It's much faster than you think! Especially in the long term."
        fill={CatppuccinColors.Mauve}
        fontWeight={300}
        fontFamily="twilio sans mono"
        fontSize={45}
        opacity={0}
      />
      <Camera ref={cameraRef}>
      <Txt
        ref={chartTxt}
        x={0}
        y={7000}
        text="The Chart"
        fill={CatppuccinColors.Text}
        fontWeight={700}
        fontFamily="twilio sans mono"
        fontSize={300}
      />
        <DrawnBox
          ref={baseGagAccBox}
          width={500}
          height={200}
          x={-300}
          y={-100}
          title="Base Gag Accuracy"
        />
        <DrawnBox
          ref={gagTrackMasteryBox}
          width={500}
          height={200}
          x={-300}
          y={50}
          title="Gag Track Mastery"
        />
        <DrawnBox
          ref={cogDefenceBox}
          width={500}
          height={200}
          title="Cog Defence"
          y={200}
          x={-300}
        />
        <DrawnBox
          ref={stunBox}
          width={500}
          height={200}
          title="Stun"
          x={300}
          y={-100}
        />
        <DrawnBox
          ref={sosBox}
          width={500}
          height={200}
          title="SOS Toons"
          x={300}
          y={50}
        />
        <DrawnBox
          ref={lureBonusBox}
          width={500}
          height={200}
          title="Lure Bonus"
          x={0}
          y={-100}
        />
        <DrawnBox
          ref={trapBonusBox}
          width={500}
          height={200}
          title="Trap Bonus"
          y={50}
        />
        <Txt
          ref={staticTxt}
          x={-600}
          y={-400}
          text="Static Accuracy"
          fill={CatppuccinColors.Text}
          fontWeight={700}
          fontFamily="twilio sans mono"
          fontSize={60}
        />
        <Txt
          ref={dynamicTxt}
          x={600}
          y={-400}
          text="Dynamic Accuracy"
          fill={CatppuccinColors.Text}
          fontWeight={700}
          fontFamily="twilio sans mono"
          fontSize={60}
        />
        <Txt
          ref={lureTxt}
          x={0}
          y={-400}
          text="Lure Accuracy"
          fill={CatppuccinColors.Text}
          fontWeight={700}
          fontFamily="twilio sans mono"
          fontSize={60}
        />
        <Img
          ref={chart}
          src="chart.png"
          x={0}
          y={8000}
          scale={0.5}
        />
      </Camera>
    </>,
  );

  yield* all(
    baseGagAccBox().drawBox(0),
    baseGagAccBox().setColor(CatppuccinColors.Peach, 0),
    gagTrackMasteryBox().drawBox(0),
    gagTrackMasteryBox().setColor(CatppuccinColors.Red, 0),
    cogDefenceBox().drawBox(0),
    cogDefenceBox().setColor(CatppuccinColors.Sky),
    stunBox().drawBox(0),
    stunBox().setColor(CatppuccinColors.Mauve),
    sosBox().drawBox(0),
    sosBox().setColor(CatppuccinColors.Mauve),
    lureBonusBox().drawBox(0),
    lureBonusBox().setColor(CatppuccinColors.Green),
    cameraRef().centerOn(trapBonusBox(), 0),
    cameraRef().zoom(15, 0, easeInOutCubic),
    cameraRef().rotation(180, 0, easeInOutCubic),
    trapBonusBox().drawBox(0),
    trapBonusBox().moveTextAbove(0),
  );

  yield* all(
    cameraRef().zoom(1, 2, easeInOutCubic),
    cameraRef().rotation(0, 2, easeInOutCubic),
  );

  yield* all(
    trapBonusBox().setColor(CatppuccinColors.Green),
    trapBonusBox().moveTextInside(1),
  );

  yield* waitFor(2);

  yield* all(
    cameraRef().zoom(0.6, 1, easeInOutCubic),
    cameraRef().position.y(-300, 1),
  );

  yield* AnimationPresets.fadeInDown(rulesTxt());
  yield* all(
    AnimationPresets.fadeInDown(typedRuleTxt()),
    typedRuleTxt().fill(CatppuccinColors.Red, 1),
  );

  yield* waitFor(1);

  yield* gagTrackMasteryBox().position.x(-20000, 1, easeInOutCubic);
  yield* cogDefenceBox().position.y(-100, 1, easeInOutCubic),
    // START BASE ACC ANIM

    yield* AnimationPresets.fadeOutUp(typedRuleTxt());

  yield* all(
    stunBox().position.x(stunBox().position.x() + 600, 1, easeInOutCubic),
    baseGagAccBox().position.x(
      baseGagAccBox().position.x() - 600,
      1,
      easeInOutCubic,
    ),
  );

  yield* all(
    stunBox().position.y(stunBox().position.y() + 1200, 1, easeInOutCubic),
    baseGagAccBox().position.y(
      baseGagAccBox().position.y() + 1200,
      1,
      easeInOutCubic,
    ),
    cameraRef().position.y(cameraRef().position.y() + 1900, 1, easeInOutCubic),
  );

  typedRuleTxt().text("Rule Two: Memorize Four Gags");
  yield* all(
    AnimationPresets.fadeInDown(typedRuleTxt()),
    typedRuleTxt().fill(CatppuccinColors.Peach, 1),
  );
  yield* waitFor(2);
  // DO BASE ACC STUFF HERE

  const cols = 2;
  const spacingX = 600;
  let spacingY = 200;
  const startX = -spacingX / 2;
  const startY = -spacingY / 2 + 200;

  yield* all(
    fourPills[0]().setImage("gags/inventory_hypno_goggles.png"),
    fourPills[0]().setText("75% Base Accuracy", 400),
    fourPills[1]().setImage("gags/inventory_cake.png"),
    fourPills[1]().setText("75% Base Accuracy", 400),
    fourPills[1]().setColor(CatppuccinColors.Peach, 0),
    fourPills[2]().setImage("gags/inventory_big_magnet.png"),
    fourPills[2]().setText("65% Base Accuracy", 400),
    fourPills[3]().setImage("gags/inventory_piano.png"),
    fourPills[3]().setText("50% Base Accuracy", 400),
    fourPills[3]().setColor(CatppuccinColors.Sky, 0),
    ...fourPills.map((p, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const targetX = startX + col * spacingX;
      const targetY = startY + row * spacingY;

      return all(
        p().position.x(targetX, 0.8),
        p().position.y(targetY, 0.8),
      );
    }),
  );

  yield* waitFor(1);

  yield* sequence(
    1,
    all(
      fourPills[0]().position.x(-600, 1),
      fourPills[2]().position.x(-600, 1),
    ),
    fourPills[1]().setText("Requires 1 stun (25%)", 500),
    fourPills[3]().setText("Requires 2 stuns, or 1 trap stun (50%)", 800),
  );

  yield* waitFor(1);

  yield* sequence(
    0.2,
    ...fourPills.map((p) => {
      return all(
        p().position.x(0, 1, easeInOutCubic),
        p().position.y(1000, 1, easeInOutCubic),
        p().expand(25),
      );
    }),
  );
  yield* AnimationPresets.fadeOutUp(typedRuleTxt());
  // END BASE ACC ANIM
  yield* all(
    stunBox().position.y(stunBox().position.y() - 1200, 1, easeInOutCubic),
    baseGagAccBox().position.y(
      baseGagAccBox().position.y() - 1200,
      1,
      easeInOutCubic,
    ),
    cameraRef().position.y(cameraRef().position.y() - 1900, 1, easeInOutCubic),
  );

  yield* all(
    stunBox().position.x(stunBox().position.x() - 600, 1, easeInOutCubic),
    baseGagAccBox().position.x(
      baseGagAccBox().position.x() + 600,
      1,
      easeInOutCubic,
    ),
  );

  yield* waitFor(1);
  // START LURE ANIM

  yield* all(
    lureBonusBox().position.y(
      lureBonusBox().position.y() + 1300,
      1,
      easeInOutCubic,
    ),
    trapBonusBox().position.y(
      trapBonusBox().position.y() + 1000,
      1,
      easeInOutCubic,
    ),
    lureBonusBox().position.x(
      lureBonusBox().position.x() + 1200,
      1,
      easeInOutCubic,
    ),
    trapBonusBox().position.x(
      trapBonusBox().position.x() + -1200,
      1,
      easeInOutCubic,
    ),
    cameraRef().position.y(cameraRef().position.y() + 2000, 1, easeInOutCubic),
  );

  typedRuleTxt().text("Rule Three: Always get lure to 95%");
  yield* all(
    AnimationPresets.fadeInDown(typedRuleTxt()),
    typedRuleTxt().fill(CatppuccinColors.Green, 1),
  );
  // LURE TIP HERE
  yield* AnimationPresets.fadeInDown(tipLureRect());

  yield* AnimationPresets.fadeInDown(snarkyTip());
  yield* waitFor(1);
  // END LURE TIP HERE

  yield* AnimationPresets.fadeOutUp(snarkyTip());
  yield* AnimationPresets.fadeOutDown(tipLureRect());
  yield* AnimationPresets.fadeOutUp(typedRuleTxt());
  yield* all(
    lureBonusBox().position.y(
      lureBonusBox().position.y() - 1300,
      1,
      easeInOutCubic,
    ),
    trapBonusBox().position.y(
      trapBonusBox().position.y() - 1000,
      1,
      easeInOutCubic,
    ),
    lureBonusBox().position.x(
      lureBonusBox().position.x() - 1200,
      1,
      easeInOutCubic,
    ),
    trapBonusBox().position.x(
      trapBonusBox().position.x() - -1200,
      1,
      easeInOutCubic,
    ),
    cameraRef().position.y(cameraRef().position.y() - 2000, 1, easeInOutCubic),
  );
  // END LURE ANIM
  yield* waitFor(1);
  // START COG DEFENCE ANIM
  yield* all(
    cameraRef().position.x(-2600, 1, easeInOutCubic),
    cogDefenceBox().position.x(-3500, 1, easeInOutCubic),
    cameraRef().position.y(700, 1, easeInOutCubic),
  );

  typedRuleTxt().text("Rule Four: Center cog defence around level 12's");
  yield* all(
    AnimationPresets.fadeInDown(typedRuleTxt()),
    typedRuleTxt().fill(CatppuccinColors.Sky, 1),
  );
  // DO COG DEFENCE TIP HERE
  yield* all(
    fourPills[0]().setImage("gear.png"),
    fourPills[0]().setText("Level 10 --- +15%", 400),
    fourPills[0]().setColor(CatppuccinColors.LatteBase, 0),
    fourPills[1]().setImage("gear.png"),
    fourPills[1]().setText("Level 11 --- +10%", 400),
    fourPills[1]().setColor(CatppuccinColors.LatteBase, 0),
    fourPills[2]().setImage("gear.png"),
    fourPills[2]().setText("Level 12 --- +5%", 400),
    fourPills[2]().setColor(CatppuccinColors.LatteBase, 0),
    fourPills[3]().setImage("gear.png"),
    fourPills[3]().setText("Level 13-14 & Supervisors --- +0%", 650),
    fourPills[3]().setColor(CatppuccinColors.LatteBase, 0),
    ...fourPills.map((p, i) => {
      const targetX = 0;
      const targetY = startY - 150 + i * spacingY;
      spacingY = 150;

      return all(
        p().position.x(targetX, 0.8),
        p().position.y(targetY, 0.8),
      );
    }),
  );

  yield* waitFor(1);

  yield* AnimationPresets.fadeInDown(tipOneRect());
  yield* waitFor(1);
  yield* AnimationPresets.fadeInDown(tipTwoRect());
  yield* waitFor(1);
  yield* AnimationPresets.fadeOutUp(tipOneRect());
  yield* AnimationPresets.fadeOutUp(tipTwoRect());

  yield* sequence(
    0.2,
    ...fourPills.map((p) => {
      return all(
        p().position.x(0, 1, easeInOutCubic),
        p().position.y(1000, 1, easeInOutCubic),
        p().expand(25),
      );
    }),
  );

  // END COG DEFENCE TIP HERE
  yield* AnimationPresets.fadeOutUp(typedRuleTxt());
  yield* AnimationPresets.fadeOutUp(rulesTxt());
  yield* all(
    cameraRef().position.x(-0, 1, easeInOutCubic),
    cameraRef().position.y(-300, 1, easeInOutCubic),
    cogDefenceBox().position.x(-300, 1, easeInOutCubic),
    cogDefenceBox().position.y(-100, 1, easeInOutCubic),
  );

  yield* all(
    cameraRef().zoom(1, 1, easeInOutCubic),
    cameraRef().centerOn(lureBonusBox(), 1, easeInOutCubic),
  );

  // END COG DEFENCE ANIM
  yield* waitFor(2);

  yield* all(
    cameraRef().position.y(7000, 3, easeInOutCubic),
    cameraRef().zoom(0.5, 2, easeInOutCubic),
  );
  yield* all(
    cameraRef().position.y(8000, 2, easeInOutCubic),
    cameraRef().zoom(1, 2, easeInOutCubic),
    AnimationPresets.fadeOutUp(logo())
  );

  yield* waitFor(1);


  yield* cameraRef().position.x(2000, 1, easeInOutCubic)
  yield* AnimationPresets.fadeInDown(logo())
});
