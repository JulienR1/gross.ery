import { Dimensions, StyleSheet } from 'react-native';

import { Colors } from './colors';
import { Rubik } from './fonts';

export const rootStyles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.White,
    position: 'relative',
  },
  screen: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    paddingTop: 50,
    paddingHorizontal: 40,
    backgroundColor: Colors.White,
  },
  secondaryScreen: {
    paddingTop: 0,
    marginTop: 65,
    elevation: 12,
    shadowColor: Colors.BlackTransparent,
    shadowRadius: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginHorizontal: 0,
    paddingHorizontal: 40,
    height: Dimensions.get('window').height - 85,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.25,
    backgroundColor: Colors.Black,
  },
  title: {
    fontSize: 28,
    fontFamily: Rubik.SemiBold,
    color: Colors.Black,
    paddingRight: 4,
  },
});
