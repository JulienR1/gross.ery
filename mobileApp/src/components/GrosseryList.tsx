import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {IListParams} from '../models/NavigationParams';
import {SERVER_ENDPOINT} from '@env';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {saveListToLocalStorage} from '../localstorage';

interface IProps {
  route: INavigationRoute;
}

interface INavigationRoute {
  params: IListParams;
}

interface ListData {
  _id: string;
  items: ItemData[];
}

interface ItemData {
  name: string;
  checked: boolean;
}

interface ILocallySavedLists {
  [key: string]: ILocallySavedList;
}

interface ILocallySavedList {
  id: string;
  title: string;
  itemCount: number;
  lastUpdateTime: Date;
}

export function GrosseryList({route}: IProps) {
  const [items, setItems] = useState<ItemData[]>([]);

  useEffect(() => {
    let isMounted = true;

    fetchListData(route.params.listId).then(listData => {
      if (isMounted) {
        setItems(listData.items);
        saveListToLocalStorage(
          listData._id,
          'random title for now',
          listData.items.length,
        );
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const fetchListData = (listId: string): Promise<ListData> => {
    return new Promise(async resolve => {
      const response = await fetch(`${SERVER_ENDPOINT}?${listId}`);
      const jsonData = await response.json();
      return resolve(jsonData);
    });
  };

  return (
    <>
      {items?.length === 0 && <Text>Loading!</Text>}
      {items?.length !== 0 && (
        <View>
          <Text>Nom de la liste ici</Text>
          <FlatList
            data={items}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}: {item: ItemData}) => (
              <View>
                <Text>{item.name}</Text>
                <TouchableOpacity>
                  <Text> {item.checked ? 'checked' : 'not checked'}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}
    </>
  );
}
