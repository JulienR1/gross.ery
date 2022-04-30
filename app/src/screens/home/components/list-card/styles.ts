import { StyleSheet } from 'react-native';

import { Colors, Rubik } from '~/styles';

export const styles = StyleSheet.create({
  card: {
    borderColor: Colors.Main,
    borderWidth: 2,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    marginVertical: 6,
    paddingHorizontal: 16,
  },
  dateContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  date: {
    fontFamily: Rubik.Light,
    color: Colors.Black,
    fontSize: 14,
  },
  title: {
    fontFamily: Rubik.Medium,
    paddingHorizontal: 16,
    color: Colors.Black,
    fontSize: 16,
    flex: 1,
  },
  itemText: {
    fontFamily: Rubik.Regular,
    color: Colors.Black,
    textAlign: 'right',
    fontSize: 12,
  },
});
