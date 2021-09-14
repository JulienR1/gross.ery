import {SERVER_ENDPOINT} from '@env';
import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {saveListToLocalStorage} from '../localstorage';

interface ListData {
  _id: string;
  items: ItemData[];
}

// TODO: Sync w/ cloudservice models
interface ItemData {
  name: string;
  checked: boolean;
}

export function Subscribe() {
  const [enteredId, setEnteredId] = useState<string>(
    '6140b24f7a4c24d18a7edf00',
  );

  const recordList = async () => {
    if (enteredId) {
      try {
        const listData: ListData = await fetchListData(enteredId);
        saveListToLocalStorage(
          listData._id,
          'random name',
          listData.items.length,
        );
      } catch (exception) {
        console.log('The provided id does not exist.');
      }
    }
  };

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

  return (
    <View>
      <Text>Subscribe</Text>
      <TextInput
        placeholder="id de la liste"
        onSubmitEditing={() => recordList()}
        onChangeText={text => setEnteredId(text)}
      />
      <TouchableOpacity onPress={() => recordList()}>
        <Text>OK!</Text>
      </TouchableOpacity>
    </View>
  );
}
