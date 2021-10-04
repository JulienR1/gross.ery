import {SERVER_ENDPOINT} from '@env';
import React, {useState} from 'react';
import {View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {TextInput} from 'react-native-gesture-handler';
import {OptionDrawer} from '../../components/OptionDrawer';
import {Colors} from '../../styles/colors';
import {recordList} from './service';
import {drawerStyles} from './styles';

interface IProps {
  onClose: () => void;
}

enum RequestState {
  None,
  Processing,
  Success,
  Failed,
}

export function NewListDrawer({onClose}: IProps) {
  const [listName, setListName] = useState<string>('');
  const [requestState, setRequestState] = useState<RequestState>(
    RequestState.None,
  );

  const createNewList = async () => {
    setRequestState(RequestState.Processing);

    try {
      const response = await fetch(`${SERVER_ENDPOINT}/new`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify({listName}),
      });
      const listId = await response.text();

      setRequestState(RequestState.Success);
      await recordList(listId);
    } catch (ex) {
      setRequestState(RequestState.Failed);
    }
  };

  return (
    <OptionDrawer
      onClose={onClose}
      onSubmit={() => createNewList()}
      submitTitle="Créer"
      submitIsValid={Boolean(listName)}
      disabledButtons={requestState !== RequestState.None}>
      <Text style={drawerStyles.title}>Créer une liste</Text>
      <Text style={drawerStyles.message}>Nom de la liste</Text>
      <TextInput
        style={drawerStyles.inputField}
        onChangeText={text => setListName(text)}
        enabled={requestState === RequestState.None}
      />

      {requestState === RequestState.Processing && (
        <View style={drawerStyles.feedbackIcon}>
          <Icon name="autorenew" color={Colors.Main} size={100} />
        </View>
      )}
      {requestState === RequestState.Success && (
        <View style={drawerStyles.feedbackIcon}>
          <Icon name="check" color={Colors.Green} size={100} />
        </View>
      )}
      {requestState === RequestState.Failed && (
        <View style={drawerStyles.feedbackIcon}>
          <Icon name="close" color={Colors.Red} size={100} />
          <Text style={[drawerStyles.message, {color: Colors.Red}]}>
            Une erreur est survenue
          </Text>
        </View>
      )}
    </OptionDrawer>
  );
}