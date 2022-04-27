import React, { ReactNode, useEffect } from 'react';

import { useSlideAnimations } from '~/animations';
import { Backdrop, SwipeableView } from '~/components';
import { useNavigation } from '~/modules/navigation';
import { rootStyles } from '~/styles';

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

  const { slidePercent, slideIn, slideOut } = useSlideAnimations(200, onClosed);

  useEffect(() => {
    slideIn();
  }, [slideIn]);

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
