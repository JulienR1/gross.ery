import {Icon} from 'react-native-elements';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {drawerStyles, styles} from './styles';
import {OptionDrawer} from '../../components/OptionDrawer';
import {NewListDrawer} from './NewListDrawer';

enum SubscribeState {
  None,
  Subscribing,
  CreatingNew,
}

interface ListData {
  _id: string;
  items: ItemData[];
}

// TODO: Sync w/ cloudservice models
interface ItemData {
  name: string;
  checked: boolean;
}

function NewList() {
  const [subscribingState, setSubscribingState] = useState<SubscribeState>(
    SubscribeState.None,
  );

  const onDrawerClose = () => {
    setSubscribingState(SubscribeState.None);
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
        <OptionDrawer
          onClose={() => setSubscribingState(SubscribeState.None)}
          onSubmit={() => console.log('submit')}
          submitTitle="S'abonner">
          <Text style={drawerStyles.title}>S'abonner</Text>
        </OptionDrawer>
      )}

      {subscribingState === SubscribeState.CreatingNew && (
        <NewListDrawer onClose={onDrawerClose} />
      )}
    </>
  );
}

export default NewList;
