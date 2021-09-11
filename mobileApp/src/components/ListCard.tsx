import React from 'react';
import {Text} from 'react-native';

interface IProps {
  id: string;
}

export function ListCard({id}: IProps) {
  return <Text>card{id}</Text>;
}
