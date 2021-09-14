import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {IListParams} from '../models/NavigationParams';
import {SERVER_ENDPOINT} from '@env';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {
  removeListFromLocalStorage,
  saveListToLocalStorage,
} from '../localstorage';
import {useNavigation} from '@react-navigation/core';

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

// TODO: Sync w/ cloudservice models
interface ItemData {
  name: string;
  checked: boolean;
}

function GrosseryList({route}: IProps) {
  const navigation = useNavigation();
  const [items, setItems] = useState<ItemData[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [addingNewItem, setAddingNewItem] = useState<boolean>(false);
  const [newItemText, setNewItemText] = useState<string | undefined>(undefined);

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    fetchListData(route.params.listId)
      .then(listData => {
        if (isMounted) {
          setItems(listData.items);
          saveListToLocalStorage(
            listData._id,
            'random title for now',
            listData.items.length,
          );
          setIsLoading(false);
        }
      })
      .catch(async () => {
        // Si la liste ne peut pas etre trouvee.
        await removeListFromLocalStorage(route.params.listId);
        navigation.goBack();
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const fetchListData = (listId: string): Promise<ListData> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${SERVER_ENDPOINT}?${listId}`);
        const jsonData = await response.json();
        return resolve(jsonData);
      } catch (exception) {
        return reject();
      }
    });
  };

  const saveNewItem = async () => {
    if (newItemText) {
      const bodyToSend = {id: route.params.listId, itemName: newItemText};
      await fetch(`${SERVER_ENDPOINT}/add`, {
        body: JSON.stringify(bodyToSend),
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      await fetchListData(route.params.listId).then(listData => {
        setItems(listData.items);
        saveListToLocalStorage(
          listData._id,
          'random title for now',
          listData.items.length,
        );
      });
    } else {
      // pop-up ?
    }

    setNewItemText(undefined);
    setAddingNewItem(false);
  };

  const removeItem = async (itemName: string) => {
    if (items.find(item => item.name === itemName)) {
      const bodyToSend = {id: route.params.listId, itemName};
      await fetch(`${SERVER_ENDPOINT}/remove/item`, {
        body: JSON.stringify(bodyToSend),
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      await fetchListData(route.params.listId).then(listData => {
        setItems(listData.items);
        saveListToLocalStorage(
          listData._id,
          'random title for now',
          listData.items.length,
        );
      });
    }
  };

  const render = () => {
    return (
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
              <TouchableOpacity onPress={() => removeItem(item.name)}>
                <Text>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        {!addingNewItem && (
          <TouchableOpacity onPress={() => setAddingNewItem(true)}>
            <Text>+</Text>
          </TouchableOpacity>
        )}
        {addingNewItem && (
          <View>
            <Text>Ajouter un nouvel item</Text>
            <TextInput
              placeholder="Nom.."
              onChangeText={text => setNewItemText(text)}
              onSubmitEditing={saveNewItem}
            />
            <TouchableOpacity onPress={saveNewItem}>
              <Text>OK!</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <>
      {isLoading && <Text>Loading!</Text>}
      {!isLoading && render()}
    </>
  );
}

export default GrosseryList;
