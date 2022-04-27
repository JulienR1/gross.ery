import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated } from 'react-native';

import { DotAnimationTiming } from './types';

export const useDotAnimation = ({
  offset,
  duration,
  idleTime,
}: DotAnimationTiming) => {
  const [scaleFactor, setScaleFactor] = useState(0);
  const animationPercent = useRef(new Animated.Value(0)).current;

  const animation = useMemo(
    () =>
      Animated.sequence([
        Animated.delay(offset),
        Animated.loop(
          Animated.timing(animationPercent, {
            duration,
            toValue: 1,
            useNativeDriver: false,
            delay: idleTime,
          }),
        ),
      ]),
    [duration, idleTime, animationPercent],
  );

  useEffect(() => {
    animationPercent.addListener(({ value }) =>
      setScaleFactor(-4 * value * (value - 1)),
    );
    return () => animationPercent.removeAllListeners();
  }, [animationPercent]);

  useEffect(() => {
    animation.start();
    return () => animation.stop();
  }, [animation]);

  return { scaleFactor };
};
