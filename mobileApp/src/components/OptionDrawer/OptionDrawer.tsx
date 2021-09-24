import React, {ReactNode, ReactNodeArray, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Drawer} from '../Drawer';
import {styles} from './styles';

interface IProps {
  onClose: () => void;
  onSubmit: () => void;
  children: ReactNode | ReactNodeArray;
  submitTitle?: string;
  submitIsValid?: boolean;
  disabledButtons?: boolean;
}

export function OptionDrawer({
  onClose,
  onSubmit,
  children,
  submitTitle,
  submitIsValid = true,
  disabledButtons = false,
}: IProps) {
  return (
    <Drawer onClose={onClose}>
      <View style={styles.content}>{children}</View>
      {!disabledButtons && (
        <View style={styles.buttonContainer}>
          <View style={styles.content}>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.button, styles.cancel]}>
              <Text style={styles.buttonText}>Annuler</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <TouchableOpacity
              onPress={onSubmit}
              style={
                submitIsValid
                  ? [styles.button, styles.submit]
                  : [styles.button, styles.submit, styles.disabled]
              }
              disabled={!submitIsValid}>
              <Text style={styles.buttonText}>{submitTitle || 'Envoyer'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Drawer>
  );
}
