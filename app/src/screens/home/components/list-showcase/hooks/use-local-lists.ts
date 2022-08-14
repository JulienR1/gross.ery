import { useEffect, useRef, useState } from 'react';

import { getStoredLists, subscribe } from '~/modules/storage';
import { ILocalList } from '~/modules/storage/types';

import { LocalListsPayload } from '../types';

export const useLocalLists = (): LocalListsPayload => {
  const isMounted = useRef(true);
  const [isLoading, setIsLoading] = useState(true);
  const [localLists, setLocalLists] = useState<ILocalList[]>([]);

  const onLists = (lists: ILocalList[]) => {
    if (isMounted.current) {
      setLocalLists(lists);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getStoredLists().then(onLists);
    const unsubscribe = subscribe(onLists);

    return () => {
      unsubscribe();
      isMounted.current = false;
    };
  }, []);

  return { isLoading, localLists };
};
