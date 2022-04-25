import React, { useEffect, useState } from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import { useApi } from '~/modules/api';

import { canAppBeUpdated } from './service';
import { updateStyles } from './styles';

export const UpdateBanner = () => {
  const apiInfo = useApi();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (!apiInfo.connected) {
      setShowBanner(false);
      return;
    }

    canAppBeUpdated(apiInfo.api).then(setShowBanner);
  }, [apiInfo]);

  const closeBanner = () => setShowBanner(false);

  const openPlayStore = () => {
    const url = 'https://play.google.com/store/apps/details?id=com.grossery';
    Linking.openURL(url);
  };

  const { container, wrapper, text, bold, closeButton } = updateStyles;

  return showBanner ? (
    <View style={container}>
      <TouchableOpacity onPress={openPlayStore}>
        <View style={wrapper}>
          <Text style={text}>
            Une nouvelle version de l'application est disponible.
          </Text>
          <Text style={text}>
            Cliquer <Text style={bold}>ici</Text> pour la télécharger.
          </Text>
        </View>
        <TouchableOpacity onPress={closeBanner} style={closeButton}>
          <Icon name="close" size={18} />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  ) : null;
};
