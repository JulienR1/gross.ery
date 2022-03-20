import React, {ReactNode, ReactNodeArray} from 'react';
import {Text, View} from 'react-native';
import config from '../../config';
import {version} from './../../../package.json';
import {styles} from './styles';

interface IProps {
  children: ReactNode | ReactNodeArray;
}

export function Footer({children}: IProps) {
  const versionToDisplay = config.IS_PROD ? `v${version}` : 'DEV';

  return (
    <>
      {children}
      <View style={styles.footer}>
        <Text style={styles.content}>{versionToDisplay}</Text>
      </View>
    </>
  );
}
