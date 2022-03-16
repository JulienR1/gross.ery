import {StyleSheet} from 'react-native';
import {Rubik} from '../../fonts/Rubik';
import {Colors} from '../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    maxWidth: '100%',
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
    flexWrap: 'nowrap',
  },
  textChecked: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  endControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputContainer: {
    position: 'relative',
    flex: 1,
  },
  textInput: {
    margin: 0,
    padding: 0,
    flex: 1,
    height: 18,
  },
  textInputBorder: {
    backgroundColor: Colors.Main,
    height: 2,
    width: '80%',
    position: 'absolute',
    left: 0,
    bottom: -2,
  },
  checked: {
    opacity: 0.4,
  },
  icon: {
    paddingHorizontal: 2,
  },
});

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
  },
  bold: {
    fontFamily: Rubik.Medium,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 3,
  },
  cancelButton: {
    backgroundColor: Colors.Main,
  },
  deleteButton: {
    backgroundColor: Colors.Red,
  },
  buttonText: {
    color: Colors.White,
    fontFamily: Rubik.SemiBold,
    fontSize: 14,
  },
});
