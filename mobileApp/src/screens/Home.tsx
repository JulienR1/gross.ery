import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {ListCard} from '../components/ListCard';
import {IListParams} from '../models/NavigationParams';
import {Routes} from '../navigation/routes';

export function Home() {
  const navigation = useNavigation();

  let tempdata = [
    {
      title: 'stuff',
      lastModification: new Date(),
      itemCount: 3,
      id: '613c0da5cffed8a1df1b2a01',
    },
  ];

  const renderClickableListCard = (listId: string) => {
    const navigationParams: IListParams = {listId};
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(Routes.List, navigationParams)}>
        <ListCard id={listId} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <Text>Listes enregistrées</Text>
      <FlatList
        data={tempdata}
        keyExtractor={item => item.id} // TODO: Remove + index
        renderItem={({item}) => renderClickableListCard(item.id)}
      />
    </SafeAreaView>
  );
}
