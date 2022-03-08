import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {modalStyles} from './styles';

interface IProps {
  onManualCheck: () => Promise<void>;
}

export function ConnectivityModal({onManualCheck}: IProps) {
  const [isManualConnectionVisible, setManualConnectionVisible] =
    useState(false);
  const [isCheckingForConnectivity, setIsCheckingForConnectivity] =
    useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setManualConnectionVisible(true), 5000);
    return () => clearTimeout(timeout);
  }, []);

  const manuallyCheckForConnectivity = async () => {
    setIsCheckingForConnectivity(true);
    await onManualCheck();
    setIsCheckingForConnectivity(false);
  };

  return (
    <View style={modalStyles.container}>
      <Text style={modalStyles.title}>Attention!</Text>
      <Text style={modalStyles.description}>Le serveur est inaccessible.</Text>
      <Text style={modalStyles.description}>
        Connectez-vous à internet pour consulter vos listes.
      </Text>

      {isManualConnectionVisible && (
        <View style={modalStyles.manualCheckContainer}>
          <TouchableOpacity
            onPress={manuallyCheckForConnectivity}
            disabled={isCheckingForConnectivity}>
            <Text style={[modalStyles.manualCheck, modalStyles.bold]}>
              Confirmer manuellement la connexion
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
