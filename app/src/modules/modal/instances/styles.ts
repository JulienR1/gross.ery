import { StyleSheet } from 'react-native';

import { Colors, Rubik } from '~/styles';

export const styles = StyleSheet.create({
  modalContainer: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: Colors.White,
    borderRadius: 4,
    overflow: 'hidden',
  },
  titleText: {
    fontSize: 20,
    textAlign: 'center',
    color: Colors.Black,
    fontFamily: Rubik.SemiBold,
  },
  messageText: {
    marginTop: 8,
    fontFamily: Rubik.Regular,
    color: Colors.BlackTransparent,
    textAlign: 'center',
  },
  textWithIconContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: Rubik.SemiBold,
    color: Colors.White,
    textShadowRadius: 4,
    textShadowColor: Colors.BlackTransparent,
    textShadowOffset: { width: 0, height: 1 },
    fontSize: 14,
  },
  buttonIcon: {
    paddingRight: 2,
  },
});
