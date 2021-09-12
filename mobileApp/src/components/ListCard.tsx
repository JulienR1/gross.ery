import React from 'react';
import {Text} from 'react-native';
import {ILocalList} from '../models/ILocalList';

interface IProps {
  localList: ILocalList;
}
export function ListCard({localList}: IProps) {
  return (
    <>
      <Text>card</Text>
      <Text>
        {localList.id}: {localList.name}
      </Text>
      <Text>
        {localList.itemCount} {localList.itemCount === 1 ? 'item' : 'items'}
      </Text>
    </>
  );
}
