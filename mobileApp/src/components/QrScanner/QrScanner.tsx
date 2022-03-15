import config from './../../config';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {RNCamera, BarCodeReadEvent} from 'react-native-camera';
import {Icon} from 'react-native-elements';
import {Colors} from '../../styles/colors';
import {styles} from './styles';

interface IProps {
  onListIdFound: (listId: string) => void;
  onListNotFound: () => void;
}

export function QrScanner({onListIdFound, onListNotFound}: IProps) {
  const onQrRead = (event: BarCodeReadEvent) => {
    const {data} = event;

    if (data.toLowerCase().startsWith(config.QR_PREFIX)) {
      const listId = data.toLowerCase().replace(config.QR_PREFIX, '').trim();
      onListIdFound(listId);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera style={styles.scanner} onBarCodeRead={onQrRead} />
      <TouchableOpacity style={styles.closeIcon} onPress={onListNotFound}>
        <Icon name="close" size={35} color={Colors.White} />
      </TouchableOpacity>
    </View>
  );
}
