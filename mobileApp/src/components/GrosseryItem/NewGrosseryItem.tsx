import React, {useState} from 'react';
import {
  GestureResponderEvent,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useNotification} from '../../contexts/NotificationContext';
import {doRequest} from '../../services/requests';
import {Colors} from '../../styles/colors';
import {styles} from './styles';

interface IProps {
  listId: string;
  onSave: () => void;
}

export function NewGrosseryItem({listId, onSave}: IProps) {
  const notify = useNotification();
  const [itemName, setItemName] = useState<string>('');

  const preventStopEditing = (event: GestureResponderEvent) =>
    event.stopPropagation();

  const saveItem = async () => {
    try {
      if (itemName) {
        await doRequest(listId).addNewItem(itemName);
      }
    } catch {
      notify('Une erreur est survenue.', 2000);
    } finally {
      setItemName('');
      onSave();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          style={[styles.text, styles.textInput]}
          onSubmitEditing={saveItem}
          placeholder={"Nom de l'item"}
          placeholderTextColor={Colors.BlackTransparent}
          onTouchStart={preventStopEditing}
          onChangeText={text => setItemName(text)}
        />
        <View style={styles.textInputBorder} />
      </View>

      <View style={styles.endControls} onTouchStart={preventStopEditing}>
        <TouchableOpacity onPress={saveItem}>
          <Icon name="save" color={Colors.Main} size={22} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
