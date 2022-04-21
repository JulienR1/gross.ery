import {StyleSheet} from 'react-native';
import {Rubik} from '../../fonts/Rubik';
import {Colors} from '../../styles/colors';

export const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    justifyContent: 'space-between',
    height: '100%',
  },
  container: {
    paddingHorizontal: 40,
  },
  header: {
    height: 90,
    justifyContent: 'flex-end',
  },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontFamily: Rubik.SemiBold,
    fontSize: 28,
    lineHeight: 33,
    color: Colors.Black,
    marginLeft: 8,
  },
  text: {
    marginTop: 20,
    fontFamily: Rubik.Regular,
    fontSize: 18,
    color: Colors.Black,
  },
  textCenter: {
    textAlign: 'center',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
  },
  textLink: {
    fontFamily: Rubik.Light,
    color: Colors.Black,
    fontSize: 14,
    marginRight: 6,
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
  listContainer: {
    flex: 1,
    position: 'relative',
  },
  itemList: {
    marginVertical: 20,
    maxHeight: '85%',
    flexGrow: 0,
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
  footer: {
    alignSelf: 'flex-end',
    height: 150,
  },
  qrContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});

export const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: Rubik.SemiBold,
    fontSize: 20,
    color: Colors.Black,
    marginBottom: 8,
  },
  description: {
    fontFamily: Rubik.Regular,
    color: Colors.Black,
    fontSize: 16,
  },
  bold: {
    fontFamily: Rubik.Medium,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 3,
  },
  cancelButton: {
    backgroundColor: Colors.Main,
  },
  deleteButton: {
    backgroundColor: Colors.Red,
  },
  buttonText: {
    color: Colors.White,
    fontFamily: Rubik.SemiBold,
    fontSize: 14,
  },
});
