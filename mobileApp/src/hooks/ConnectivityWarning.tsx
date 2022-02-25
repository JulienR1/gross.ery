import React, {useEffect, useState} from 'react';
import {AppState} from 'react-native';
import {useModal} from '../contexts/ModalContext';
import {
  NetInfoState,
  useNetInfo,
  fetch as fetchNetInfo,
} from '@react-native-community/netinfo';
import {ConnectivityModal} from '../components/ConnectivityModal';

export function useConnectivityWarning() {
  const netinfo = useNetInfo();
  const {setEnabled, setModal} = useModal();
  const [isLoaded, setIsLoaded] = useState(false);
  const [preventNavigation, setPreventNavigation] = useState(false);

  const updateConnectityWarning = (netinfo: NetInfoState) => {
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
    setPreventNavigation(isDisconnectedFromInternet);
  };

  useEffect(() => {
    const onAppFocus = async () => {
      if (AppState.currentState === 'active') {
        const currentNetInfo = await fetchNetInfo();
        updateConnectityWarning(currentNetInfo);
      }
    };

    AppState.addEventListener('change', onAppFocus);
    return () => {
      AppState.removeEventListener('change', onAppFocus);
    };
  }, []);

  useEffect(() => {
    updateConnectityWarning(netinfo);
  }, [netinfo]);

  return {isLoaded, preventNavigation};
}
