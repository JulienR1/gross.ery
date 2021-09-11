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
  const server = process.env.REACT_APP_SERVER_ENDPOINT as string;

  useEffect(() => {
    fetch(`${server}/${route.params.listId}`).then(response => {
      response.json().then(content => {
        console.log(content);
      });
    });
  }, []);
  return <Text>{route.params.listId}</Text>;
}
