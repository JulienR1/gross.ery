import { StyleSheet } from 'react-native';

import { Colors, Rubik } from '~/styles';

export const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    marginBottom: 60,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: Colors.Main,
    borderRadius: 4,
    alignSelf: 'flex-end',
  },
  text: {
    fontFamily: Rubik.Medium,
    fontSize: 14,
    color: Colors.White,
  },
});
