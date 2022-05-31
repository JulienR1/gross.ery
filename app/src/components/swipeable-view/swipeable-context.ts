import { createContext } from 'react';

interface ISwipeableContext {
  enableSwipe: () => void;
  disableSwipe: () => void;
}

export const SwipeableContext = createContext<ISwipeableContext>({
  enableSwipe: () => {},
  disableSwipe: () => {},
});
