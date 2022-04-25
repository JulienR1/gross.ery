import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

import { Backdrop, SwipeableView } from '~/components';
import { useNavigation } from '~/modules/navigation';
import { rootStyles } from '~/styles';

import { useAnimations } from './animations';

interface IProps {
  secondaryScreen: boolean;
  isClosing: boolean;
  onClosed: () => void;
  children: ReactNode;
}

export const ScreenWrapper = ({
  secondaryScreen,
  isClosing,
  onClosed,
  children,
}: IProps) => {
  const { closeScreen } = useNavigation();
  const [slidePercent, setSlidePercent] = useState(0);
  const slideAnimation = useRef(new Animated.Value(0)).current;

  const { slideIn, slideOut } = useAnimations(slideAnimation, onClosed);

  useEffect(() => {
    slideAnimation.addListener(({ value }) => setSlidePercent(value));
    slideIn();

    return () => slideAnimation.removeAllListeners();
  }, [slideAnimation, slideIn]);

  useEffect(() => {
    if (isClosing) {
      slideOut();
    }
  }, [isClosing, slideOut]);

  const swipeableStyles = [
    rootStyles.screen,
    secondaryScreen && [
      rootStyles.secondaryScreen,
      {
        transform: [{ translateY: (1 - slidePercent) * 150 }],
        opacity: slidePercent,
      },
    ],
  ];

  return (
    <>
      {secondaryScreen && (
        <Backdrop opacityFactor={slidePercent} onPress={closeScreen} />
      )}
      <SwipeableView
        minSwipePercent={0.15}
        isAnimating={isClosing}
        swipeable={secondaryScreen}
        onDragComplete={closeScreen}
        style={swipeableStyles}>
        {children}
      </SwipeableView>
    </>
  );
};
