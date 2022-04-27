import { StyleSheet } from 'react-native';

import { Colors, Rubik } from '~/styles';

export const codeInputStyles = StyleSheet.create({
  invisible: {
    opacity: 0,
    height: 0,
    width: 0,
    position: 'absolute',
    zIndex: -1,
  },
  list: {
    width: '85%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  character: {
    fontFamily: Rubik.Bold,
    color: Colors.Black,
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 20,
    width: '100%',
    height: '100%',
    textAlignVertical: 'center',
  },
});

export const characterInputStyles = StyleSheet.create({
  codeInputSelector: {
    width: '100%',
    height: '100%',
  },
  codeInput: {
    shadowColor: Colors.BlackTransparent,
    backgroundColor: Colors.PureWhite,
    borderColor: Colors.Main,
    borderRadius: 8,
    shadowRadius: 4,
    borderWidth: 1,
    elevation: 5,
    aspectRatio: 1,
  },
  codeInputFocus: {
    borderWidth: 3,
    borderRadius: 10,
  },
  codeInputDisabled: {
    opacity: 0.75,
  },
  cursor: {
    backgroundColor: Colors.Main,
    height: 2,
    position: 'absolute',
    width: '60%',
    left: '20%',
    top: '80%',
  },
});
