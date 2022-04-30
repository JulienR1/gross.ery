import React from 'react';
import { FlatList, Text, View } from 'react-native';

import { Loader } from '~/components';

import { ListCard } from '../list-card';
import { useLocalLists } from './hooks';
import { styles } from './styles';

export const ListShowcase = () => {
  const lists = useLocalLists();

  const { container, wrapper, text, showcaseList } = styles;
  return (
    <View style={container}>
      {lists.isLoading ? (
        <Loader />
      ) : lists.localLists.length === 0 ? (
        <View style={wrapper}>
          <Text style={text}>Aucune liste n'est enregistrée</Text>
        </View>
      ) : (
        <FlatList
          scrollEnabled
          style={showcaseList}
          data={lists.localLists}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <ListCard list={item} />}
        />
      )}
    </View>
  );
};
