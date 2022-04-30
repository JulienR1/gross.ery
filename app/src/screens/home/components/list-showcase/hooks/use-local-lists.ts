import { useEffect, useState } from 'react';

import { getStoredLists } from '~/modules/storage';
import { ILocalList } from '~/modules/storage/types';

import { LocalListsPayload } from '../types';

export const useLocalLists = (): LocalListsPayload => {
  const [isLoading, setIsLoading] = useState(true);
  const [localLists, setLocalLists] = useState<ILocalList[]>([]);

  useEffect(() => {
    let isMounted = true;

    getStoredLists().then(lists => {
      if (isMounted) {
        setLocalLists(lists);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return { isLoading, localLists };
};
