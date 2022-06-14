import { StyleSheet } from 'react-native';

import { Colors } from '~/styles';

export const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 4,
    marginHorizontal: '4%',
    backgroundColor: Colors.Main,
    maxHeight: 36,
    overflow: 'hidden',
  },
});
