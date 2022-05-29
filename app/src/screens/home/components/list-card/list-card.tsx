import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '~/modules/navigation';
import { ILocalList } from '~/modules/storage/types';
import { Screen } from '~/screens';
import { ListScreenProps } from '~/screens/list.screen';

import { useFormattedDate } from './hooks';
import { styles } from './styles';

interface IProps {
  list: ILocalList;
}

export const ListCard = ({ list }: IProps) => {
  const { loadScreen } = useNavigation();
  const { day, month } = useFormattedDate(list.lastUpdate);

  const loadListScreen = () =>
    loadScreen<ListScreenProps>(Screen.List, { listId: list.id });

  const { card, dateContainer, date, title, itemText } = styles;
  return (
    <TouchableOpacity onPress={loadListScreen}>
      <View style={card}>
        <View style={dateContainer}>
          <Text style={date}>{day}</Text>
          <Text style={date}>{month}</Text>
        </View>
        <Text style={title}>{list.name}</Text>
        <Text style={itemText}>
          {list.items.length} {list.items.length <= 1 ? 'item' : 'items'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
