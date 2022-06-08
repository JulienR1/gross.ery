import { Action } from '~/types';

import { ModalInstance } from './types';

export enum ModalType {
  PUSH = 'PUSH',
  POP = 'POP',
}

export interface ModalPushAction<T>
  extends Action<ModalType.PUSH, ModalInstance<T>> {
  type: ModalType.PUSH;
  payload: ModalInstance<T>;
}

export interface ModalPopAction extends Action<ModalType.POP, undefined> {
  type: ModalType.POP;
}

export function pushModal<T>(
  modalRequest: ModalInstance<T>,
): ModalPushAction<T> {
  return { type: ModalType.PUSH, payload: modalRequest };
}

export function popModal(): ModalPopAction {
  return { type: ModalType.POP, payload: undefined };
}

export type ModalAction<T> = ModalPushAction<T> | ModalPopAction;
