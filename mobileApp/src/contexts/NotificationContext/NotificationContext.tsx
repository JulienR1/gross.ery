import React, {
  createContext,
  ReactNode,
  ReactNodeArray,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import {Animated, Easing, Text, View} from 'react-native';
import {IPendingNotification} from './INotification';
import {
  appendNotification as appendNotificationAction,
  dismountNotification,
  removeNotification,
} from './notificationActions';
import {notificationReducer} from './notificationReducer';
import {initialState} from './notificationState';
import {styles} from './styles';

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
  const fadePercent = useRef(new Animated.Value(0));

  useEffect(() => {
    return () => {
      dispatch(dismountNotification());
      if (fadePercent.current) {
        fadePercent.current.stopAnimation();
      }
    };
  }, []);

  useEffect(() => {
    if (currentNotification) {
      fade(currentNotification.renderTime);
    }
  }, [currentNotification]);

  async function fade(totalDuration: number) {
    const fadingPortionPercentage = 0.2;
    const transitionTime = fadingPortionPercentage * totalDuration;
    const waitingTime = totalDuration - 2 * transitionTime;

    const baseTimingConfig = {
      duration: transitionTime,
      useNativeDriver: true,
    };

    Animated.sequence([
      Animated.timing(fadePercent.current, {...baseTimingConfig, toValue: 1}),
      Animated.delay(waitingTime),
      Animated.timing(fadePercent.current, {...baseTimingConfig, toValue: 0}),
    ]).start();
  }

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
        <View style={styles.container}>
          <Animated.View
            style={[styles.contentWrapper, {opacity: fadePercent.current}]}>
            <Text numberOfLines={1} style={styles.content}>
              {currentNotification.content}
            </Text>
          </Animated.View>
        </View>
      )}
    </NotificationContext.Provider>
  );
}

export {useNotification, NotificationProvider};
