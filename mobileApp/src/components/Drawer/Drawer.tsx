import {useNavigation} from '@react-navigation/core';
import React, {ReactNode, ReactNodeArray, useEffect, useState} from 'react';
import {Animated, View} from 'react-native';
import {styles} from './styles';

interface IProps {
  onClose: () => void;
  children: ReactNode | ReactNodeArray;
}

export function Drawer({children, onClose}: IProps) {
  const navigation = useNavigation();
  const [animationPercent, setAnimationPercent] = useState(0);

  useEffect(() => {
    const animation = new Animated.Value(0);
    Animated.timing(animation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    animation.addListener(({value}) => setAnimationPercent(value));
  }, []);

  useEffect(() => {
    const closeDrawerBeforeRemove = (event: any) => {
      event.preventDefault();
      onClose();
    };
    navigation.addListener('beforeRemove', closeDrawerBeforeRemove);

    return () => {
      navigation.removeListener('beforeRemove', closeDrawerBeforeRemove);
    };
  }, [navigation, onClose]);

  return (
    <View style={styles.backdrop} onTouchStart={onClose}>
      <View
        style={[
          styles.container,
          {
            transform: [{translateY: 200 * (1 - animationPercent)}],
            opacity: animationPercent,
          },
        ]}
        onTouchStart={event => {
          event.stopPropagation();
        }}>
        {children}
      </View>
    </View>
  );
}
