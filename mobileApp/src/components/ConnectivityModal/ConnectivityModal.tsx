import React from 'react';
import {Text, View} from 'react-native';
import {modalStyles} from './styles';

export function ConnectivityModal() {
  return (
    <View style={modalStyles.container}>
      <Text style={modalStyles.title}>Attention!</Text>
      <Text style={modalStyles.description}>Le serveur est inaccessible.</Text>
      <Text style={modalStyles.description}>
        Connectez-vous à internet pour consulter vos listes.
      </Text>
    </View>
  );
}
