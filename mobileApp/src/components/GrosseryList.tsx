import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {IListParams} from '../models/NavigationParams';
import {SERVER_ENDPOINT} from '@env';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';

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

export function GrosseryList({route}: IProps) {
  const [items, setItems] = useState<ItemData[]>([]);

  useEffect(() => {
    fetchListData(route.params.listId).then(listData => {
      setItems(listData.items);
      updateLocalStorage(listData._id, listData.items.length);
    });
  }, []);

  const fetchListData = (listId: string): Promise<ListData> => {
    return new Promise(async resolve => {
      const response = await fetch(`${SERVER_ENDPOINT}?${listId}`);
      const jsonData = await response.json();
      return resolve(jsonData);
    });
  };

  const updateLocalStorage = (id: string, itemCount: number) => {
    const lastUpdateTime = new Date();
    console.log('Saving to local storage.. TODO');
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
