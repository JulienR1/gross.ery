import {StyleSheet} from 'react-native';
import {Rubik} from '../../fonts/Rubik';
import {Colors} from '../../styles/colors';

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'space-between',
  },

  subscribeMenu: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'stretch',
    flex: 0.5,
    marginHorizontal: 50,
    marginTop: 60,
  },
  title: {
    fontSize: 24,
    fontFamily: Rubik.SemiBold,
    marginBottom: 24,
    lineHeight: 33,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.Main,
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginBottom: 20,
    borderRadius: 8,
  },
  buttonText: {
    fontFamily: Rubik.Medium,
    marginLeft: 10,
    fontSize: 16,
    lineHeight: 19,
  },
});

const drawerStyles = StyleSheet.create({
  title: {
    fontFamily: Rubik.SemiBold,
    fontSize: 24,
    lineHeight: 33,
    marginBottom: 10,
  },
  message: {
    fontFamily: Rubik.Medium,
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 4,
  },
  flexContainer: {
    flexDirection: 'row',
  },
  inputField: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.Main,
    color: Colors.Black,
    fontFamily: Rubik.Light,
    fontSize: 14,
    lineHeight: 17,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  inputError: {
    backgroundColor: Colors.Red,
  },
  inputSuccess: {
    backgroundColor: Colors.Green,
  },
  iconButton: {
    backgroundColor: Colors.Main,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginLeft: 6,
  },
  sharedInputField: {
    flex: 1,
  },
  feedbackIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitButton: {
    backgroundColor: Colors.Main,
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 4,
    marginTop: 6,
  },
  exitMessage: {
    color: Colors.White,
    fontSize: 14,
    marginBottom: 0,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  detailsHeader: {
    fontFamily: Rubik.Medium,
    fontSize: 15,
    marginBottom: 4,
  },
  detailsText: {
    fontFamily: Rubik.Regular,
    fontSize: 14,
  },
});

export {styles, drawerStyles};
