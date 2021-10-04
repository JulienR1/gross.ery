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
  itemContainer: {
    marginVertical: 7,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  itemCheckbox: {
    width: 24,
    height: 24,
    borderColor: Colors.Main,
    borderWidth: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  itemText: {
    fontFamily: Rubik.Medium,
    fontSize: 16,
    lineHeight: 18,
    color: Colors.Black,
    flex: 1,
  },
  itemTextChecked: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  itemEndControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
