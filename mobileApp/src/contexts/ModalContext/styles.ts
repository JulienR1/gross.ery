import {StyleSheet} from 'react-native';
import {Colors} from '../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  darkOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: `${Colors.Black}66`,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
