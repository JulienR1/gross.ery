import {StyleSheet} from 'react-native';
import {Rubik} from '../../fonts/Rubik';

export const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 5,
    right: 10,
    zIndex: 1,
  },
  content: {
    fontFamily: Rubik.Light,
    fontSize: 10,
  },
});
