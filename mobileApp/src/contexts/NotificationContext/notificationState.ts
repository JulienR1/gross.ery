import {ICurrentNotification, IPendingNotification} from './INotification';

export interface INotificationState {
  current: ICurrentNotification | undefined;
  pending: IPendingNotification[];
}

export const initialState: INotificationState = {
  current: undefined,
  pending: [],
};
