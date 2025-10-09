import { Node, Circle, Rect, initial, signal, NodeProps, Img, Txt } from '@motion-canvas/2d';
import { SignalValue, createSignal, all, Reference, createRef } from '@motion-canvas/core';

export interface PillProps extends NodeProps {
  radius?: SignalValue<number>;
  fill?: SignalValue<string>;
  imgSrc?: string;
  text?: string;
}

export class Pill extends Node {
  @initial(50)
  @signal()
  public declare radius: SignalValue<number>;


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
        fill={props?.fill ?? '#3B82F6'}
        zIndex={1}
      />
    );

    this.rightCircleRef = createRef<Circle>();
    this.add(
      <Circle
        ref={this.rightCircleRef}
        width={r * 2}
        height={r * 2}
        x={this.rightX}
        fill={props?.fill ?? '#3B82F6'}
      />
    );

    this.centerRectRef = createRef<Rect>();
    this.add(
      <Rect
        ref={this.centerRectRef}
        width={this.rectWidth}
        height={r * 2}
        fill={props?.fill ?? '#3B82F6'}
      />
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
        />
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
        x={props.imgSrc ? this.rectWidth() / 2 + 25 : this.rectWidth() / 2 }
        fontWeight={600}
        fontFamily="twilio sans mono"
      />
      </Rect>
    );
  }

  public *expand(amount: number, duration = 1) {
    yield* all(
      this.leftX(-amount / 2, duration),
      this.rightX(amount / 2, duration),
      this.rectWidth(amount, duration)
    );
  }

  public *setText(text: string, newSize: number) {
    yield * this.expand(20, 0.5)
    this.textRef().text(text)
    yield * this.expand(newSize, 0.5)
  }

  public *setColor(color: string, duration: number) {
    yield * all (
      this.leftCircleRef().fill(color, duration),
      this.rightCircleRef().fill(color, duration),
      this.centerRectRef().fill(color, duration)
    )
  }

  public getWidth(): number {
    const r = this.radius()
    return this.rectWidth() + r
  }
}
