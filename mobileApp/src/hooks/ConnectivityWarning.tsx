import React, {useEffect} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import {useModal} from '../contexts/ModalContext';
import {ConnectivityModal} from '../components/ConnectivityModal';

export function useConnectivityWarning() {
  const netinfo = useNetInfo();
  const {setEnabled, setModal} = useModal();

  useEffect(() => {
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
}
