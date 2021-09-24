import {StyleSheet} from 'react-native';
import {Colors} from '../../styles/colors';

export const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: `${Colors.Black}1F`,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'column-reverse',
    justifyContent: 'space-between',
  },
  container: {
    backgroundColor: Colors.White,
    flex: 0.5,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 50,
    paddingVertical: 36,
  },
});
