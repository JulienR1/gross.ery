import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, LayoutChangeEvent, ViewProps } from 'react-native';

import { DragHandle } from './drag-handle';
import { SwipeableContext } from './swipeable-context';
import { getSwipeablePanResponder } from './swipeable-pan-responder';
import { PanAnimatedValueXY } from './types';

interface IProps extends ViewProps {
  minSwipePercent: number;
  swipeable?: boolean;
  isAnimating?: boolean;
  onDragComplete: () => void;
}

export const SwipeableView = ({
  swipeable,
  isAnimating,
  minSwipePercent,
  onDragComplete,
  children,
  ...viewProps
}: IProps) => {
  const [viewHeight, setViewHeight] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const pan = useRef(new Animated.ValueXY())
    .current as any as PanAnimatedValueXY;
  const panResponder = useRef(getSwipeablePanResponder(pan)).current;

  const onViewInit = ({ nativeEvent }: LayoutChangeEvent) => {
    const { height } = nativeEvent.layout;
    setViewHeight(height);
  };

  const onSwipeUpdate = useCallback(
    ({ y }: { y: number }) => {
      if (disabled) {
        return;
      }

      const dragPercent = y / viewHeight;
      const clampedDragPercent = Math.min(1, Math.max(0, dragPercent));

      if (clampedDragPercent > minSwipePercent) {
        onDragComplete();
      }
    },
    [minSwipePercent, viewHeight, disabled, onDragComplete],
  );

  useEffect(() => {
    if (swipeable && viewHeight > 0) {
      pan.addListener(onSwipeUpdate);
    }
    return () => pan.removeAllListeners();
  }, [pan, swipeable, viewHeight, onSwipeUpdate]);

  return (
    <Animated.View
      {...viewProps}
      {...(swipeable && !isAnimating && panResponder.panHandlers)}
      onLayout={onViewInit}>
      {swipeable && <DragHandle />}
      <SwipeableContext.Provider
        value={{
          enableSwipe: () => setDisabled(false),
          disableSwipe: () => setDisabled(true),
        }}>
        {children}
      </SwipeableContext.Provider>
    </Animated.View>
  );
};
