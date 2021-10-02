import React, {useEffect, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/core';
import {IListParams} from '../../models/NavigationParams';
import {IItemData} from '../../models/IListData';
import {doRequest} from '../../services/requests';
import {Loader} from '../../components/Loader';

interface IProps {
  route: INavigationRoute;
}

interface INavigationRoute {
  params: IListParams;
}

export function GrosseryList({route}: IProps) {
  const navigation = useNavigation();
  const [items, setItems] = useState<IItemData[]>([]);

  const isMounted = useRef<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [addingNewItem, setAddingNewItem] = useState<boolean>(false);
  const [newItemText, setNewItemText] = useState<string | undefined>(undefined);

  useEffect(() => {
    updateLists()
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        console.log('The requested list does not exist anymore.');
        navigation.goBack();
      });

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveNewItem = async () => {
    if (newItemText) {
      await doRequest(route.params.listId).addNewItem(newItemText);
      updateLists();
    }

    setNewItemText(undefined);
    setAddingNewItem(false);
  };

  const removeItem = async (itemName: string) => {
    if (items.find(item => item.name === itemName)) {
      await doRequest(route.params.listId).removeItem(itemName);
      await updateLists();
    }
  };

  const deleteList = async () => {
    await doRequest(route.params.listId).removeList();
    navigation.goBack();
  };

  const updateLists = async () => {
    const listData = await doRequest(route.params.listId).getListData();
    if (isMounted.current) {
      setItems(listData.items);
    }
  };

  const render = () => {
    return (
      <View>
        <Text>Nom de la liste ici</Text>
        <FlatList
          data={items}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}: {item: IItemData}) => (
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

        <TouchableOpacity onPress={() => deleteList()}>
          <Text>DELETE LIST</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && render()}
    </>
  );
}
