import React from 'react';
import { Text, View } from 'react-native';

import { config } from '~/modules/config';
import { getCurrentAppVersion } from './service';

import { versionStyles } from './styles';

export const VersionWatermark = () => {
  const versionToDisplay = config.IS_PROD
    ? `v${getCurrentAppVersion()}`
    : 'DEV';

  return (
    <View style={versionStyles.container}>
      <Text style={versionStyles.text}>{versionToDisplay}</Text>
    </View>
  );
};
