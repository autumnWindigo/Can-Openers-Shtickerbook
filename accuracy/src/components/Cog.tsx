import { Img, Node, NodeProps, Rect, Txt } from "@motion-canvas/2d";
import { createRef, Reference } from "@motion-canvas/core";
import cogInformation from "../data/cogDatabase.json";
import { CatppuccinColors } from "./colors";
import { AnimationPresets } from "./animations";

type Department = "Sellbot" | "Cashbot" | "Lawbot" | "Bossbot";

 interface Cog {
  name: string;
  headshot: string;
}

export const CogHealthTable: Record<number, number> = {
  1: 6,
  2: 12,
  3: 20,
  4: 30,
  5: 42,
  6: 56,
  7: 72,
  8: 90,
  9: 110,
  10: 132,
  11: 156,
  12: 196,
  13: 224,
  14: 254,
  15: 286,
  16: 320,
  17: 356,
  18: 394,
  19: 434,
  20: 476
};

export const CogDefenceTable: Record<number, number> = {
  1: -2,
  2: -5,
  3: -10,
  4: -15,
  5: -20,
  6: -25,
  7: -30,
  8: -35,
  9: -40,
  10: -45,
  11: -50,
  12: -55,
  13: -60,
  14: -60,
  15: -65,
  16: -65,
  17: -65,
  18: -65,
  19: -65,
  20: -65
};

type CogDatabase = Record<number, Record<Department, Cog>>;

export interface CogProps extends NodeProps {
  level?: number
  suit?: number
  department?: Department
}

export class CogPanel extends Node {
  private cogRectRef: Reference<Rect>
  private nameRef: Reference<Txt>
  private levelRef: Reference<Txt>
  private defenceRef: Reference<Txt>
  private healthRef: Reference<Txt>
  private stunRef: Reference<Txt>

  private cogDatabase: CogDatabase = cogInformation
  private cog: Cog

  private suit?: number
  private department?: Department
  private level?: number
  private currentHealth: number

  public constructor(props?: CogProps) {
    super(props)

    this.suit = props?.suit
    this.department = props?.department
    this.level = props?.level
    this.cog = this.cogDatabase[this.suit][this.department]
    this.currentHealth = CogHealthTable[this.level]

    this.cogRectRef = createRef<Rect>();
    this.nameRef = createRef<Txt>();
    this.levelRef = createRef<Txt>();
    this.defenceRef = createRef<Txt>();
    this.healthRef = createRef<Txt>();
    this.stunRef = createRef<Txt>();
    this.add (
      <Rect
        ref={this.cogRectRef}
        height={375}
        width={325}
        fill={CatppuccinColors.LatteBase}
        layout
        direction='column'
        alignItems='start'
        radius={20}
        padding={20}
        stroke={CatppuccinColors.Green}
      >
        <Rect
          alignSelf='center'
          height={100}
          width={100}
          radius={25}
          clip
        >
          <Img
            src={this.cog.headshot}
            height={100}
            width={100}
            />
        </Rect>
        <Txt
          ref={this.nameRef}
          text={this.cogDatabase[this.suit][this.department].name}
          fill={CatppuccinColors.Crust}
          fontSize={36}
          fontWeight={700}
          fontFamily="twilio sans mono"
          paddingTop={10}
          alignSelf='center'
       />
        <Txt
          ref={this.levelRef}
          text={"Level " + String(this.level)}
          fill={CatppuccinColors.Crust}
          fontSize={36}
          fontWeight={600}
          fontFamily="twilio sans mono"
          alignSelf='center'
       />
        <Txt
          ref={this.defenceRef}
          text={"🛡 " + CogDefenceTable[this.level]}
          fill={CatppuccinColors.Crust}
          fontSize={32}
          fontWeight={500}
          fontFamily="twilio sans mono"
          alignSelf='center'
       />
        <Rect height={20}/>
        <Txt
          ref={this.healthRef}
          text={"❤️ " + this.currentHealth + "/" + CogHealthTable[this.level]}
          fill={CatppuccinColors.Crust}
          fontSize={32}
          fontWeight={500}
          fontFamily="twilio sans mono"
       />
        <Txt
          ref={this.stunRef}
          text={"💫 " + "0%"}
          fill={CatppuccinColors.Crust}
          fontSize={32}
          fontWeight={500}
          fontFamily="twilio sans mono"
       />
      </Rect>
    )
  }

  public *removeHealth(damage: number) {
    if (this.currentHealth <= 0) {
      return
    }

    this.currentHealth -= damage
    this.healthRef().text("💔 " + this.currentHealth + "/" + CogHealthTable[this.level])
    yield * AnimationPresets.growShrink(this.healthRef())

    if (this.currentHealth <= 0) {
      yield * this.killCog()
    }
  }

  public *setStun(stun: number) {
    this.stunRef().text("💫 " + stun + "%")
    yield * AnimationPresets.growShrink(this.healthRef())
  }

  public *growShrinkDefence() {
    yield * AnimationPresets.growShrink(this.defenceRef())
  }

  private *killCog() {
    yield * this.cogRectRef().opacity(0.4, 0.5)
  }
}
