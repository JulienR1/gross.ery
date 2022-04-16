import {Icon} from 'react-native-elements';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {NewListDrawer} from './NewListDrawer';
import {SubscribeDrawer} from './SubscribeDrawer';
import {useNavigation} from '@react-navigation/core';
import {useAutomaticSubscription} from '../../contexts/SubscriptionContext';
import {GoBack} from '../../components/GoBack';

enum SubscribeState {
  None,
  Subscribing,
  CreatingNew,
}

function NewList() {
  const navigation = useNavigation();
  const [subscribingState, setSubscribingState] = useState<SubscribeState>(
    SubscribeState.None,
  );
  const [listIdToSubscribe, onListProcessed] = useAutomaticSubscription();
  const [requestToMenu, setRequestToMenu] = useState<boolean>(false);

  useEffect(() => {
    setSubscribingState(
      listIdToSubscribe ? SubscribeState.Subscribing : SubscribeState.None,
    );
  }, [listIdToSubscribe]);

  useEffect(() => {
    if (requestToMenu) {
      navigation.goBack();
    }
  }, [requestToMenu, navigation]);

  const onDrawerClose = (goToMenu?: boolean) => {
    if (subscribingState === SubscribeState.Subscribing) {
      onListProcessed();
    }

    setSubscribingState(SubscribeState.None);
    if (goToMenu) {
      setRequestToMenu(true);
    }
  };

  return (
    <>
      <GoBack />
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
        <SubscribeDrawer
          initialListId={listIdToSubscribe}
          onClose={onDrawerClose}
        />
      )}

      {subscribingState === SubscribeState.CreatingNew && (
        <NewListDrawer onClose={onDrawerClose} />
      )}
    </>
  );
}

export default NewList;
