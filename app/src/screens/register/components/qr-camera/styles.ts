import { Dimensions, StyleSheet } from 'react-native';

import { Colors, rootStyles, Rubik } from '~/styles';

export const styles = StyleSheet.create({
  fullscreenWrapper: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    top: -rootStyles.secondaryScreen.marginTop,
  },
  noCameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCameraText: {
    fontFamily: Rubik.Medium,
    color: Colors.White,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 16,
    width: '65%',
    marginTop: 20,
  },
  closeIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  scanner: {
    flex: 1,
    width: '100%',
  },
  scanIconContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    transform: [{ translateX: 10 }, { translateY: -25 }],
  },
});
