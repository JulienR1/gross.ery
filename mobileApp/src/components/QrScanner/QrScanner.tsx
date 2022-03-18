import config from './../../config';
import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera, BarCodeReadEvent} from 'react-native-camera';
import {Icon} from 'react-native-elements';
import {Colors} from '../../styles/colors';
import {styles} from './styles';

enum PermissionStatus {
  Granted = 'granted',
  Denied = 'denied',
  Loading = 'loading',
}

interface IProps {
  onListIdFound: (listId: string) => void;
  onListNotFound: () => void;
}

export function QrScanner({onListIdFound, onListNotFound}: IProps) {
  const [isMounted, setIsMounted] = useState(true);
  const [currentCameraPermission, setCurrentCameraPermission] = useState(
    PermissionStatus.Loading,
  );

  const onQrRead = (event: BarCodeReadEvent) => {
    const {data} = event;

    if (data.toLowerCase().startsWith(config.QR_PREFIX)) {
      const listId = data.toLowerCase().replace(config.QR_PREFIX, '').trim();
      onListIdFound(listId);
    }
  };

  useEffect(() => {
    const validatePermission = async () => {
      const permission = 'android.permission.CAMERA';

      let permissionGranted = await PermissionsAndroid.check(permission);
      if (!permissionGranted) {
        if (isMounted) {
          setCurrentCameraPermission(PermissionStatus.Denied);
        }

        const grantStatus = await PermissionsAndroid.request(permission);
        permissionGranted = grantStatus === 'granted';
      }

      if (isMounted) {
        setCurrentCameraPermission(
          permissionGranted
            ? PermissionStatus.Granted
            : PermissionStatus.Denied,
        );
      }
    };

    validatePermission();
    return () => setIsMounted(false);
  }, []);

  return (
    <View style={styles.container}>
      {currentCameraPermission === PermissionStatus.Denied && (
        <View style={styles.noCameraContainer}>
          <Icon
            size={50}
            color={Colors.White}
            name="camera-off"
            type="feather"
          />
          <Text style={styles.noCameraText}>
            Impossible d'accéder à la caméra
          </Text>
        </View>
      )}

      {currentCameraPermission === PermissionStatus.Granted && (
        <RNCamera
          style={styles.scanner}
          onBarCodeRead={onQrRead}
          captureAudio={false}
        />
      )}

      <TouchableOpacity style={styles.closeIcon} onPress={onListNotFound}>
        <Icon name="close" size={35} color={Colors.White} />
      </TouchableOpacity>
    </View>
  );
}
