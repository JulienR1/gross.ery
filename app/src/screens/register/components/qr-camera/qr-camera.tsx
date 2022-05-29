import React, { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { BarCodeReadEvent, RNCamera } from 'react-native-camera';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Backdrop } from '~/components';
import { useIsMounted } from '~/hooks';
import { config } from '~/modules/config';
import { Colors } from '~/styles';

import { PermissionStatus } from './permission-status.enum';
import { getCameraPermissionStatus } from './service';
import { styles } from './styles';

interface IProps {
  onData: (data: string) => void;
  onClose: () => void;
}

export const QrCamera = ({ onData, onClose }: IProps) => {
  const isMounted = useIsMounted();
  const [cameraPermission, setCameraPermission] = useState(
    PermissionStatus.Loading,
  );

  const onCodeRead = useCallback(
    ({ data, type }: BarCodeReadEvent) => {
      if ((type as string) === 'QR_CODE') {
        const lowerData = data.toLowerCase();
        if (lowerData.startsWith(config.QR_PREFIX)) {
          const foundData = lowerData.replace(config.QR_PREFIX, '').trim();
          onData(foundData);
          onClose();
        }
      }
    },
    [onData, onClose],
  );

  const closeWhenNoCamera = useCallback(() => {
    if (cameraPermission !== PermissionStatus.Granted) {
      onClose();
    }
  }, [cameraPermission, onClose]);

  useEffect(() => {
    getCameraPermissionStatus().then(permission => {
      if (isMounted()) {
        setCameraPermission(permission);
      }
    });
  }, [isMounted]);

  const {
    fullscreenWrapper,
    noCameraContainer,
    noCameraText,
    closeIcon,
    scanner,
    scanIconContainer,
  } = styles;
  return (
    <View style={fullscreenWrapper}>
      <Backdrop opacityFactor={2.5} onPress={closeWhenNoCamera} />

      {cameraPermission === PermissionStatus.Granted ? (
        <>
          <RNCamera
            onBarCodeRead={onCodeRead}
            style={scanner}
            captureAudio={false}
          />

          <View style={scanIconContainer}>
            <Ionicon name="scan-outline" size={250} color={Colors.White} />
          </View>
        </>
      ) : (
        <View style={noCameraContainer} pointerEvents={'none'}>
          <FeatherIcon size={50} color={Colors.White} name="camera-off" />
          <Text style={noCameraText}>Impossible d'accéder à la caméra</Text>
        </View>
      )}

      <TouchableOpacity style={closeIcon} onPress={onClose}>
        <Icon name="close" size={35} color={Colors.White} />
      </TouchableOpacity>
    </View>
  );
};
