import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  TextInput,
  Animated,
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useFocus} from '../../contexts/FocusContext';
import {useModal} from '../../contexts/ModalContext';
import {IItemData} from '../../models/IListData';
import {Colors} from '../../styles/colors';
import {modalStyles, styles} from './styles';

interface IProps {
  initialItemData: IItemData;
  onItemUpdate: (item: IItemData) => void;
  onDelete: () => void;
}

export function GrosseryItem({
  initialItemData,
  onItemUpdate,
  onDelete,
}: IProps) {
  const {subscribe, unsubscribe} = useFocus();
  const {setModal, setEnabled: setModalEnabled, closeModal} = useModal();
  const isMounted = useRef<boolean>(true);

  const [itemData, setItemData] = useState<IItemData>(initialItemData);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>(initialItemData.name);

  const [borderSlideAnimationValue, setBorderSlideAnimationValue] =
    useState<string>('0%');

  const stopEditing = useCallback(() => {
    if (isMounted.current) {
      setNewName(itemData.name);
      setIsEditing(false);
    }
  }, [setNewName, setIsEditing, itemData]);

  useEffect(() => {
    subscribe(stopEditing);
    return () => {
      isMounted.current = false;
      unsubscribe(stopEditing);
    };
  }, [stopEditing, subscribe, unsubscribe]);

  const toggleCheck = () => {
    const newItemData: IItemData = JSON.parse(JSON.stringify(itemData));
    newItemData.checked = !newItemData.checked;
    setItemData(newItemData);
    onItemUpdate(newItemData);
  };

  const preventStopEditing = (event: GestureResponderEvent) =>
    event.stopPropagation();

  const onSaveUpdates = () => {
    setIsEditing(false);

    if (newName) {
      const newItemData: IItemData = JSON.parse(JSON.stringify(itemData));
      newItemData.name = newName;
      setNewName(newName);
      setItemData(newItemData);
      onItemUpdate(newItemData);
    } else {
      setNewName(itemData.name);
    }
  };

  const animateEditBorder = () => {
    setBorderSlideAnimationValue('0%');

    const percent = new Animated.Value(0);
    Animated.timing(percent, {
      toValue: 1,
      useNativeDriver: true,
      duration: 100,
    }).start();

    percent.addListener(({value}) =>
      setBorderSlideAnimationValue(`${value * 100}%`),
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.checkboxContainer, !isEditing && styles.container]}
        onPress={toggleCheck}>
        <View style={[styles.checkbox, itemData.checked && styles.checked]}>
          {itemData.checked && (
            <Icon name="check" size={20} color={Colors.Green} />
          )}
        </View>
        {!isEditing && (
          <Text
            numberOfLines={1}
            style={[
              styles.text,
              itemData.checked && [styles.textChecked, styles.checked],
            ]}>
            {itemData.name}
          </Text>
        )}
      </TouchableOpacity>

      {isEditing && (
        <View style={styles.textInputContainer}>
          <TextInput
            style={[styles.text, styles.textInput]}
            onTouchStart={preventStopEditing}
            defaultValue={itemData.name}
            onChangeText={setNewName}
            onSubmitEditing={onSaveUpdates}
          />
          <View
            style={[
              styles.textInputBorder,
              {maxWidth: borderSlideAnimationValue},
            ]}
          />
        </View>
      )}

      <View style={styles.endControls} onTouchStart={preventStopEditing}>
        {!isEditing && (
          <TouchableOpacity
            onPress={() => {
              animateEditBorder();
              setIsEditing(true);
            }}>
            <Icon name="edit" color={Colors.Main} size={22} />
          </TouchableOpacity>
        )}
        {isEditing && (
          <>
            <TouchableOpacity onPress={onSaveUpdates}>
              <Icon
                name="save"
                color={Colors.Main}
                style={styles.icon}
                size={26}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const onClose = () => {
                  stopEditing();
                  closeModal();
                };

                setModal({
                  onClose,
                  children: (
                    <View style={modalStyles.container}>
                      <View style={modalStyles.container}>
                        <Text style={modalStyles.title}>Suppression</Text>
                        <Text style={modalStyles.description}>
                          Voulez-vous vraiment supprimer '
                          {
                            <Text style={modalStyles.bold}>
                              {itemData.name}
                            </Text>
                          }
                          ' ?
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
                            onDelete();
                            onClose();
                          }}
                          style={[
                            modalStyles.button,
                            modalStyles.deleteButton,
                          ]}>
                          <Text style={modalStyles.buttonText}>Supprimer</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ),
                });
                setModalEnabled(true);
              }}>
              <Icon
                name="close"
                color={Colors.Red}
                style={styles.icon}
                size={26}
              />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}
