import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { Rubik } from '~/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontFamily: Rubik.Regular,
    textAlign: 'center',
    color: Colors.Black,
    fontSize: 16,
  },
  showcaseList: {
    marginTop: 16,
  },
});
