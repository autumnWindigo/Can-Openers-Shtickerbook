import {
  Circle,
  Img,
  initial,
  Node,
  NodeProps,
  Rect,
  signal,
  Txt,
} from "@motion-canvas/2d";
import {
  all,
  createRef,
  createSignal,
  easeOutCubic,
  Reference,
  SignalValue,
} from "@motion-canvas/core";

export interface PillProps extends NodeProps {
  radius?: SignalValue<number>;
  fill?: SignalValue<string>;
  imgSrc?: string;
  text?: string;
}

export class Pill extends Node {
  @initial(50)
  @signal()
  declare public radius: SignalValue<number>;

  private textRef: Reference<Txt>;
  private imgRef: Reference<Img>;
  private leftCircleRef: Reference<Circle>;
  private rightCircleRef: Reference<Circle>;
  private centerRectRef: Reference<Circle>;

  private rectWidth = createSignal(0);
  private leftX = createSignal(0);
  private rightX = createSignal(0);

  public constructor(props?: PillProps) {
    super(props);

    const r = this.radius();
    this.leftCircleRef = createRef<Circle>();
    this.add(
      <Circle
        ref={this.leftCircleRef}
        width={r * 2}
        height={r * 2}
        x={this.leftX}
        fill={props?.fill ?? "#3B82F6"}
        zIndex={1}
      />,
    );

    this.rightCircleRef = createRef<Circle>();
    this.add(
      <Circle
        ref={this.rightCircleRef}
        width={r * 2}
        height={r * 2}
        x={this.rightX}
        fill={props?.fill ?? "#3B82F6"}
      />,
    );

    this.centerRectRef = createRef<Rect>();
    this.add(
      <Rect
        ref={this.centerRectRef}
        width={this.rectWidth}
        height={r * 2}
        fill={props?.fill ?? "#3B82F6"}
      />,
    );

    this.textRef = createRef<Txt>();
    this.imgRef = createRef<Img>();

    if (props.imgSrc) {
      this.add(
        <Img
          ref={this.imgRef}
          src={props.imgSrc}
          width={r * 1.6}
          height={r * 1.6}
          x={() => this.leftX() + 10}
          zIndex={2}
        />,
      );
    }

    this.add(
      <Rect
        clip
        height={r * 2}
        width={this.rectWidth}
      >
        <Txt
          ref={this.textRef}
          text={props.text}
          fontSize={28}
          x={props.imgSrc ? this.rectWidth() / 2 + 25 : this.rectWidth() / 2}
          fontWeight={600}
          fontFamily="twilio sans mono"
        />
      </Rect>,
    );
  }

  public *expand(amount: number, duration = 1) {
    yield* all(
      this.leftX(-amount / 2, duration, easeOutCubic),
      this.rightX(amount / 2, duration, easeOutCubic),
      this.rectWidth(amount, duration, easeOutCubic),
    );
  }

  public *setText(text: string, newSize: number) {
    yield* this.expand(20, 0.5);
    this.textRef().text(text);
    yield* this.expand(newSize, 0.5);
  }

  public *setColor(color: string, duration: number) {
    yield* all(
      this.leftCircleRef().fill(color, duration),
      this.rightCircleRef().fill(color, duration),
      this.centerRectRef().fill(color, duration),
    );
  }

  public *setImage(src: string, duration = 0.3) {
    yield* this.imgRef().opacity(0, duration / 2);
    this.imgRef().src(src);
    yield* this.imgRef().opacity(1, duration / 2);
  }

  public getWidth(): number {
    const r = this.radius();
    return this.rectWidth() + r;
  }
}
