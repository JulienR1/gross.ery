import { ModalAction, ModalType } from './modal-action';
import { IModalState, initialState } from './modal-state';
import { ModalInstance } from './types';

export function modalReducer<T>(
  state = initialState,
  action: ModalAction<T>,
): IModalState {
  switch (action.type) {
    case ModalType.PUSH:
      return onPush(state, action.payload);
    case ModalType.POP:
      return onPop(state);
    default:
      return state;
  }
}

function onPush<T>(
  state: IModalState,
  instance: ModalInstance<T>,
): IModalState {
  const newStack = [...state.modalStack];
  newStack.push(instance);
  return { ...state, modalStack: newStack };
}

function onPop(state: IModalState): IModalState {
  const newStack = [...state.modalStack];
  newStack.pop();
  return { ...state, modalStack: newStack };
}
