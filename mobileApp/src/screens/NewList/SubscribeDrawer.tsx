import React, {useEffect, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {OptionDrawer} from '../../components/OptionDrawer';
import {IListData} from '../../models/IListData';
import {fetchListData, recordList} from './service';
import {drawerStyles} from './styles';

interface IProps {
  onClose: (goToMenu?: boolean) => void;
}

enum ListDataSearchState {
  Found,
  Error,
  None,
}

export function SubscribeDrawer({onClose}: IProps) {
  const [enteredId, setEnteredId] = useState<string>('');

  const [listDataSearchState, setListDataSearchState] =
    useState<ListDataSearchState>(ListDataSearchState.None);
  const [foundListData, setFoundListData] = useState<IListData | undefined>(
    undefined,
  );

  useEffect(() => {
    if (enteredId.length === 24) {
      fetchListData(enteredId)
        .then(listData => {
          setFoundListData(listData);
          setListDataSearchState(ListDataSearchState.Found);
        })
        .catch(() => {
          setFoundListData(undefined);
          setListDataSearchState(ListDataSearchState.Error);
        });
    }
  }, [enteredId]);

  return (
    <OptionDrawer
      onClose={() => onClose()}
      onSubmit={() => recordList(enteredId)}
      submitTitle="S'abonner"
      submitIsValid={Boolean(foundListData)}>
      <Text style={drawerStyles.title}>S'abonner</Text>

      <Text style={drawerStyles.message}>Identifiant de la liste</Text>
      <View style={drawerStyles.flexContainer}>
        <TextInput
          style={[drawerStyles.inputField, drawerStyles.sharedInputField]}
          onChangeText={text => setEnteredId(text)}
        />
        <TouchableOpacity
          style={[
            drawerStyles.iconButton,
            listDataSearchState === ListDataSearchState.Found &&
              drawerStyles.inputSuccess,
            listDataSearchState === ListDataSearchState.Error &&
              drawerStyles.inputError,
          ]}>
          {listDataSearchState === ListDataSearchState.None && (
            <Icon name="qr-code" />
          )}
          {listDataSearchState === ListDataSearchState.Found && (
            <>
              <Icon name="done" />
              <TouchableOpacity onPress={() => onClose(true)}>
                <Text style={drawerStyles.message}>Retour au menu</Text>
              </TouchableOpacity>
            </>
          )}
          {listDataSearchState === ListDataSearchState.Error && (
            <Icon name="close" />
          )}
        </TouchableOpacity>
      </View>

      {listDataSearchState !== ListDataSearchState.None && (
        <View style={drawerStyles.detailsContainer}>
          {listDataSearchState === ListDataSearchState.Found && foundListData && (
            <>
              <Text style={drawerStyles.detailsHeader}>
                Informations générales
              </Text>
              <Text style={drawerStyles.detailsText}>{`Appelée '${
                foundListData.name || 'undefined'
              }'`}</Text>
              <Text
                style={
                  drawerStyles.detailsText
                }>{`${foundListData.items.length} items`}</Text>
            </>
          )}
          {(listDataSearchState === ListDataSearchState.Error ||
            !foundListData) && (
            <Text style={drawerStyles.detailsHeader}>
              Aucune liste trouvée pour la valeur saisie
            </Text>
          )}
        </View>
      )}
    </OptionDrawer>
  );
}
