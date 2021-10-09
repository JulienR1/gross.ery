import React, {useEffect, useRef, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/core';
import {IListParams} from '../../models/NavigationParams';
import {IItemData, IListData} from '../../models/IListData';
import {doRequest} from '../../services/requests';
import {Loader} from '../../components/Loader';
import {modalStyles, styles} from './styles';
import {Icon} from 'react-native-elements';
import {GrosseryItem, NewGrosseryItem} from '../../components/GrosseryItem';
import {useModal} from '../../contexts/ModalContext';
import {useFocus} from '../../contexts/FocusContext';
import QRCode from 'react-native-qrcode-svg';

interface IProps {
  route: INavigationRoute;
}

interface INavigationRoute {
  params: IListParams;
}

export function GrosseryList({route}: IProps) {
  const listId = route.params.listId;

  const navigation = useNavigation();
  const {subscribe, unsubscribe} = useFocus();
  const {setModal, setEnabled: setModalEnabled, closeModal} = useModal();

  const isMounted = useRef<boolean>(true);
  const [renderQR, setRenderQR] = useState<boolean>(false);
  const [listData, setListData] = useState<IListData | undefined>(undefined);
  const [cannotFindList, setCannotFindList] = useState<boolean>(false);
  const [addingNewItem, setAddingNewItem] = useState<boolean>(false);

  useEffect(() => {
    fetchListData().catch(err => setCannotFindList(true));
    subscribe(stopAddingNewItem);
    return () => {
      isMounted.current = false;
      unsubscribe(stopAddingNewItem);
    };
  }, []);

  const fetchListData = async () => {
    try {
      const newListData = await doRequest(listId).getListData();
      if (isMounted.current) {
        setListData(newListData);
      }
    } catch (ex) {
      throw new Error('Could not find the specified list.');
    }
  };

  const updateItemCheck = async (
    originalItem: IItemData,
    updatedItem: IItemData,
  ) => {
    if (originalItem !== updatedItem) {
      await doRequest(route.params.listId).updateItem(
        originalItem.name,
        updatedItem,
      );
      fetchListData();
    }
  };

  const removeItem = async (item: IItemData) => {
    const itemIndex = listData?.items.indexOf(item);
    const updatedListData: IListData = JSON.parse(JSON.stringify(listData));

    if (updatedListData && itemIndex && itemIndex >= 0) {
      updatedListData.items.splice(itemIndex, 1);
      setListData(updatedListData);
    }
    await doRequest(route.params.listId).removeItem(item.name);
    fetchListData();
  };

  const deleteList = async () => {
    await doRequest(listId)
      .removeList()
      .then(() => {
        navigation.goBack();
      });
  };

  const stopAddingNewItem = () => setAddingNewItem(false);

  return (
    <>
      {!listData && !cannotFindList && <Loader />}

      {cannotFindList && (
        <View style={styles.container}>
          <Text style={styles.title}>Impossible de trouver la liste</Text>
          <Text style={styles.text}>
            Elle a été retirée de vos sauvegardes.
          </Text>
          <TouchableOpacity
            style={styles.cannotFindListButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.cannotFindListButtonText}>Retour au menu</Text>
          </TouchableOpacity>
        </View>
      )}

      {listData && !cannotFindList && (
        <View style={styles.globalContainer}>
          <View style={[styles.container, styles.header]}>
            <View style={styles.titleContainer}>
              <TouchableOpacity onPress={() => setRenderQR(!renderQR)}>
                <Icon name="qr-code" size={28} />
              </TouchableOpacity>
              <Text style={styles.title}>{listData.name}</Text>
            </View>

            {renderQR && (
              <View style={styles.qrContainer}>
                <QRCode value={`gross.ery ${listId}`} size={225} />
                <TouchableOpacity onPress={() => setRenderQR(false)}>
                  <Text style={styles.text}>Retour</Text>
                </TouchableOpacity>
              </View>
            )}

            {!renderQR && (
              <FlatList
                style={styles.itemList}
                data={listData.items}
                keyExtractor={item => item.name}
                renderItem={({item}) => (
                  <GrosseryItem
                    initialItemData={item}
                    onItemUpdate={updatedItem =>
                      updateItemCheck(item, updatedItem)
                    }
                    onDelete={() => removeItem(item)}
                  />
                )}
              />
            )}

            {!renderQR && !addingNewItem && (
              <TouchableOpacity
                onPress={() => setAddingNewItem(true)}
                style={styles.newItemButton}>
                <Icon name="add" size={30} />
                <Text style={styles.newItemButtonText}>Ajouter un item</Text>
              </TouchableOpacity>
            )}

            {!renderQR && addingNewItem && (
              <NewGrosseryItem
                listId={listId}
                onSave={() => {
                  stopAddingNewItem();
                  fetchListData();
                }}
              />
            )}
          </View>

          <View style={[styles.container, styles.footer]}>
            {!renderQR && (
              <TouchableOpacity
                style={styles.cannotFindListButton}
                onPress={() => {
                  const onClose = () => {
                    closeModal();
                  };

                  setModal({
                    onClose,
                    children: (
                      <View style={modalStyles.container}>
                        <View style={modalStyles.container}>
                          <Text style={modalStyles.title}>
                            Suppression d'une liste
                          </Text>
                          <Text style={modalStyles.description}>
                            Confirmer la suppression de '
                            {
                              <Text style={modalStyles.bold}>
                                {listData.name}
                              </Text>
                            }
                            '.
                          </Text>
                        </View>

                        <View style={modalStyles.buttonContainer}>
                          <TouchableOpacity
                            onPress={onClose}
                            style={[
                              modalStyles.button,
                              modalStyles.cancelButton,
                            ]}>
                            <Text style={modalStyles.buttonText}>Annuler</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              onClose();
                              deleteList();
                            }}
                            style={[
                              modalStyles.button,
                              modalStyles.deleteButton,
                            ]}>
                            <Text style={modalStyles.buttonText}>
                              Supprimer
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ),
                  });
                  setModalEnabled(true);
                }}>
                <Text style={styles.cannotFindListButtonText}>
                  Supprimer la liste
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </>
  );
}
