import { FC } from 'react';

type ModalResponse<T> = { cancelled: true } | ({ cancelled?: false } & T);

export interface ModalProps<T, P = undefined> {
  onClose: (closePayload: ModalResponse<T>) => void;
  mustAnswer?: boolean;
  props: P;
}

export type ModalComponent<T, P> = FC<ModalProps<T, P>>;

interface BaseModalRquest<T, P> {
  component: ModalComponent<T, P>;
  mustAnswer?: boolean;
}

export type ModalRequest<T, P> = BaseModalRquest<T, P> &
  (P extends undefined ? {} : { props: P });

export type ModalInstance<T> = ModalRequest<T> & Pick<ModalProps<T>, 'onClose'>;

export interface IModalContext {
  openModal: <T, P>(modal: ModalRequest<T, P>) => Promise<ModalResponse<T>>;
}
