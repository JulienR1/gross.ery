import {EventArg, useNavigation} from '@react-navigation/core';
import React, {ReactNode, ReactNodeArray, useEffect} from 'react';
import {View} from 'react-native';
import {styles} from './styles';

interface IProps {
  onClose: () => void;
  children: ReactNode | ReactNodeArray;
}

export function Drawer({children, onClose}: IProps) {
  const navigation = useNavigation();

  useEffect(() => {
    const closeDrawerBeforeRemove = (event: any) => {
      event.preventDefault();
      onClose();
    };
    navigation.addListener('beforeRemove', closeDrawerBeforeRemove);

    return () => {
      navigation.removeListener('beforeRemove', closeDrawerBeforeRemove);
    };
  }, [navigation]);

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
