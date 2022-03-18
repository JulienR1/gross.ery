import React, {
  createContext,
  ReactNode,
  ReactNodeArray,
  useContext,
  useEffect,
  useState,
} from 'react';
import {useUrl} from '../../hooks/url';
import {getListIdFromUrl} from './service';

interface IProps {
  children: ReactNode | ReactNodeArray;
  openSubscription: () => void;
}

const SubscriptionContext = createContext<[string | undefined, () => void]>([
  undefined,
  () => {},
]);

export const useAutomaticSubscription = () => useContext(SubscriptionContext);

export function SubscriptionProvider({children, openSubscription}: IProps) {
  const urlData = useUrl();
  const [listId, setListId] = useState<string | undefined>(undefined);

  useEffect(() => {
    getListIdFromUrl(urlData.url).then(listId => {
      if (listId) {
        setListId(listId);
        openSubscription();
      }
    });
  }, [urlData]);

  return (
    <SubscriptionContext.Provider value={[listId, () => setListId(undefined)]}>
      {children}
    </SubscriptionContext.Provider>
  );
}
