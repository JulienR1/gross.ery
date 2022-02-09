import {Action} from '../../models/Action';
import {IPendingNotification} from './INotification';

export enum NotificationType {
  APPEND = '[NOTIFICATION] APPEND',
  REMOVE = '[NOTIFICATION] REMOVE',
  DISMOUNT = '[NOTIFICATION] DISMOUNT',
}
export interface NotificationAppendAction
  extends Action<NotificationType, IPendingNotification> {
  type: NotificationType.APPEND;
  payload: IPendingNotification;
}

export interface NotificationRemoveAction
  extends Action<NotificationType, IPendingNotification> {
  type: NotificationType.REMOVE;
}

export interface NotificationDismountAction
  extends Action<NotificationType, IPendingNotification> {
  type: NotificationType.DISMOUNT;
}

export function appendNotification(
  payload: IPendingNotification,
): NotificationAppendAction {
  return {type: NotificationType.APPEND, payload};
}

export function removeNotification(): NotificationRemoveAction {
  return {type: NotificationType.REMOVE};
}

export function dismountNotification(): NotificationDismountAction {
  return {type: NotificationType.DISMOUNT};
}

export type NotificationAction =
  | NotificationAppendAction
  | NotificationRemoveAction
  | NotificationDismountAction;
