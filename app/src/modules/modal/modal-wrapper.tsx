import React, { FC, memo, useCallback } from 'react';

import { Backdrop } from '~/components';

import { useBackButton } from '../navigation/hooks';
import { ModalInstance } from './types';

export const ModalWrapper: FC<ModalInstance<unknown>> = memo(
  ({ component: Component, ...modalProps }) => {
    const onBackdropPressed = useCallback(() => {
      if (!modalProps.mustAnswer) {
        modalProps.onClose({ cancelled: true });
      }
    }, [modalProps]);

    useBackButton(true, onBackdropPressed);

    return (
      <>
        <Backdrop onPress={onBackdropPressed} />
        <Component {...modalProps} />
      </>
    );
  },
);
