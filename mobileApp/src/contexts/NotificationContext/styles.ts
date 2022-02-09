import {StyleSheet} from 'react-native';
import {Rubik} from '../../fonts/Rubik';
import {Colors} from '../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    bottom: 64,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  contentWrapper: {
    maxWidth: '75%',
    overflow: 'hidden',
    backgroundColor: Colors.BlackTransparent,
    paddingVertical: 10,
    paddingHorizontal: 48,
    borderRadius: 24,
  },
  content: {
    fontFamily: Rubik.Light,
    color: Colors.White,
    fontSize: 15,
  },
});
