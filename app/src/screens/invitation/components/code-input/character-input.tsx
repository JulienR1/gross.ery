import React, { ReactNode, useEffect, useRef } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';

import { useAnimation } from './animations';
import { characterInputStyles } from './styles';

interface IProps {
  children: ReactNode | ReactNode[];
  hasFocus: boolean;
  disabled: boolean;
  widthPercent: string;
  onPress: () => void;
}

export const CharacterInput = ({
  children,
  hasFocus,
  disabled,
  widthPercent,
  onPress,
}: IProps) => {
  const animationPercent = useRef(new Animated.Value(1)).current;
  const { animation } = useAnimation(animationPercent, { min: 0.8, max: 1 });

  useEffect(() => {
    animation.start();
    return () => animation.stop();
  }, [animation]);

  const {
    codeInputSelector,
    codeInput,
    codeInputFocus,
    codeInputDisabled,
    cursor,
  } = characterInputStyles;

  const containerStyles = [
    codeInput,
    { width: widthPercent },
    hasFocus && codeInputFocus,
    disabled && codeInputDisabled,
  ];
  const cursorStyles = [
    hasFocus && cursor,
    { transform: [{ scaleX: animationPercent }] },
  ];

  return (
    <View style={containerStyles}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={codeInputSelector}>
        {children}
      </TouchableOpacity>
      <Animated.View style={cursorStyles} />
    </View>
  );
};
