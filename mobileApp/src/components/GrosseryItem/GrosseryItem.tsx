import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
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

  useEffect(() => {
    subscribe(stopEditing);
    return () => {
      unsubscribe(stopEditing);
    };
  }, []);

  const toggleCheck = () => {
    const newItemData = JSON.parse(JSON.stringify(itemData));
    newItemData.checked = !newItemData.checked;
    setItemData(newItemData);
    onItemUpdate(newItemData);
  };

  const stopEditing = () => setIsEditing(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.checkboxContainer} onPress={toggleCheck}>
        <View style={styles.checkbox}>
          {itemData.checked && (
            <Icon name="check" size={20} color={Colors.Green} />
          )}
        </View>
        <Text style={[styles.text, itemData.checked && styles.textChecked]}>
          {itemData.name}
        </Text>
      </TouchableOpacity>

      <View
        style={styles.endControls}
        onTouchStart={event => event.stopPropagation()}>
        {!isEditing && (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Icon name="edit" color={Colors.Main} size={22} />
          </TouchableOpacity>
        )}
        {isEditing && (
          <TouchableOpacity onPress={onDelete}>
            <Icon name="close" color={Colors.Red} size={22} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
