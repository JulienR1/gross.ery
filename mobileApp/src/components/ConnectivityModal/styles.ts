import {StyleSheet} from 'react-native';
import {Rubik} from '../../fonts/Rubik';
import {Colors} from '../../styles/colors';

export const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: Rubik.SemiBold,
    fontSize: 20,
    color: Colors.Black,
    marginBottom: 8,
  },
  description: {
    fontFamily: Rubik.Regular,
    color: Colors.Black,
    fontSize: 16,
    marginVertical: 4,
  },
  bold: {
    fontFamily: Rubik.Medium,
  },
});
