import {useFocusEffect, useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {ListCard} from '../components/ListCard';
import {getAllLocalListData} from '../localstorage';
import {ILocalList} from '../models/ILocalList';
import {IListParams} from '../models/NavigationParams';
import {Routes} from '../navigation/routes';

function Home() {
  const navigation = useNavigation();
  const [localLists, setLocalLists] = useState<ILocalList[]>([]);

  useFocusEffect(() => {
    let isMounted = true;
    getAllLocalListData().then(savedLocalLists => {
      if (isMounted) {
        setLocalLists(savedLocalLists);
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
        onPress={() => navigation.navigate(Routes.List, navigationParams)}>
        <ListCard localList={localList} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <Text>Listes enregistrées</Text>
      <FlatList
        data={localLists}
        keyExtractor={item => item.id}
        renderItem={({item}) => renderClickableListCard(item)}
      />
      <TouchableOpacity onPress={() => navigation.navigate(Routes.Subscribe)}>
        <Text>Ajouter une nouvelle liste</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Home;
