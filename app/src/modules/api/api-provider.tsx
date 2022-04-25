import { useNetInfo } from '@react-native-community/netinfo';
import React, { ReactNode, useEffect, useState } from 'react';

import { api } from './api';
import { ApiContext } from './api-context';

interface IProps {
  children: ReactNode | ReactNode[];
}

export const ApiProvider = ({ children }: IProps) => {
  const netinfo = useNetInfo();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const isConnected =
      netinfo.details && netinfo.isConnected && netinfo.isInternetReachable;
    setConnected(isConnected ?? false);
  }, [netinfo]);

  return (
    <ApiContext.Provider value={{ connected, api }}>
      {children}
    </ApiContext.Provider>
  );
};
