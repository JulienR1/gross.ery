import { StyleSheet } from 'react-native';

import { Colors } from '~/styles';

export const styles = StyleSheet.create({
  button: {
    width: '45%',
    maxWidth: 160,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.Main,
    aspectRatio: 1.1,
    borderRadius: 8,
    padding: 10,
  },
  shadow: {
    elevation: 8,
    shadowColor: Colors.BlackTransparent,
    shadowRadius: 12,
    shadowOffset: { height: 16, width: 0 },
  },
  pressed: {
    backgroundColor: Colors.MainTransparent,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  wrapperPressed: {
    opacity: 0.4,
  },
});
