import React from 'react';
import { View } from 'react-native';

import { Dot } from './dot';
import { styles } from './styles';

interface IProps {
  dotCount: number;
  dotSize: number;
  growFactor: number;
}

export const Loader = ({ dotCount, dotSize, growFactor }: IProps) => {
  const dotAnimationTime = 800;
  const idleTime = dotAnimationTime / (dotCount - 1);

  const { loader } = styles;
  return (
    <View style={loader}>
      {Array.from(Array(dotCount)).map((_, index) => (
        <Dot
          key={index}
          size={dotSize}
          growFactor={growFactor}
          timing={{
            idleTime,
            offset: index * idleTime,
            duration: dotAnimationTime,
          }}
        />
      ))}
    </View>
  );
};

Loader.defaultProps = {
  dotCount: 3,
  dotSize: 10,
  growFactor: 0.4,
};
