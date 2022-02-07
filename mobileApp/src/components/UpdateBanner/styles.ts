import {StyleSheet} from 'react-native';
import {Rubik} from '../../fonts/Rubik';
import {Colors} from '../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 10,
    backgroundColor: Colors.Main,
  },
  callToAction: {
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  content: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: Rubik.Regular,
    marginVertical: 2,
    marginHorizontal: 6,
  },
  bold: {
    fontFamily: Rubik.Medium,
  },
  closeButton: {
    position: 'absolute',
    top: 3,
    right: 3,
    padding: 6,
  },
});
