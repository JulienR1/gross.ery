import {Icon} from 'react-native-elements';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {NewListDrawer} from './NewListDrawer';
import {SubscribeDrawer} from './SubscribeDrawer';
import {useNavigation} from '@react-navigation/core';

enum SubscribeState {
  None,
  Subscribing,
  CreatingNew,
}

// TODO: Sync w/ cloudservice models
interface ItemData {
  name: string;
  checked: boolean;
}

function NewList() {
  const navigation = useNavigation();
  const [subscribingState, setSubscribingState] = useState<SubscribeState>(
    SubscribeState.None,
  );
  const [requestToMenu, setRequestToMenu] = useState<boolean>(false);

  useEffect(() => {
    if (requestToMenu) {
      navigation.goBack();
    }
  }, [requestToMenu]);

  const onDrawerClose = (goToMenu?: boolean) => {
    setSubscribingState(SubscribeState.None);
    if (goToMenu) {
      setRequestToMenu(true);
    }
  };

  return (
    <>
      <View style={styles.subscribeMenu}>
        <Text style={styles.title}>Nouvelle liste</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setSubscribingState(SubscribeState.Subscribing)}>
          <Icon name="notifications" />
          <Text style={styles.buttonText}>S'abonner</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setSubscribingState(SubscribeState.CreatingNew)}>
          <Icon name="edit" />
          <Text style={styles.buttonText}>Nouvelle liste</Text>
        </TouchableOpacity>
      </View>

      {subscribingState === SubscribeState.Subscribing && (
        <SubscribeDrawer onClose={onDrawerClose} />
      )}

      {subscribingState === SubscribeState.CreatingNew && (
        <NewListDrawer onClose={onDrawerClose} />
      )}
    </>
  );
}

export default NewList;
