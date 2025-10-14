import { Line, Node, NodeProps, Rect, RectProps, Spline, Txt } from "@motion-canvas/2d";
import { all, createRef, createSignal, easeInOutCubic, Reference, waitFor } from "@motion-canvas/core";
import { CatppuccinColors } from "./colors";


export interface DrawnBoxProps extends RectProps {
  title?: string
}

export class DrawnBox extends Rect {

  private splineRef = createRef<Line>();
  private progress = createSignal(0);
  private txtRef = createRef<Txt>();
  private boxHeight: number
  private title: string

  public constructor(props?: DrawnBoxProps) {
    super(props)
    this.boxHeight = this.height()
    this.title = props.title

    this.add(
      <Node x={props.x} y={props.y}>
        <Spline
          ref={this.splineRef}
          points={[
            [-props.width / 2, -props.height / 2],
            [Number(props.width) / 2, -props.height / 2],
            [Number(props.width) / 2, Number(props.height) / 2],
            [-props.width / 2, Number(props.height) / 2],
            [-props.width / 2, -props.height / 2],
          ]}
          stroke={CatppuccinColors.Text}
          lineWidth={5}
          smoothness={0.05}
          end={this.progress}
          start={0}
        />
        <Txt
          ref={this.txtRef}
          text={""}
          fill={CatppuccinColors.Text}
          fontWeight={600}
          fontFamily="twilio sans mono"
          fontSize={40}
          opacity={100}
        />,
      </Node>
    )
  }
  public *drawBox(duration: number = 1) {
    yield * all (
      this.progress(1, duration),
      this.typeText(this.txtRef, this.title, duration / 2 )
    )
  }

  public *moveTextAbove(duration: number = 1) {
    yield * this.txtRef().position.y(this.txtRef().position.y() - this.boxHeight, duration, easeInOutCubic)
  }

  public *moveTextInside(duration: number = 1) {
    yield * this.txtRef().position.y(this.txtRef().position.y() + this.boxHeight, duration, easeInOutCubic)
  }

  public *setColor(color: string, duration: number = 1) {
    yield * all(
      this.splineRef().stroke(color, duration),
      this.txtRef().fill(color, duration)
    )
  }

  public * typeText(textRef: Reference<Txt>, content: string, duration: number = 1) {
    const perChar = duration / content.length;
    textRef().text('');

    for (let i = 0; i < content.length; i++) {
      textRef().text(textRef().text() + content[i]);
      yield * waitFor(perChar);
    }
  }
}
