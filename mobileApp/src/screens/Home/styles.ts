import {StyleSheet} from 'react-native';
import {Rubik} from '../../fonts/Rubik';
import {Colors} from '../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    marginTop: 60,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontFamily: Rubik.SemiBold,
    color: Colors.Black,
    paddingRight: 4,
  },
  listElement: {
    marginVertical: 8,
  },
  emptyContainer: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: Rubik.Regular,
    fontSize: 16,
    color: Colors.Black,
  },
});
