import { StyleSheet } from 'react-native';

import { Colors, Rubik } from '~/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: Rubik.Medium,
    color: Colors.Black,
    fontSize: 18,
    marginVertical: 10,
  },
  inputField: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.Main,
    color: Colors.Black,
    fontFamily: Rubik.Light,
    fontSize: 14,
    lineHeight: 17,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: Colors.White,
  },
  disabled: {
    opacity: 0.5,
  },
  loaderContainer: {
    flex: 1,
  },
  checkmark: {
    height: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
