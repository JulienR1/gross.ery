import {useFocusEffect, useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {ListCard} from '../../components/ListCard';
import {Loader} from '../../components/Loader';
import {getAllLocalListData} from '../../localstorage';
import {ILocalList} from '../../models/ILocalList';
import {IListParams} from '../../models/NavigationParams';
import {Routes} from '../../navigation/routes';
import {Colors} from '../../styles/colors';
import {styles} from './styles';

export function Home() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [localLists, setLocalLists] = useState<ILocalList[]>([]);

  useFocusEffect(() => {
    let isMounted = true;
    getAllLocalListData().then(savedLocalLists => {
      if (isMounted) {
        setLocalLists(savedLocalLists);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  });

  const renderClickableListCard = (localList: ILocalList) => {
    const navigationParams: IListParams = {listId: localList.id};
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(Routes.List, navigationParams)}
        style={styles.listElement}>
        <ListCard localList={localList} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Mes listes</Text>
        {!isLoading && (
          <TouchableOpacity onPress={() => navigation.navigate(Routes.NewList)}>
            <Icon name="add" size={36} color={Colors.Black} />
          </TouchableOpacity>
        )}
      </View>

      {isLoading && <Loader />}
      {!isLoading && localLists.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Aucune liste n'est enregistrée</Text>
        </View>
      )}
      {!isLoading && localLists.length > 0 && (
        <FlatList
          scrollEnabled
          data={localLists}
          keyExtractor={item => item.id}
          renderItem={({item}) => renderClickableListCard(item)}
        />
      )}
    </SafeAreaView>
  );
}