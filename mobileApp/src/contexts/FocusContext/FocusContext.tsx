import React, {
  createContext,
  ReactNode,
  ReactNodeArray,
  useContext,
} from 'react';
import {View} from 'react-native';
import {styles} from './styles';

interface IProps {
  children: ReactNode | ReactNodeArray;
}

type FocusCallback = (() => void) | (() => Promise<void>);

interface IFocus {
  subscribe: (callback: FocusCallback) => void;
  unsubscribe: (callback: FocusCallback) => void;
}

const context = createContext<IFocus>({
  subscribe: () => {},
  unsubscribe: () => {},
});
const useFocus = (): IFocus => useContext(context);

function FocusContext({children}: IProps) {
  const callbacks: FocusCallback[] = [];

  const subscribe = (callback: FocusCallback) => {
    if (!callbacks.includes(callback)) {
      callbacks.push(callback);
    }
  };

  const unsubscribe = (callback: FocusCallback) => {
    const index = callbacks.findIndex(cb => cb === callback);
    if (index >= 0) {
      callbacks.splice(index, 1);
    }
  };

  const onFocus = () => {
    callbacks.forEach(callback => {
      callback();
    });
  };

  return (
    <context.Provider value={{subscribe, unsubscribe}}>
      <View onTouchStart={() => onFocus()} style={styles.container}>
        {children}
      </View>
    </context.Provider>
  );
}

export {FocusContext, useFocus};
