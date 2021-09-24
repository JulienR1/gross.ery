import React, {ReactNode, ReactNodeArray} from 'react';
import {View} from 'react-native';
import {styles} from './styles';

interface IProps {
  onClose: () => void;
  children: ReactNode | ReactNodeArray;
}

export function Drawer({children, onClose}: IProps) {
  return (
    <View style={styles.backdrop} onTouchStart={onClose}>
      <View
        style={styles.container}
        onTouchStart={event => {
          event.stopPropagation();
        }}>
        {children}
      </View>
    </View>
  );
}
