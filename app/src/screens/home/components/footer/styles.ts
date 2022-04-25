import { StyleSheet } from 'react-native';

import { Colors, rootStyles, Rubik } from '~/styles';

export const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 1,
    left: -rootStyles.screen.marginHorizontal,
  },
});

export const versionStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 10,
    bottom: 5,
  },
  text: {
    fontFamily: Rubik.Light,
    fontSize: 10,
  },
});

export const updateStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
    zIndex: 10,
    backgroundColor: Colors.Main,
  },
  wrapper: {
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: Rubik.Regular,
    marginVertical: 2,
    marginHorizontal: 6,
    color: Colors.Black,
  },
  bold: {
    fontFamily: Rubik.Medium,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 5,
    padding: 12,
  },
});
