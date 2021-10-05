import React, {useEffect, useRef, useState} from 'react';
import {Animated, GestureResponderEvent, Text, View} from 'react-native';
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

  const [borderSlideAnimationValue, setBorderSlideAnimationValue] =
    useState<string>('0%');

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
            ]}></View>
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
