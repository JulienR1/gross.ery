import { StyleSheet } from 'react-native';

import { Colors, Rubik } from '~/styles';

export const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: Colors.Black,
    fontFamily: Rubik.Medium,
    textAlign: 'center',
    marginTop: 2,
    fontSize: 14,
  },
});
