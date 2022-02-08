import React, {
  createContext,
  ReactNode,
  ReactNodeArray,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import {Text, View} from 'react-native';
import {
  appendNotification as appendNotificationAction,
  dismountNotification,
  removeNotification,
} from './notificationActions';
import {notificationReducer} from './notificationReducer';
import {initialState} from './notificationState';

interface IProps {
  children: ReactNode | ReactNodeArray;
}

export type AppendNotificationFct = (
  content: string,
  renderTime?: number,
) => void;

const NotificationContext = createContext<AppendNotificationFct>(() => {
  throw Error('The context is improperly set.');
});
const useNotification = () => useContext(NotificationContext);

function NotificationProvider({children}: IProps) {
  const [{current: currentNotification}, dispatch] = useReducer(
    notificationReducer,
    initialState,
  );

  useEffect(() => {
    return () => {
      dispatch(dismountNotification());
    };
  }, []);

  const appendNotification = (content: string, renderTime = 600) => {
    dispatch(
      appendNotificationAction({
        content,
        renderTime,
        onComplete: () => dispatch(removeNotification()),
      }),
    );
  };

  return (
    <NotificationContext.Provider value={appendNotification}>
      {children}
      {currentNotification && (
        <View>
          <Text>{currentNotification.content}</Text>
        </View>
      )}
    </NotificationContext.Provider>
  );
}

export {useNotification, NotificationProvider};
