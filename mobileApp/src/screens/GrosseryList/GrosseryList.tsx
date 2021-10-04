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
import {Colors} from '../../styles/colors';
import {GrosseryItem} from '../../components/GrosseryItem';

interface IProps {
  route: INavigationRoute;
}

interface INavigationRoute {
  params: IListParams;
}

export function GrosseryList({route}: IProps) {
  const navigation = useNavigation();
  const isMounted = useRef<boolean>(true);
  const [listData, setListData] = useState<IListData | undefined>(undefined);

  useEffect(() => {
    fetchListData();
    return () => {
      isMounted.current = false;
    };
  });

  const fetchListData = async () => {
    const newListData = await doRequest(route.params.listId).getListData();
    if (isMounted.current) {
      setListData(newListData);
    }
  };

  const toggleItemCheck = async (item: IItemData) => {
    item.checked = !item.checked;

    const updatedListData = listData;
    const itemToReplaceIndex = updatedListData?.items.findIndex(
      oldItem => oldItem === item,
    );
    if (updatedListData && itemToReplaceIndex && itemToReplaceIndex >= 0) {
      updatedListData.items[itemToReplaceIndex] = item;
      setListData(updatedListData);
    }

    await doRequest(route.params.listId).updateItem(item.name, item);
    await fetchListData();
  };

  // const isMounted = useRef<boolean>(true);
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  // const [addingNewItem, setAddingNewItem] = useState<boolean>(false);
  // const [newItemText, setNewItemText] = useState<string | undefined>(undefined);

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

  // const saveNewItem = async () => {
  //   if (newItemText) {
  //     await doRequest(route.params.listId).addNewItem(newItemText);
  //     await updateLists();
  //   }

  //   setNewItemText(undefined);
  //   setAddingNewItem(false);
  // };

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
    <>
      {!listData && <Loader />}
      {listData && (
        <View>
          <Text style={styles.title}>{listData.name}</Text>
          <FlatList
            data={listData.items}
            renderItem={({item}) => <GrosseryItem itemData={item} />}
          />
        </View>
      )}
    </>
  );
}
