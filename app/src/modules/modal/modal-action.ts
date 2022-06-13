import { Action } from '~/types';

import { ModalInstance } from './types';

export enum ModalType {
  PUSH = 'PUSH',
  BEGIN_POP = 'BEGIN_POP',
  COMPLETE_POP = 'COMPLETE_POP',
}

export interface ModalPushAction<T>
  extends Action<ModalType.PUSH, ModalInstance<T>> {
  type: ModalType.PUSH;
  payload: ModalInstance<T>;
}

export interface ModalBeginPopAction
  extends Action<ModalType.BEGIN_POP, undefined> {
  type: ModalType.BEGIN_POP;
}

export interface ModalCompletePopAction
  extends Action<ModalType.COMPLETE_POP, undefined> {
  type: ModalType.COMPLETE_POP;
}

export function pushModal<T>(
  modalRequest: ModalInstance<T>,
): ModalPushAction<T> {
  return { type: ModalType.PUSH, payload: modalRequest };
}

export function beginPopModal(): ModalBeginPopAction {
  return { type: ModalType.BEGIN_POP, payload: undefined };
}

export function completePopModal(): ModalCompletePopAction {
  return { type: ModalType.COMPLETE_POP, payload: undefined };
}

export type ModalAction<T> =
  | ModalPushAction<T>
  | ModalBeginPopAction
  | ModalCompletePopAction;
