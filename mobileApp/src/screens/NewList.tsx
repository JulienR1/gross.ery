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

function NewList() {
  const [enteredId, setEnteredId] = useState<string>('');

  const createNewList = async () => {
    const response = await fetch(`${SERVER_ENDPOINT}/new`, {method: 'PUT'});
    const generatedListId = await response.text();
    if (generatedListId) {
      await recordList(generatedListId);
    }
  };

  const recordList = async (idToRecord: string) => {
    if (idToRecord) {
      try {
        const listData: ListData = await fetchListData(idToRecord);
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
        onSubmitEditing={() => recordList(enteredId)}
        onChangeText={text => setEnteredId(text)}
      />
      <TouchableOpacity onPress={() => recordList(enteredId)}>
        <Text>OK!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => createNewList()}>
        <Text>Créer une nouvelle liste!</Text>
      </TouchableOpacity>
    </View>
  );
}

export default NewList;
