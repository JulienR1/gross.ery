import React from 'react';
import { View } from 'react-native';

import { styles } from './styles';
import { UpdateBanner } from './update-banner';
import { VersionWatermark } from './version-watermark';

export const Footer = () => {
  const { footer } = styles;

  return (
    <View style={footer}>
      <UpdateBanner />
      <VersionWatermark />
    </View>
  );
};
