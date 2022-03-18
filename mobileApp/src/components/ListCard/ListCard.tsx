import React from 'react';
import {Text, View} from 'react-native';
import {ILocalList} from '../../models/ILocalList';
import {styles} from './styles';

interface IProps {
  localList: ILocalList;
}

export function ListCard({localList}: IProps) {
  return (
    <View style={styles.card}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>
          {new Date(localList.lastUpdateTime)
            .getDate()
            .toString()
            .padStart(2, '0')}
        </Text>
        <Text style={styles.dateText}>
          {(new Date(localList.lastUpdateTime).getMonth() + 1)
            .toString()
            .padStart(2, '0')}
        </Text>
      </View>
      <Text style={styles.title}>{localList.name}</Text>
      <Text style={styles.itemText}>
        {localList.itemCount} {localList.itemCount <= 1 ? 'item' : 'items'}
      </Text>
    </View>
  );
}
