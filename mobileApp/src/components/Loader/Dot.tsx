import React, {useEffect, useRef, useState} from 'react';
import {Animated} from 'react-native';
import {QuadraticAnimation} from '../../animations';
import {styles} from './styles';

interface IProps {
  size: number;
  growFactor: number;
  animationDuration: number;
  isActive: boolean;
}

export function Dot({size, growFactor, animationDuration, isActive}: IProps) {
  const [currentScaleFactor, setCurrentScaleFactor] = useState<number>(1);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    new QuadraticAnimation(animationDuration, animationPercent => {
      if (isMounted.current) {
        setCurrentScaleFactor((growFactor - 1) * animationPercent + 1);
      }
    }).start();
  }, [isActive]);

  const scaledSize = currentScaleFactor * size;
  const style = {
    height: scaledSize,
    width: scaledSize,
    borderRadius: scaledSize / 2,
  };

  return <Animated.View style={[styles.dot, style]} />;
}
