import React, { ReactNode, useReducer } from 'react';
import { View } from 'react-native';

import { beginPopModal, completePopModal, pushModal } from './modal-action';
import { ModalContext } from './modal-context';
import { modalReducer } from './modal-reducer';
import { initialState } from './modal-state';
import { ModalWrapper } from './modal-wrapper';
import { styles } from './styles';
import { ModalRequest, ModalResponse } from './types';

interface IProps {
  children: ReactNode | ReactNode[];
}

export const ModalProvider = ({ children }: IProps) => {
  const [{ modalStack }, dispatch] = useReducer(modalReducer, initialState);

  const openModal = <T, P>(modalRequest: ModalRequest<T, P>) => {
    return new Promise<ModalResponse<T>>(resolve => {
      const onClose = (response: ModalResponse<T>) => {
        dispatch(beginPopModal());
        resolve(response);
      };

      const completePop = () => dispatch(completePopModal());

      dispatch(pushModal({ ...modalRequest, onClose, completePop }));
    });
  };

  const { modalContainer } = styles;
  return (
    <ModalContext.Provider value={{ openModal }}>
      {children}
      <View style={modalContainer}>
        {modalStack.map((modal, index) => (
          <ModalWrapper
            key={index}
            {...modal}
            onClose={modal.isClosing ? undefined : modal.onClose}
          />
        ))}
      </View>
    </ModalContext.Provider>
  );
};
