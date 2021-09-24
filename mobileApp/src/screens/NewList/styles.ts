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
  inputField: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.Main,
    fontFamily: Rubik.Light,
    fontSize: 14,
    lineHeight: 17,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  feedbackIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {styles, drawerStyles};
