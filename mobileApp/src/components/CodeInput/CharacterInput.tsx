import React, {ReactNode, ReactNodeArray, useEffect, useRef} from 'react';
import {Animated, Easing, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

interface IProps {
  children: ReactNode | ReactNodeArray;
  hasFocus: boolean;
  disabled: boolean;
  onPress: () => void;
}

export function CharacterInput({
  children,
  hasFocus,
  disabled,
  onPress,
}: IProps) {
  const animationPercent = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const baseAnimationConfig = {
      duration: 750,
      useNativeDriver: true,
      easing: Easing.sin,
    };

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animationPercent, {
          ...baseAnimationConfig,
          toValue: 0.8,
        }),
        Animated.timing(animationPercent, {
          ...baseAnimationConfig,
          toValue: 1,
        }),
      ]),
    );

    animation.start();
    return () => {
      animation.stop();
    };
  }, [animationPercent]);

  return (
    <View
      style={[
        styles.codeInput,
        hasFocus && styles.codeInputFocus,
        disabled && styles.codeInputDisabled,
      ]}>
      <TouchableOpacity
        disabled={disabled}
        style={styles.codeInputSelector}
        onPress={() => onPress()}>
        {children}
      </TouchableOpacity>
      <Animated.View
        style={[
          hasFocus && styles.cursor,
          {transform: [{scaleX: animationPercent}]},
        ]}
      />
    </View>
  );
}
