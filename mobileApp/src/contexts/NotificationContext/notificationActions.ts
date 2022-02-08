import {IPendingNotification} from './INotification';

export enum NotificationType {
  APPEND = '[NOTIFICATION] APPEND',
  REMOVE = '[NOTIFICATION] REMOVE',
  DISMOUNT = '[NOTIFICATION] DISMOUNT',
}

export interface INotificationAction {
  type: NotificationType;
  payload: any; //TODO: specify type based on notification type
}

export function appendNotification(
  payload: IPendingNotification,
): INotificationAction {
  return {type: NotificationType.APPEND, payload};
}

export function removeNotification(): INotificationAction {
  return {type: NotificationType.REMOVE, payload: undefined};
}

export function dismountNotification(): INotificationAction {
  return {type: NotificationType.DISMOUNT, payload: undefined};
}
