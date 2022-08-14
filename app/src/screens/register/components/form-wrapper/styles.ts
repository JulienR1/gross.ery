import { StyleSheet } from 'react-native';

import { Colors, rootStyles, Rubik } from '~/styles';

export const styles = StyleSheet.create({
  localItemContainer: {
    flex: 1,
  },
  buttonContainer: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    bottom: rootStyles.screen.paddingHorizontal,
    justifyContent: 'space-evenly',
  },
  button: {
    flex: 1,
    maxWidth: 120,
    borderRadius: 8,
    paddingVertical: 10,
    marginHorizontal: 6,
    alignItems: 'center',
    backgroundColor: Colors.Main,
  },
  buttonCancel: {
    backgroundColor: Colors.White,
    color: Colors.Red,
    borderColor: Colors.Red,
    borderWidth: 2,
  },
  buttonLabel: {
    lineHeight: 19,
    fontSize: 16,
    fontFamily: Rubik.Medium,
    color: Colors.White,
  },
  buttonLabelCancel: {
    color: Colors.Red,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
