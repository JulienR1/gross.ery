import {StyleSheet} from 'react-native';
import {Rubik} from '../../fonts/Rubik';
import {Colors} from '../../styles/colors';

export const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 6,
  },
  cancel: {
    backgroundColor: Colors.Red,
    marginLeft: 0,
  },
  submit: {
    backgroundColor: Colors.Main,
    marginRight: 0,
  },
  buttonText: {
    lineHeight: 19,
    fontSize: 16,
    fontFamily: Rubik.Medium,
    color: Colors.White,
  },
  disabled: {
    opacity: 0.5,
  },
});
