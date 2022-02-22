import {useEffect} from 'react';
import {Linking, AppState} from 'react-native';
import {NavigationContainerRefWithCurrent} from '@react-navigation/native';
import {IListParams} from '../../models/NavigationParams';
import {Routes} from '../../navigation/routes';

interface IProps {
  navigationRef: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>;
}

export function useAutomaticSubscriber({navigationRef}: IProps) {
  const onAppStateChange = async () => {
    if (AppState.currentState === 'active') {
      const listId = await getListIdFromUrl();
      if (listId) {
        navigateToList(listId);
      }
    }
  };

  const getListIdFromUrl = async () => {
    const url = await Linking.getInitialURL();
    if (url) {
      const potentialListId = url.split('?').reverse()?.[0];
      if (potentialListId.length === 24) {
        return potentialListId;
      }
    }
    return undefined;
  };

  const navigateToList = (listId: string) => {
    const navigationParams: IListParams = {listId};

    navigationRef.reset({index: 0, routes: [{name: Routes.Home}]});
    navigationRef.navigate(Routes.NewList, navigationParams);
  };

  useEffect(() => {
    if (!navigationRef?.isReady()) {
      return;
    }

    onAppStateChange();
    AppState.addEventListener('change', onAppStateChange);
    return () => AppState.removeEventListener('change', onAppStateChange);
  }, [onAppStateChange, navigationRef]);
}