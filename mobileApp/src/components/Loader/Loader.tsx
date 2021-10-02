import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {Dot} from './Dot';
import {styles} from './styles';

interface IProps {
  dotCount: number;
  dotSize: number;
  growFactor: number;
}

export function Loader({dotCount, dotSize, growFactor}: IProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const fullAnimationTime = 1200;
  const animationDuration = 800;

  useEffect(() => {
    let counter = 0;
    const interval = setInterval(() => {
      setCurrentIndex(counter++ % dotCount);
    }, fullAnimationTime / dotCount);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={styles.loader}>
      {Array(dotCount)
        .fill(undefined)
        .map((_, index) => (
          <Dot
            key={index}
            size={dotSize}
            growFactor={growFactor}
            isActive={index === currentIndex}
            animationDuration={animationDuration}
          />
        ))}
    </View>
  );
}

Loader.defaultProps = {
  dotCount: 3,
  dotSize: 10,
  growFactor: 1.4,
};
