import {StyleSheet} from 'react-native';
import {Rubik} from '../../fonts/Rubik';
import {Colors} from '../../styles/colors';

export const styles = StyleSheet.create({
  card: {
    borderColor: Colors.Main,
    borderWidth: 2,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  dateContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  dateText: {
    fontFamily: Rubik.Regular,
    color: Colors.Black,
    fontSize: 16,
  },
  title: {
    fontFamily: Rubik.Medium,
    color: Colors.Black,
    fontSize: 16,
    flex: 1,
    paddingHorizontal: 16,
  },
  itemText: {
    fontFamily: Rubik.Regular,
    fontSize: 12,
    color: Colors.Black,
    textAlign: 'right',
  },
});
