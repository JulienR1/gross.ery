import React, {
  createContext,
  ReactNode,
  ReactNodeArray,
  useContext,
  useEffect,
  useState,
} from 'react';
import {View} from 'react-native';
import {Modal} from '../../components/Modal';
import {IModalProps} from '../../components/Modal/Modal';
import {styles} from './styles';

interface IProps {
  children: ReactNode | ReactNodeArray;
}

export interface IModalContext {
  setModal(modalProps: IModalProps): void;
  setEnabled(enabled: boolean): void;
  closeModal(): void;
}

const context = createContext<IModalContext>({
  setModal: () => {},
  setEnabled: () => {},
  closeModal: () => {},
});
const useModal = (): IModalContext => useContext(context);

function ModalContext({children}: IProps) {
  const [isMounted, setIsMounted] = useState<boolean>(true);
  const [modalProps, setModalProps] = useState<IModalProps>();
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  const setModal = (newModalProps: IModalProps) => {
    if (isMounted) {
      setModalProps(newModalProps);
    }
  };

  const setEnabled = (enabled: boolean) => {
    if (isMounted) {
      setIsEnabled(enabled);
    }
  };

  return (
    <context.Provider
      value={{setModal, setEnabled, closeModal: () => setEnabled(false)}}>
      <View style={styles.container}>
        {children}
        {isEnabled && modalProps && (
          <View
            style={[styles.container, styles.darkOverlay]}
            onTouchStart={event => {
              event.stopPropagation();
              if (!modalProps.disableManualClose) {
                setEnabled(false);
                modalProps.onClose();
              }
            }}>
            <Modal
              {...modalProps}
              onClose={() => {
                setEnabled(false);
                modalProps.onClose();
              }}>
              {isMounted && modalProps.children}
            </Modal>
          </View>
        )}
      </View>
    </context.Provider>
  );
}

export {ModalContext, useModal};
