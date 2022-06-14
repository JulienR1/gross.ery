import React, { memo, useCallback } from 'react';
import { Text, View } from 'react-native';
import { ModalProps } from '../types';
import { styles } from './styles';
import { styles as modalStyles } from '../styles';
import { ModalForm } from '../components';
import { Colors } from '~/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const CancelEditModal = memo(({ onClose }: ModalProps<void>) => {
  const {
    modalContainer,
    titleText,
    messageText,
    textWithIconContainer,
    buttonText,
    buttonIcon,
  } = styles;
  const closeModal = useCallback(
    (cancelled: boolean) => () => onClose?.({ cancelled }),
    [onClose],
  );

  const cancelComponent = () => <Text style={buttonText}>Continuer</Text>;

  const pursueComponent = () => (
    <View style={textWithIconContainer}>
      <Icon name="cancel" style={buttonIcon} color={Colors.White} size={16} />
      <Text style={buttonText}>Quitter</Text>
    </View>
  );

  const { section } = modalStyles;
  return (
    <View style={modalContainer}>
      <View style={section}>
        <Text style={titleText}>Confirmer l'opération</Text>
        <Text style={messageText}>
          Voulez-vous vraiment continuer? Les valeurs saisies seront perdues.
        </Text>
      </View>

      <ModalForm
        cancel={{
          component: cancelComponent,
          onPress: closeModal(true),
        }}
        pursue={{
          component: pursueComponent,
          onPress: closeModal(false),
          color: Colors.Red,
        }}
      />
    </View>
  );
});
