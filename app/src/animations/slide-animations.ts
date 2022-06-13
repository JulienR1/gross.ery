import { useCallback } from 'react';

import { useAnimation } from './general-animation';

export const useSlideAnimations = (duration: number, onClosed?: () => void) => {
  const { animationPercent: slidePercent, animate } = useAnimation(duration);

  const slideIn = useCallback(() => animate(1), [animate]);
  const slideOut = useCallback(() => animate(0, onClosed), [animate, onClosed]);

  return { slidePercent, slideIn, slideOut };
};
