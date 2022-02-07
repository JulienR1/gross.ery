import React, {useEffect, useState} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import {useModal} from '../contexts/ModalContext';
import {ConnectivityModal} from '../components/ConnectivityModal';

export function useConnectivityWarning() {
  const netinfo = useNetInfo();
  const {setEnabled, setModal} = useModal();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (
      netinfo.details === null &&
      netinfo.isConnected === null &&
      netinfo.isInternetReachable === null &&
      netinfo.type === 'unknown'
    ) {
      return;
    }

    if (!isLoaded) {
      setIsLoaded(true);
    }

    const isDisconnectedFromInternet =
      !netinfo.isConnected || !netinfo.isInternetReachable;

    if (isDisconnectedFromInternet) {
      setModal({
        children: <ConnectivityModal />,
        disableManualClose: true,
        onClose: () => {},
      });
    }
    setEnabled(isDisconnectedFromInternet);
  }, [netinfo]);

  return isLoaded;
}
