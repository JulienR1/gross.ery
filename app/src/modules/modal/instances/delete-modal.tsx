import React, { memo, ReactElement, useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useAnimation } from '~/animations';
import { Colors } from '~/styles';

import { ModalProps } from '../types';
import { styles } from './styles';

interface IProps {
  title?: string;
  message?: string | ReactElement<Text>;
}

interface IReturnPayload {
  mustDelete: boolean;
}

enum DeleteStatus {
  PENDING = 'pending',
  DELETED = 'deleting',
  CANCELLED = 'cancelled',
}

export const DeleteModal = memo(
  ({
    onClose,
    props: { title, message },
  }: ModalProps<IReturnPayload, IProps>) => {
    const { animationPercent, animate } = useAnimation(250);
    const [deleteStatus, setDeleteStatus] = useState(DeleteStatus.PENDING);

    const closeModal = useCallback(
      (mustDelete: boolean) => () => {
        const newDeleteStatus = mustDelete
          ? DeleteStatus.DELETED
          : DeleteStatus.CANCELLED;

        setDeleteStatus(newDeleteStatus);
        animate(1, () => onClose?.({ mustDelete }));
      },
      [animate, onClose],
    );

    const {
      modalContainer,
      section,
      buttonContainer,
      titleText,
      messageText,
      button,
      textWithIconContainer,
      buttonRed,
      buttonText,
      buttonIcon,
    } = styles;

    const shrinkPercent = 1 - Math.min(animationPercent / 0.8, 1);
    const buttonShrinkStyle = {
      opacity: shrinkPercent,
      maxWidth: `${shrinkPercent * 100}%`,
      marginHorizontal: `${shrinkPercent * 4}%`,
    };

    return (
      <View style={modalContainer}>
        <View style={section}>
          <Text style={titleText}>{title ?? 'Supprimer'}</Text>
          {message && <Text style={messageText}>{message}</Text>}
        </View>

        <View style={[section, buttonContainer]}>
          <TouchableOpacity
            style={[
              button,
              deleteStatus === DeleteStatus.DELETED && buttonShrinkStyle,
            ]}
            onPress={closeModal(false)}>
            <Text style={buttonText}>Annuler</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              button,
              buttonRed,
              deleteStatus === DeleteStatus.CANCELLED && buttonShrinkStyle,
            ]}
            onPress={closeModal(true)}>
            <View style={textWithIconContainer}>
              <Icon
                name="trash-can-outline"
                style={buttonIcon}
                color={Colors.White}
                size={16}
              />
              <Text style={buttonText}>Supprimer</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);
