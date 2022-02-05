import React, {ReactNode, ReactNodeArray} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {styles} from './styles';

export interface IModalProps {
  children: ReactNode | ReactNodeArray;
  onClose: () => void;
  disableManualClose?: boolean;
}

export function Modal({
  children,
  onClose,
  disableManualClose = false,
}: IModalProps) {
  return (
    <View
      style={styles.modalContainer}
      onTouchStart={event => event.stopPropagation()}>
      {!disableManualClose && (
        <View style={styles.closeIcon}>
          <TouchableOpacity onPress={onClose}>
            <Icon name="close" size={20} />
          </TouchableOpacity>
        </View>
      )}
      {children}
    </View>
  );
}
