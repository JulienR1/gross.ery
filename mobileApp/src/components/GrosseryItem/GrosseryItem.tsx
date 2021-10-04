import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
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
  const [itemData, setItemData] = useState<IItemData>(initialItemData);

  const toggleCheck = () => {
    const newItemData = JSON.parse(JSON.stringify(itemData));
    newItemData.checked = !newItemData.checked;
    setItemData(newItemData);
    onItemUpdate(newItemData);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.checkbox} onPress={toggleCheck}>
        {itemData.checked && (
          <Icon name="check" size={20} color={Colors.Green} />
        )}
      </TouchableOpacity>
      <Text style={[styles.text, itemData.checked && styles.textChecked]}>
        {itemData.name}
      </Text>

      <View style={styles.endControls}>
        <TouchableOpacity>
          <Icon name="edit" color={Colors.Main} size={22} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Icon name="close" color={Colors.Red} size={22} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
