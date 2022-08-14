import React from 'react';
import {
  GestureResponderEvent,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

import { styles } from './styles';

interface IProps extends TouchableOpacityProps {
  isToggled: boolean;
}

export const OptionButton = ({
  isToggled,
  children,
  ...buttonProps
}: IProps) => {
  const onPress = (event: GestureResponderEvent) => {
    event.stopPropagation();
    buttonProps.onPress?.(event);
  };

  const { button, shadow, pressed, wrapper, wrapperPressed } = styles;

  const buttonStyles = [button, !isToggled && shadow, isToggled && pressed];
  const wrapperStyles = [wrapper, isToggled && wrapperPressed];

  return (
    <TouchableOpacity {...buttonProps} style={buttonStyles} onPress={onPress}>
      <View style={wrapperStyles}>{children}</View>
    </TouchableOpacity>
  );
};
