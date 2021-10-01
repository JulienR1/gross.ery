import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Dot} from './Dot';
import {styles} from './styles';

interface IProps {
  dotCount?: number;
}

export function Loader({dotCount = 3}: IProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const fullAnimationTime = 1200;
  const animationDuration = 800;

  useEffect(() => {
    let counter = 0;
    const interval = setInterval(() => {
      setCurrentIndex(counter++ % dotCount);
    }, fullAnimationTime / dotCount);

    () => {
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
            animationDuration={animationDuration}
            growFactor={1.4}
            size={10}
            isActive={index === currentIndex}
          />
        ))}
    </View>
  );
}
