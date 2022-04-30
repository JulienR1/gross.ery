import { StyleSheet } from 'react-native';

import { Colors } from './colors';

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
    borderRadius: 20,
    marginHorizontal: 0,
    paddingHorizontal: 40,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.15,
    backgroundColor: Colors.Black,
  },
});
