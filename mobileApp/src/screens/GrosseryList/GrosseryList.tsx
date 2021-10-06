import React, {useEffect, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/core';
import {IListParams} from '../../models/NavigationParams';
import {IItemData, IListData} from '../../models/IListData';
import {doRequest} from '../../services/requests';
import {Loader} from '../../components/Loader';
import {styles} from './styles';
import {Icon} from 'react-native-elements';
import {GrosseryItem} from '../../components/GrosseryItem';
import {FocusContext} from '../../contexts/FocusContext';
import {ModalContext} from '../../contexts/ModalContext';

interface IProps {
  route: INavigationRoute;
}

interface INavigationRoute {
  params: IListParams;
}

export function GrosseryList({route}: IProps) {
  const listId = route.params.listId;

  const navigation = useNavigation();
  const isMounted = useRef<boolean>(true);
  const [listData, setListData] = useState<IListData | undefined>(undefined);

  const [addingNewItem, setAddingNewItem] = useState<boolean>(false);
  const [newItemText, setNewItemText] = useState<string | undefined>(undefined);

  useEffect(() => {
    fetchListData();
    return () => {
      isMounted.current = false;
    };
  }, []);

  const fetchListData = async () => {
    const newListData = await doRequest(listId).getListData();
    if (isMounted.current) {
      setListData(newListData);
    }
  };

  const updateItemCheck = async (
    originalItem: IItemData,
    updatedItem: IItemData,
  ) => {
    if (originalItem !== updatedItem) {
      await doRequest(route.params.listId).updateItem(
        originalItem.name,
        updatedItem,
      );
      fetchListData();
    }
  };

  const removeItem = async (item: IItemData) => {
    const itemIndex = listData?.items.indexOf(item);
    const updatedListData: IListData = JSON.parse(JSON.stringify(listData));

    if (updatedListData && itemIndex && itemIndex >= 0) {
      updatedListData.items.splice(itemIndex, 1);
      setListData(updatedListData);
    }
    await doRequest(route.params.listId).removeItem(item.name);
    fetchListData();
  };

  // useEffect(() => {
  //   updateLists()
  //     .then(() => {
  //       setIsLoading(false);
  //     })
  //     .catch(() => {
  //       console.log('The requested list does not exist anymore.');
  //       navigation.goBack();
  //     });

  //   return () => {
  //     isMounted.current = false;
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const saveNewItem = async () => {
    if (newItemText) {
      await doRequest(route.params.listId).addNewItem(newItemText);
      await fetchListData();
    }

    setNewItemText(undefined);
    setAddingNewItem(false);
  };

  // const deleteList = async () => {
  //   await doRequest(route.params.listId).removeList();
  //   navigation.goBack();
  // };

  return (
    <FocusContext>
      <ModalContext>
        {!listData && <Loader />}
        {listData && (
          <View style={styles.container}>
            <Text style={styles.title}>{listData.name}</Text>
            <FlatList
              style={styles.itemList}
              data={listData.items}
              keyExtractor={item => item.name}
              renderItem={({item}) => (
                <GrosseryItem
                  initialItemData={item}
                  onItemUpdate={updatedItem =>
                    updateItemCheck(item, updatedItem)
                  }
                  onDelete={() => removeItem(item)}
                />
              )}
            />

            {!addingNewItem && (
              <TouchableOpacity
                onPress={() => setAddingNewItem(true)}
                style={styles.newItemButton}>
                <Icon name="add" size={30} />
                <Text style={styles.newItemButtonText}>Ajouter un item</Text>
              </TouchableOpacity>
            )}

            {/* TODO */}
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
        )}
      </ModalContext>
    </FocusContext>
  );
}
