import React, {useCallback, useEffect, useRef} from 'react';
import {Animated, Text, View} from 'react-native';
import {ICurrentNotification} from './INotification';
import {styles} from './styles';

export function Notification({renderTime, content}: ICurrentNotification) {
  const fadePercent = useRef(new Animated.Value(0)).current;

  const animateFading = useCallback(() => {
    const fadingPortionPercentage = 0.2;
    const transitionTime = fadingPortionPercentage * renderTime;
    const waitingTime = renderTime - 2 * transitionTime;

    const baseTimingConfig = {
      duration: transitionTime,
      useNativeDriver: true,
    };

    Animated.sequence([
      Animated.timing(fadePercent, {...baseTimingConfig, toValue: 1}),
      Animated.delay(waitingTime),
      Animated.timing(fadePercent, {...baseTimingConfig, toValue: 0}),
    ]).start();
  }, [renderTime, fadePercent]);

  useEffect(() => {
    animateFading();
    return () => {
      fadePercent?.stopAnimation();
    };
  }, [animateFading, fadePercent]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.contentWrapper, {opacity: fadePercent}]}>
        <Text numberOfLines={1} style={styles.content}>
          {content}
        </Text>
      </Animated.View>
    </View>
  );
}
