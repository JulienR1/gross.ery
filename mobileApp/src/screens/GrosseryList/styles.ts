import {StyleSheet} from 'react-native';
import {Rubik} from '../../fonts/Rubik';
import {Colors} from '../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    marginTop: 60,
  },
  title: {
    fontFamily: Rubik.SemiBold,
    fontSize: 28,
    lineHeight: 33,
    color: Colors.Black,
  },
  text: {
    marginTop: 20,
    fontFamily: Rubik.Regular,
    fontSize: 18,
    color: Colors.Black,
  },
  newItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newItemButtonText: {
    fontFamily: Rubik.Medium,
    color: Colors.Black,
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 12,
  },
  itemList: {
    marginVertical: 20,
  },
  cannotFindListButton: {
    marginTop: 30,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: Colors.Main,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  cannotFindListButtonText: {
    fontFamily: Rubik.SemiBold,
    fontSize: 14,
    color: Colors.White,
  },
});
