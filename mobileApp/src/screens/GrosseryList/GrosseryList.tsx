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
    await new Promise(resolve => setTimeout(resolve, 2500));
    await doRequest(route.params.listId).removeItem(item.name);
    fetchListData();
  };

  // const isMounted = useRef<boolean>(true);
  // const [isLoading, setIsLoading] = useState<boolean>(true);

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

  // const removeItem = async (itemName: string) => {
  //   if (listData?.items.find(item => item.name === itemName)) {
  //     await doRequest(route.params.listId).removeItem(itemName);
  //     await updateLists();
  //   }
  // };

  // const deleteList = async () => {
  //   await doRequest(route.params.listId).removeList();
  //   navigation.goBack();
  // };

  // const updateLists = async () => {
  //   const listData = await doRequest(route.params.listId).getListData();
  //   if (isMounted.current) {
  //     setListData(listData);
  //   }
  // };

  // const render = () => {
  //   if (!listData) {
  //     return;
  //   }

  //   const {name, items} = listData;
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.title}>{name}</Text>
  //       <FlatList
  //         data={Object.values(items)}
  //         keyExtractor={(_, index) => index.toString()}
  //         style={styles.itemList}
  //         renderItem={({item}: {item: IItemData}) => (
  //           <View style={styles.itemContainer}>
  //             <TouchableOpacity
  //               style={styles.itemCheckbox}
  //               onPress={() => toggleItemCheck(item)}>
  //               {item.checked && (
  //                 <Icon name="check" size={20} color={Colors.Green} />
  //               )}
  //             </TouchableOpacity>
  //             <Text
  //               style={[
  //                 styles.itemText,
  //                 item.checked && styles.itemTextChecked,
  //               ]}>
  //               {item.name}
  //             </Text>

  //             <View style={styles.itemEndControls}>
  //               <TouchableOpacity>
  //                 <Icon name="edit" color={Colors.Main} size={22} />
  //               </TouchableOpacity>
  //               <TouchableOpacity
  //                 onPress={
  //                   () =>
  //                     console.log('removing item') /* removeItem(item.name)*/
  //                 }>
  //                 <Icon name="close" color={Colors.Red} size={22} />
  //               </TouchableOpacity>
  //             </View>
  //           </View>
  //         )}
  //       />

  //       {/* {!addingNewItem && (
  //         <TouchableOpacity
  //           onPress={() => setAddingNewItem(true)}
  //           style={styles.newItemButton}>
  //           <Icon name="add" size={30} />
  //           <Text style={styles.newItemButtonText}>Ajouter un item</Text>
  //         </TouchableOpacity>
  //       )}

  //       {addingNewItem && (
  //         <View>
  //           <Text>Ajouter un nouvel item</Text>
  //           <TextInput
  //             placeholder="Nom.."
  //             onChangeText={text => setNewItemText(text)}
  //             onSubmitEditing={saveNewItem}
  //           />
  //           <TouchableOpacity onPress={saveNewItem}>
  //             <Text>OK!</Text>
  //           </TouchableOpacity>
  //         </View>
  //       )} */}

  //       {/*

  //       <TouchableOpacity onPress={() => deleteList()}>
  //         <Text>DELETE LIST</Text>
  //       </TouchableOpacity> */}
  //     </View>
  //   );
  // };

  return (
    <FocusContext>
      {!listData && <Loader />}
      {listData && (
        <View style={styles.container}>
          <Text style={styles.title}>{listData.name}</Text>
          <FlatList
            style={styles.itemList}
            data={listData.items}
            extraData={listData}
            renderItem={({item}) => (
              <GrosseryItem
                initialItemData={item}
                onItemUpdate={updatedItem => updateItemCheck(item, updatedItem)}
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
    </FocusContext>
  );
}
