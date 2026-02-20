import {Node, Txt} from "@motion-canvas/2d";
import {Vector2} from "@motion-canvas/core";
import { CatppuccinColors } from "./colors.tsx";

export interface FlowchartProps {
  titles: string[];
  size?: Vector2;
  y?: number;
  sidePadding?: number;
  fontSize?: number;
}

export class Flowchart extends Node {
  private titles: string[];
  private size: Vector2;
  private sidePadding: number;
  private fontSize: number;
  private yPosition: number;

  public nodes: Txt[] = [];

  public constructor(props: FlowchartProps) {
    super({});

    this.titles = props.titles;
    this.size = props.size ?? new Vector2(1920, 1080);
    this.sidePadding = props.sidePadding ?? 200;
    this.fontSize = props.fontSize ?? 48;
    this.yPosition = props.y ?? 0;

    this.createTitles();
  }

private createTitles() {
  const gap = 120;

  this.titles.forEach(title => {
    const txt = new Txt({
      text: title,
      fontSize: this.fontSize,
      fontFamily: "twilio sans mono",
      fill: CatppuccinColors.Text,
      opacity: 0,
    });

    this.nodes.push(txt);
    this.add(txt);
  });

  const totalContentWidth =
    this.nodes.reduce((sum, node) => sum + node.width(), 0) +
    gap * (this.nodes.length - 1);

  let currentX = -totalContentWidth / 2;

  this.nodes.forEach(node => {
    const halfWidth = node.width() / 2;

    node.position.x(currentX + halfWidth);
    node.position.y(this.yPosition);

    currentX += node.width() + gap;
  });
}
}
