import React, {ReactNode, ReactNodeArray, useEffect, useState} from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Colors} from '../../styles/colors';
import {styles} from './styles';
import {version} from './../../../package.json';
import {getVersion} from '../../services/version';
import {useNetInfo} from '@react-native-community/netinfo';
import RNFetchBlob from 'rn-fetch-blob';

interface IProps {
  children: ReactNode | ReactNodeArray;
}

export function UpdateBanner({children}: IProps) {
  const netinfo = useNetInfo();
  const [isOpen, setIsOpen] = useState(false);
  const [downloadLink, setDownloadLink] = useState<string>('');

  useEffect(() => {
    if (netinfo.details && netinfo.isInternetReachable) {
      getVersion()
        .then(versionData => {
          const versionHasChanged =
            versionData.version.localeCompare(version) > 0;
          setIsOpen(versionHasChanged);
          setDownloadLink(versionData.downloadLink);
        })
        .catch(() => {
          setIsOpen(false);
        });
    }
  }, [netinfo]);

  const downloadApp = async () => {
    if (Platform.OS === 'android') {
      try {
        const permissionGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (permissionGranted === PermissionsAndroid.RESULTS.GRANTED) {
          const {config, fs} = RNFetchBlob;
          const filename = downloadLink.split('/').reverse()[0];

          await config({
            fileCache: true,
            addAndroidDownloads: {
              path: `${fs.dirs.DownloadDir}/${filename}`,
              description: 'Téléchargement de la mise à jour..',
              notification: true,
              useDownloadManager: true,
            },
          }).fetch('GET', downloadLink);
        } else {
          Alert.alert('La mise à jour ne sera pas téléchargée.');
        }
      } catch (ex) {
        Alert.alert(
          'Une erreur est survenue au moment de télécharger la mise à jour',
        );
      }
    }
  };

  return (
    <>
      {isOpen && (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.callToAction}
            onPress={() => downloadApp()}>
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
