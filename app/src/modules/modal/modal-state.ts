import { ModalInstance } from './types';

export interface IModalState {
  modalStack: ModalInstance<unknown>[];
}

export const initialState: IModalState = {
  modalStack: [],
};
