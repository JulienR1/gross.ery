import React, {ReactNode, ReactNodeArray, useEffect, useState} from 'react';
import {Linking, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {Colors} from '../../styles/colors';
import {styles} from './styles';
import {version} from './../../../package.json';
import {getVersion} from '../../services/version';
import {useNetInfo} from '@react-native-community/netinfo';

interface IProps {
  children: ReactNode | ReactNodeArray;
}

export function UpdateBanner({children}: IProps) {
  const netinfo = useNetInfo();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (netinfo.details && netinfo.isInternetReachable) {
      getVersion()
        .then(appVersion => {
          const versionHasChanged =
            appVersion.localeCompare(version, undefined, {
              numeric: true,
              sensitivity: 'base',
            }) > 0;
          setIsOpen(versionHasChanged);
        })
        .catch(() => setIsOpen(false));
    }
  }, [netinfo]);

  return (
    <>
      {isOpen && (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.callToAction}
            onPress={() =>
              Linking.openURL(
                'https://play.google.com/store/apps/details?id=com.grossery',
              )
            }>
            <View>
              <Text style={styles.content}>
                Une <Text style={styles.bold}>nouvelle version</Text> de
                l'application est disponible.
              </Text>
              <Text style={styles.content}>
                Cliquer <Text style={styles.bold}>ici</Text> pour la
                télécharger.
              </Text>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsOpen(false)}>
              <Icon name="close" size={24} color={Colors.Black} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      )}
      {children}
    </>
  );
}
