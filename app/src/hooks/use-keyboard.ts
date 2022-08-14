import { useEffect } from 'react';
import { Keyboard } from 'react-native';

export const useKeyboard = (
  onOpen: (keyboardHeight: number) => void,
  onClose: () => void,
) => {
  useEffect(() => {
    const listeners = [
      Keyboard.addListener('keyboardDidShow', event =>
        onOpen(event.endCoordinates.height),
      ),
      Keyboard.addListener('keyboardDidHide', onClose),
    ];
    return () => listeners.forEach(({ remove }) => remove());
  }, [onOpen, onClose]);
};
