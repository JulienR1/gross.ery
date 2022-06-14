import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { styles } from './styles';

interface IProps extends TouchableOpacityProps {
  color?: string;
  shrinkPercent: number;
  isShrinking: boolean;
}

export const ModalButton = ({
  color,
  isShrinking,
  shrinkPercent,
  children,
  ...props
}: IProps) => {
  const { button } = styles;
  const coloredButton = { backgroundColor: color ?? button.backgroundColor };
  const shrinkStyle = {
    opacity: shrinkPercent,
    maxWidth: `${shrinkPercent * 100}%`,
    marginHorizontal: `${shrinkPercent * 4}%`,
  };

  return (
    <TouchableOpacity
      {...props}
      style={[button, coloredButton, isShrinking && shrinkStyle]}>
      {children}
    </TouchableOpacity>
  );
};
