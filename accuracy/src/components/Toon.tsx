import { Node, NodeProps } from "@motion-canvas/2d";

export interface ToonProps extends NodeProps {
  laff?: number
}

export class Toon extends Node {
  public constructor(props?: ToonProps) {
    super(props);
  }
}
