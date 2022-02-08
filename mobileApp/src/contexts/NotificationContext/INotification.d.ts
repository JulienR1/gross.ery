export interface INotification {
  content: string;
  renderTime: number;
}

export interface ICurrentNotification extends INotification {
  timeout: NodeJS.Timeout;
}

export interface IPendingNotification extends INotification {
  onComplete: () => void;
}
