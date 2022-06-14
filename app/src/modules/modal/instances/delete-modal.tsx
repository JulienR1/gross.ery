import React, { memo, ReactElement, useCallback } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Colors } from '~/styles';

import { ModalForm } from '../components';
import { styles as modalStyles } from '../styles';
import { ModalProps } from '../types';
import { styles } from './styles';

interface IProps {
  title?: string;
  message?: string | ReactElement<Text>;
}

interface IReturnPayload {
  mustDelete: boolean;
}

export const DeleteModal = memo(
  ({
    onClose,
    props: { title, message },
  }: ModalProps<IReturnPayload, IProps>) => {
    const closeModal = useCallback(
      (mustDelete: boolean) => () => onClose?.({ mustDelete }),
      [onClose],
    );

    const cancelComponent = () => <Text style={buttonText}>Annuler</Text>;

    const pursueComponent = () => (
      <View style={textWithIconContainer}>
        <Icon
          name="trash-can-outline"
          style={buttonIcon}
          color={Colors.White}
          size={16}
        />
        <Text style={buttonText}>Supprimer</Text>
      </View>
    );

    const {
      modalContainer,
      titleText,
      messageText,
      textWithIconContainer,
      buttonText,
      buttonIcon,
    } = styles;
    const { section } = modalStyles;
    return (
      <View style={modalContainer}>
        <View style={section}>
          <Text style={titleText}>{title ?? 'Supprimer'}</Text>
          {message && <Text style={messageText}>{message}</Text>}
        </View>

        <ModalForm
          cancel={{
            component: cancelComponent,
            onPress: closeModal(false),
          }}
          pursue={{
            component: pursueComponent,
            onPress: closeModal(true),
            color: Colors.Red,
          }}
        />
      </View>
    );
  },
);
