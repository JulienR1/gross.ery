import { StyleSheet } from 'react-native';

import { Colors } from '~/styles';

export const dragHandleStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: 36,
    justifyContent: 'center',
  },
  handle: {
    width: '15%',
    height: 4,
    borderRadius: 4,
    alignSelf: 'center',
    backgroundColor: Colors.BlackTransparent,
  },
});
