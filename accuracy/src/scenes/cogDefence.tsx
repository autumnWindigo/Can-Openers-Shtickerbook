import { makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { all, createRef, easeInOutCubic, waitFor } from "@motion-canvas/core";
import { CatppuccinColors } from "../components/colors";
import { AnimationPresets } from "../components/animations";
import { CogDefenceTable, CogPanel } from "../components/Cog";

export default makeScene2D(function* (view) {

  const logo = createRef<Txt>();
  const title = createRef<Txt>();
  const cogPanelTest = createRef<CogPanel>();
  const uglyDefencePannel = createRef<Rect>();

  const entries: [string, number][] = [];

  for (let i = 1; i <= 12; i++) {
    entries.push([`${i}`, CogDefenceTable[i]]);
  }
  entries.push(["13-14", CogDefenceTable[13]]);
  entries.push(["15-20", CogDefenceTable[15]]);

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
        opacity={0}
      />
      <CogPanel
        ref={cogPanelTest}
        level={8}
        suit={8}
        department="Sellbot"
        opacity={0}
      />,
      <Rect
        ref={uglyDefencePannel}
        width={400}
        height={580}
        fill={CatppuccinColors.Base}
        radius={20}
        padding={10}
        layout
        direction="column"
        opacity={0}
      >
        {entries.map(([levelRange, defVal], index) => (
          <Rect
            width={380}
            height={40}
            fill={index % 2 === 0 ? CatppuccinColors.Mantle : CatppuccinColors.Base}
            radius={20}
            layout
            paddingLeft={45}
            alignItems='center'
          >
            <Txt
              text={`Levels ${levelRange}: `}
              fill={CatppuccinColors.Text}
              fontWeight={600}
              fontFamily="twilio sans mono"
              fontSize={30}
            />
            <Txt
              text={`  ${defVal}`}
              fill={CatppuccinColors.Text}
              fontWeight={600}
              fontFamily="twilio sans mono"
              fontSize={30}
            />
          </Rect>
        ))}
      </Rect>
  </>
  )

  yield * AnimationPresets.fadeInUp(cogPanelTest());
  yield * AnimationPresets.fadeInUp(title());

  yield * waitFor(1)

  yield * cogPanelTest().growShrinkDefence();

  yield * waitFor(1)
  yield * cogPanelTest().position.x(-550, 1, easeInOutCubic);

  yield * AnimationPresets.fadeInUp(uglyDefencePannel());

  yield * waitFor(2)

  yield * all(
    uglyDefencePannel().position.x(-1500, 1),
    cogPanelTest().position.y(1500, 1),
  )
})
