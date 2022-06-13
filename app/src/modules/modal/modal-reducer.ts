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
    case ModalType.BEGIN_POP:
      return onBeginPop(state);
    case ModalType.COMPLETE_POP:
      return onCompletePop(state);
    default:
      return state;
  }
}

function onPush<T>(
  state: IModalState,
  instance: ModalInstance<T>,
): IModalState {
  const newStack = [...state.modalStack];
  newStack.push({ ...instance, isClosing: false });
  return { ...state, modalStack: newStack };
}

function onBeginPop(state: IModalState): IModalState {
  const newStack = [...state.modalStack];
  const topModal = newStack.pop();
  if (!topModal) {
    return state;
  }

  newStack.push({ ...topModal, isClosing: true });
  return { ...state, modalStack: newStack };
}

function onCompletePop(state: IModalState): IModalState {
  const newStack = [...state.modalStack];
  newStack.pop();
  return { ...state, modalStack: newStack };
}
