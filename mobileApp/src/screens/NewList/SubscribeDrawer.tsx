import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {ListEntity} from 'shared';
import {OptionDrawer} from '../../components/OptionDrawer';
import {QrScanner} from '../../components/QrScanner';
import {Colors} from '../../styles/colors';
import {fetchListData, recordList} from './service';
import {drawerStyles} from './styles';

interface IProps {
  initialListId: string | undefined;
  onClose: (goToMenu?: boolean) => void;
}

enum ListDataSearchState {
  Found,
  Error,
  None,
}

export function SubscribeDrawer({initialListId, onClose}: IProps) {
  const navigation = useNavigation();

  const [isMounted, setIsMounted] = useState<boolean>(true);
  const [enteredId, setEnteredId] = useState<string>(initialListId ?? '');
  const [scanningCode, setScanningCode] = useState<boolean>(true);

  const [listDataSearchState, setListDataSearchState] =
    useState<ListDataSearchState>(ListDataSearchState.None);
  const [foundListData, setFoundListData] = useState<ListEntity | undefined>(
    undefined,
  );

  useEffect(() => {
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    const stopQrBeforeRemove = (event: any) => {
      event.preventDefault();
      scanningCode
        ? setScanningCode(false)
        : navigation.dispatch(event.data.action);
    };
    navigation.addListener('beforeRemove', stopQrBeforeRemove);

    return () => {
      navigation.removeListener('beforeRemove', stopQrBeforeRemove);
    };
  }, [navigation, scanningCode]);

  useEffect(() => {
    if (enteredId.length === 24) {
      fetchListData(enteredId)
        .then(listData => {
          if (isMounted) {
            setFoundListData(listData);
            setListDataSearchState(ListDataSearchState.Found);
          }
        })
        .catch(() => {
          if (isMounted) {
            setFoundListData(undefined);
            setListDataSearchState(ListDataSearchState.Error);
          }
        });
    }
  }, [enteredId]);

  return (
    <>
      {scanningCode && (
        <QrScanner
          onListIdFound={listId => {
            setScanningCode(false);
            setEnteredId(listId);
          }}
          onListNotFound={() => setScanningCode(false)}
        />
      )}
      {!scanningCode && (
        <OptionDrawer
          onClose={() => onClose()}
          onSubmit={() => {
            recordList(enteredId);
            onClose(true);
          }}
          submitTitle="Ajouter"
          submitIsValid={Boolean(foundListData)}>
          <Text style={drawerStyles.title}>Scanner un code</Text>

          <Text style={drawerStyles.message}>Identifiant de la liste</Text>
          <View style={drawerStyles.flexContainer}>
            <TextInput
              style={[drawerStyles.inputField, drawerStyles.sharedInputField]}
              value={enteredId}
              onChangeText={text => setEnteredId(text)}
              placeholder={'Généré automatiquement'}
              placeholderTextColor={Colors.BlackTransparent}
            />
            <TouchableOpacity
              onPress={() => setScanningCode(true)}
              disabled={listDataSearchState !== ListDataSearchState.None}
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
                <Icon name="done" />
              )}
              {listDataSearchState === ListDataSearchState.Error && (
                <Icon name="close" />
              )}
            </TouchableOpacity>
          </View>

          {listDataSearchState !== ListDataSearchState.None && (
            <View style={drawerStyles.detailsContainer}>
              {listDataSearchState === ListDataSearchState.Found &&
                foundListData && (
                  <>
                    <Text style={drawerStyles.detailsHeader}>
                      Informations générales
                    </Text>
                    <Text style={drawerStyles.detailsText}>{`Appelée '${
                      foundListData.name || 'undefined'
                    }'`}</Text>
                    <Text style={drawerStyles.detailsText}>{`${
                      foundListData.items.length
                    } item${foundListData.items.length > 1 ? 's' : ''}`}</Text>
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
      )}
    </>
  );
}
