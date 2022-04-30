import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { styles } from './styles';

interface IProps extends TouchableOpacityProps {
  prompt: string;
}

export const ScreenButton = ({ prompt, ...buttonProps }: IProps) => {
  const { button, text } = styles;
  return (
    <TouchableOpacity {...buttonProps} style={[buttonProps.style, button]}>
      <Text style={text}>{prompt}</Text>
    </TouchableOpacity>
  );
};
