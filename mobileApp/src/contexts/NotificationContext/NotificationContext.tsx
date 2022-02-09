import React, {
  createContext,
  ReactNode,
  ReactNodeArray,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import {Text, View} from 'react-native';
import {IPendingNotification} from './INotification';
import {
  appendNotification as appendNotificationAction,
  dismountNotification,
  removeNotification,
} from './notificationActions';
import {notificationReducer} from './notificationReducer';
import {initialState} from './notificationState';

export type AppendNotificationFct = (
  content: string,
  renderTime?: number,
) => void;

interface IProps {
  children: ReactNode | ReactNodeArray;
}

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
    const notificationToAppend: IPendingNotification = {
      content,
      renderTime,
      onComplete: () => dispatch(removeNotification()),
    };
    dispatch(appendNotificationAction(notificationToAppend));
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
