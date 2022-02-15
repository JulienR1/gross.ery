import {StyleSheet} from 'react-native';
import {Rubik} from '../../fonts/Rubik';
import {Colors} from '../../styles/colors';

export const styles = StyleSheet.create({
  codeList: {
    width: '85%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  invisible: {
    opacity: 0,
    height: 0,
    width: 0,
    position: 'absolute',
    zIndex: -1,
  },
  codeInput: {
    shadowColor: Colors.BlackTransparent,
    backgroundColor: Colors.PureWhite,
    borderColor: Colors.Main,
    borderRadius: 8,
    shadowRadius: 4,
    borderWidth: 1,
    elevation: 5,
    width: '16%',
    aspectRatio: 1,
  },
  codeInputFocus: {
    borderWidth: 3,
    borderRadius: 10,
  },
  codeInputDisabled: {
    opacity: 0.75,
  },
  codeInputSelector: {
    width: '100%',
    height: '100%',
  },
  character: {
    fontFamily: Rubik.Bold,
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 20,
    width: '100%',
    height: '100%',
    textAlignVertical: 'center',
  },
  cursor: {
    backgroundColor: Colors.Main,
    height: 2,
    position: 'absolute',
    width: '60%',
    left: '20%',
    top: '80%',
  },
});
