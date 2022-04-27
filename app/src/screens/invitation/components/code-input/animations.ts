import { Animated, Easing } from 'react-native';

export const useAnimation = (
  animationPercent: Animated.Value,
  range: { min: number; max: number },
) => {
  const baseAnimationConfig = {
    duration: 750,
    useNativeDriver: true,
    easing: Easing.sin,
  };

  const animation = Animated.loop(
    Animated.sequence([
      Animated.timing(animationPercent, {
        ...baseAnimationConfig,
        toValue: range.min,
      }),
      Animated.timing(animationPercent, {
        ...baseAnimationConfig,
        toValue: range.max,
      }),
    ]),
  );

  return { animation };
};
