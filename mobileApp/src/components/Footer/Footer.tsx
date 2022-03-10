import React, {ReactNode, ReactNodeArray} from 'react';
import {Text, View} from 'react-native';
import {version} from './../../../package.json';
import {styles} from './styles';

interface IProps {
  children: ReactNode | ReactNodeArray;
}

export function Footer({children}: IProps) {
  return (
    <>
      {children}
      <View style={styles.footer}>
        <Text style={styles.content}>v{version}</Text>
      </View>
    </>
  );
}
