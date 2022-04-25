import React from 'react';
import { View } from 'react-native';

import { styles } from './styles';
import { UpdateBanner } from './update-banner';
import { VersionWatermark } from './version-watermark';

export const Footer = () => {
  return (
    <View style={styles.footer}>
      <UpdateBanner />
      <VersionWatermark />
    </View>
  );
};
