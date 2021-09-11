import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {IListParams} from '../models/NavigationParams';

interface IProps {
  route: INavigationRoute;
}

interface INavigationRoute {
  params: IListParams;
}

export function GrosseryList({route}: IProps) {
  useEffect(() => {
    console.log('adajodwn');
  }, []);
  return <Text>{route.params.listId}</Text>;
}
