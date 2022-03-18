import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {Colors} from '../../styles/colors';
import {styles} from './styles';

export function GoBack() {
  const navigation = useNavigation();

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack}>
        <Icon size={24} color={Colors.Black} name="close" type="antdesign" />
      </TouchableOpacity>
    </View>
  );
}
