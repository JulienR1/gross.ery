import React, {useEffect, useState} from 'react';
import {GestureResponderEvent, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {useFocus} from '../../contexts/FocusContext/FocusContext';
import {IItemData} from '../../models/IListData';
import {Colors} from '../../styles/colors';
import {styles} from './styles';

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
  const [itemData, setItemData] = useState<IItemData>(initialItemData);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>(initialItemData.name);

  useEffect(() => {
    subscribe(stopEditing);
    return () => {
      unsubscribe(stopEditing);
    };
  }, []);

  const toggleCheck = () => {
    const newItemData: IItemData = JSON.parse(JSON.stringify(itemData));
    newItemData.checked = !newItemData.checked;
    setItemData(newItemData);
    onItemUpdate(newItemData);
  };

  const preventStopEditing = (event: GestureResponderEvent) =>
    event.stopPropagation();

  const stopEditing = () => {
    setNewName(itemData.name);
    setIsEditing(false);
  };

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

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.checkboxContainer} onPress={toggleCheck}>
        <View style={styles.checkbox}>
          {itemData.checked && (
            <Icon name="check" size={20} color={Colors.Green} />
          )}
        </View>
        {!isEditing && (
          <Text style={[styles.text, itemData.checked && styles.textChecked]}>
            {itemData.name}
          </Text>
        )}
      </TouchableOpacity>

      {isEditing && (
        <TextInput
          style={[styles.text, styles.textInput]}
          onTouchStart={preventStopEditing}
          defaultValue={itemData.name}
          onChangeText={setNewName}
          onSubmitEditing={onSaveUpdates}
        />
      )}

      <View style={styles.endControls} onTouchStart={preventStopEditing}>
        {!isEditing && (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Icon name="edit" color={Colors.Main} size={22} />
          </TouchableOpacity>
        )}
        {isEditing && (
          <>
            <TouchableOpacity onPress={onSaveUpdates}>
              <Icon name="save" color={Colors.Main} size={22} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete}>
              <Icon name="close" color={Colors.Red} size={22} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}
