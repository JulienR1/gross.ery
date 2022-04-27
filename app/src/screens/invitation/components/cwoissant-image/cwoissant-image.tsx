import React from 'react';
import { Image, ImageProps } from 'react-native';

const cwoissantSource = require('./../../../../assets/cwoissant_transparent.png');

export const CwoissantImage = (props: Omit<ImageProps, 'source'>) => {
  return <Image {...props} source={cwoissantSource} />;
};
