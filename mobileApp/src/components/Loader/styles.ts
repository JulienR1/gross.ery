import {StyleSheet} from 'react-native';
import {Colors} from '../../styles/colors';

export const styles = StyleSheet.create({
  loader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    backgroundColor: Colors.Black,
    margin: 7,
  },
});
