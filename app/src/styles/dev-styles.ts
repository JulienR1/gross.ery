import { StyleSheet } from 'react-native';

import { Rubik } from './fonts';
import { rootStyles } from './root-styles';

export const devStyles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    position: 'absolute',
    left: -rootStyles.screen.marginHorizontal,
    bottom: 0,
    zIndex: 20,
  },
  wrapper: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  text: {
    fontFamily: Rubik.Light,
    fontSize: 12,
  },
});
