import {StyleSheet} from 'react-native';
import {Rubik} from '../../fonts/Rubik';

export const styles = StyleSheet.create({
  container: {
    marginVertical: '10%',
    flex: 1,
  },
  logo: {
    alignSelf: 'center',
    maxWidth: 150,
    aspectRatio: 1,
  },
  title: {
    fontSize: 22,
    paddingBottom: 22,
    textAlign: 'center',
    paddingVertical: 12,
    fontFamily: Rubik.Medium,
  },
  feedback: {
    fontFamily: Rubik.Regular,
    textAlign: 'center',
    fontSize: 16,
    marginTop: '10%',
  },
});
