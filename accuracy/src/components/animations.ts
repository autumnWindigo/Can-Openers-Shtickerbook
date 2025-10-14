import { Node, Txt } from "@motion-canvas/2d";
import { all, easeOutCubic, Reference, TimingFunction, waitFor } from "@motion-canvas/core";

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: TimingFunction
}

export class AnimationPresets {
  private static readonly DEFAULT_DURATION = 0.5;
  private static readonly DEFAULT_DISTANCE = 200;
  private static readonly DEFAULT_DELAY = 0;

  public static *growShrink(node: Node, config: AnimationConfig = {}) {
    const { duration = this.DEFAULT_DURATION } = config;
      yield * node.scale(1.2, 0.4).to(1, 0.2)
  }

  public static *fadeInStill(node: Node, config: AnimationConfig = {}) {
    const {
      duration = this.DEFAULT_DURATION,
      delay = this.DEFAULT_DELAY,
      easing = easeOutCubic,
    } = config;

    node.opacity(0);

    // Wait for initial delay if specified
    if (delay > 0) {
      yield* waitFor(delay);
    }

    yield* node.opacity(1, duration, easing);
  }

  public static *fadeInDown(node: Node, config: AnimationConfig = {}) {
    const {
      duration = this.DEFAULT_DURATION,
      delay = this.DEFAULT_DELAY,
      easing = easeOutCubic,
    } = config;

    node.opacity(0);

    // Wait for initial delay if specified
    if (delay > 0) {
      yield* waitFor(delay);
    }
    yield* node.position.y(node.position.y() - 100, 0.1);

    yield* all(
      node.opacity(1, duration, easing),
      node.position.y(node.position.y() + 100, duration * 0.8, easing)
    )
  }

  public static *fadeInUp(node: Node, config: AnimationConfig = {}) {
    const {
      duration = this.DEFAULT_DURATION,
      delay = this.DEFAULT_DELAY,
      easing = easeOutCubic,
    } = config;

    node.opacity(0);

    // Wait for initial delay if specified
    if (delay > 0) {
      yield* waitFor(delay);
    }
    yield* node.position.y(node.position.y() + 100, 0.1);

    yield* all(
      node.opacity(1, duration, easing),
      node.position.y(node.position.y() - 100, duration * 0.8, easing)
    )
  }

  public static *fadeOutUp(node: Node, config: AnimationConfig = {}) {
    const {
      duration = this.DEFAULT_DURATION,
      delay = this.DEFAULT_DELAY,
      easing = easeOutCubic,
    } = config;

    node.opacity(1);

    // Wait for initial delay if specified
    if (delay > 0) {
      yield* waitFor(delay);
    }

    yield* all(
      node.opacity(0, duration, easing),
      node.position.y(node.position.y() - 100, duration * 0.8, easing)
    )
    yield *node.position.y(node.position.y() + 100, duration * 0.01, easing)
  }

  public static *fadeOutDown(node: Node, config: AnimationConfig = {}) {
    const {
      duration = this.DEFAULT_DURATION,
      delay = this.DEFAULT_DELAY,
      easing = easeOutCubic,
    } = config;

    node.opacity(1);

    // Wait for initial delay if specified
    if (delay > 0) {
      yield* waitFor(delay);
    }

    yield* all(
      node.opacity(0, duration, easing),
      node.position.y(node.position.y() + 100, duration * 0.8, easing)
    )
    yield *node.position.y(node.position.y() - 100, duration * 0.1, easing)
  }

  public static *fadeOutStill(node: Node, config: AnimationConfig = {}) {
    const {
      duration = this.DEFAULT_DURATION,
      delay = this.DEFAULT_DELAY,
      easing = easeOutCubic,
    } = config;

    node.opacity(1);

    // Wait for initial delay if specified
    if (delay > 0) {
      yield* waitFor(delay);
    }

    yield* node.opacity(0, duration, easing);
  }


  public static *typeText(textRef: Reference<Txt>, content: string, duration: number = 1) {
    const perChar = duration / content.length;
    textRef().text('');

    for (let i = 0; i < content.length; i++) {
      textRef().text(textRef().text() + content[i]);
      yield * waitFor(perChar);
    }
  }
}
