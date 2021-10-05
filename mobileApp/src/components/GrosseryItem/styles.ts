import {StyleSheet} from 'react-native';
import {Rubik} from '../../fonts/Rubik';
import {Colors} from '../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  checkboxContainer: {
    flexDirection: 'row',
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
  },
  textChecked: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  endControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    margin: 0,
    padding: 0,
    flex: 1,
    height: 18,
    borderColor: Colors.Main,
    borderBottomWidth: 2,
    marginRight: '20%',
  },
});
