import { useContext, useEffect } from 'react';

import { SwipeableContext } from '~/components';

export const useSwipeableView = () => {
  const swipeable = useContext(SwipeableContext);

  useEffect(() => {
    return () => swipeable.enableSwipe();
  });

  return swipeable;
};
