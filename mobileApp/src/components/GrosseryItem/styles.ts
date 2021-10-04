import {StyleSheet} from 'react-native';
import {Rubik} from '../../fonts/Rubik';
import {Colors} from '../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 7,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderColor: Colors.Main,
    borderWidth: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  text: {
    fontFamily: Rubik.Medium,
    fontSize: 16,
    lineHeight: 18,
    color: Colors.Black,
    flex: 1,
  },
  textChecked: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  endControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
