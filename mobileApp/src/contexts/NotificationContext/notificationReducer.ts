import {ICurrentNotification, IPendingNotification} from './INotification';
import {NotificationAction, NotificationType} from './notificationActions';
import {initialState, INotificationState} from './notificationState';

function notificationReducer(
  state = initialState,
  action: NotificationAction,
): INotificationState {
  switch (action.type) {
    case NotificationType.APPEND:
      return onNotificationAppend(state, action.payload);
    case NotificationType.REMOVE:
      return onNotificationRemove(state);
    case NotificationType.DISMOUNT:
      return onDismount(state);
    default:
      return state;
  }
}

function onNotificationAppend(
  state: INotificationState,
  payload: IPendingNotification,
): INotificationState {
  const pending = [...state.pending, {...payload}];
  return {
    current: state.current ?? setAsCurrentNotification(pending.shift()),
    pending,
  };
}

function onNotificationRemove(state: INotificationState): INotificationState {
  return {
    current: setAsCurrentNotification(state.pending.shift()),
    pending: [...state.pending],
  };
}

function onDismount(state: INotificationState): INotificationState {
  if (state.current?.timeout) {
    clearTimeout(state.current.timeout);
  }
  return initialState;
}

const setAsCurrentNotification = (
  pending: IPendingNotification | undefined,
): ICurrentNotification | undefined => {
  if (pending === undefined) {
    return undefined;
  }
  return {
    content: pending.content,
    renderTime: pending.renderTime,
    timeout: setTimeout(() => pending.onComplete(), pending.renderTime),
  };
};

export {notificationReducer};
