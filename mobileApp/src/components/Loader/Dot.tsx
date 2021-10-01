import React, {useEffect, useRef, useState} from 'react';
import {Animated} from 'react-native';
import {styles} from './styles';

interface IProps {
  size: number;
  growFactor: number;
  animationDuration: number;
  isActive: boolean;
}

export function Dot({size, growFactor, animationDuration, isActive}: IProps) {
  const [currentScaleFactor, setCurrentScaleFactor] = useState<number>(1);
  const animationRef = useRef<Animated.CompositeAnimation>();

  useEffect(() => {
    if (!isActive) {
      return;
    }

    // TODO: prevent set state when unmounted

    const percent = new Animated.Value(0);
    animationRef.current = Animated.timing(percent, {
      toValue: 1,
      duration: animationDuration,
      useNativeDriver: true,
    });
    animationRef.current?.start();

    if (!percent.hasListeners()) {
      percent.addListener(({value}) =>
        setCurrentScaleFactor(1 - 4 * value * (growFactor - 1) * (value - 1)),
      );
    }
  }, [isActive]);

  const scaledSize = currentScaleFactor * size;
  const style = {
    height: scaledSize,
    width: scaledSize,
    borderRadius: scaledSize / 2,
  };

  return <Animated.View style={[styles.dot, style]} />;
}
