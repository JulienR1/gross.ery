import React, { memo, useCallback, useEffect } from 'react';
import { View } from 'react-native';

import { useAnimation } from '~/animations';
import { Backdrop } from '~/components';

import { useBackButton } from '../navigation/hooks';
import { ModalInstance } from './types';

interface IProps extends ModalInstance<unknown, unknown> {
  isClosing: boolean;
}

export const ModalWrapper = memo(
  ({ component: Component, ...modalProps }: IProps) => {
    const { mustAnswer, isClosing, onClose, completePop } = modalProps;

    const onBackdropPressed = useCallback(() => {
      if (!mustAnswer) {
        onClose?.({ cancelled: true });
      }
    }, [mustAnswer, onClose]);

    useBackButton(true, onBackdropPressed);
    const { animationPercent, animate } = useAnimation(75);

    useEffect(() => {
      if (isClosing) {
        animate(0, completePop);
      } else {
        animate(1);
      }
    }, [isClosing, animate, completePop]);

    const transitionStyle = {
      transform: [{ translateY: animationPercent * -45 }],
      opacity: animationPercent,
    };

    return (
      <>
        <Backdrop onPress={onBackdropPressed} />
        <View style={transitionStyle}>
          <Component {...modalProps} />
        </View>
      </>
    );
  },
);
