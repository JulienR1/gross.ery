import {Animated} from 'react-native';

export class QuadraticAnimation {
  private animation: Animated.CompositeAnimation;
  private percent: Animated.Value;

  constructor(
    private animationDuration: number,
    private onValueChange: (newValue: number) => void,
  ) {
    this.percent = new Animated.Value(0);

    this.animation = Animated.timing(this.percent, {
      toValue: 1,
      duration: this.animationDuration,
      useNativeDriver: true,
    });

    this.percent.addListener(change =>
      this.onValueChange(-4 * change.value * (change.value - 1)),
    );
  }

  start(): void {
    this.animation.start();
  }

  stop(): void {
    this.animation.stop();
  }

  reset(): void {
    this.animation.reset();
  }
}
