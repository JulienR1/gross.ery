import { FC } from 'react';

export type ModalResponse<T> =
  | { cancelled: true }
  | ({ cancelled?: false } & T);

interface CommonModalProps<T, P> {
  onClose?: (closePayload: ModalResponse<T>) => void;
  completePop: () => void;
  isClosing: boolean;
  props: P;
}

export interface ModalProps<T, P = undefined> extends CommonModalProps<T, P> {
  mustAnswer?: boolean;
}

export type ModalComponent<T, P> = FC<ModalProps<T, P>>;

interface BaseModalRequest<T, P> {
  component: ModalComponent<T, P>;
  mustAnswer?: boolean;
}

export type ModalRequest<T, P> = BaseModalRequest<T, P> &
  (P extends undefined ? {} : { props: P });

export type ModalInstance<T, P> = ModalRequest<T, P> & CommonModalProps<T, P>;

export interface IModalContext {
  openModal: <T, P>(modal: ModalRequest<T, P>) => Promise<ModalResponse<T>>;
}
