import {StyleSheet} from 'react-native';
import {Rubik} from '../../fonts/Rubik';
import {Colors} from '../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    flex: 1,
  },
  noCameraContainer: {
    flex: 1,
    backgroundColor: Colors.BlackTransparent,
    justifyContent: 'center',
  },
  noCameraText: {
    fontFamily: Rubik.Medium,
    color: Colors.White,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 16,
    width: '65%',
    marginTop: 20,
  },
  closeIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  scanner: {
    flex: 1,
    width: '100%',
  },
});
