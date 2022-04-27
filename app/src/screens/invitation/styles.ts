import { Dimensions, StyleSheet } from 'react-native';

import { Colors, rootStyles, Rubik } from '~/styles';

export const styles = StyleSheet.create({
  container: {
    width:
      Dimensions.get('window').width - 2 * rootStyles.screen.marginHorizontal,
    height: '100%',
  },
  imageContainer: {
    maxWidth: 200,
    alignSelf: 'center',
  },
  image: {
    aspectRatio: 1,
    width: '100%',
    height: undefined,
  },
  title: {
    fontSize: 22,
    paddingVertical: 12,
    fontFamily: Rubik.Medium,
    marginBottom: 30,
  },
  feedback: {
    marginVertical: 36,
    fontSize: 16,
  },
  text: {
    color: Colors.Black,
    textAlign: 'center',
  },
});
