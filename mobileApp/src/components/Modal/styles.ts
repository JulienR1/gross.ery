import {StyleSheet} from 'react-native';
import {Colors} from '../../styles/colors';

export const styles = StyleSheet.create({
  modalContainer: {
    position: 'relative',
    backgroundColor: Colors.White,
    borderRadius: 8,
    padding: 18,
    height: '30%',
    width: '75%',
  },
  closeIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});
