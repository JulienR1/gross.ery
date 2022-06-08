import { createContext, useContext } from 'react';

import { IModalContext } from './types';

export const ModalContext = createContext<IModalContext>({} as IModalContext);

export const useModal = () => useContext(ModalContext);
