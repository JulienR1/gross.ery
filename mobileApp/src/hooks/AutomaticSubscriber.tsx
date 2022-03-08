import {useEffect} from 'react';
import {NavigationContainerRefWithCurrent} from '@react-navigation/native';
import {IListParams} from '../models/NavigationParams';
import {Routes} from '../navigation/routes';
import {useUrl} from './url';

interface IProps {
  navigationRef: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>;
}

export function useAutomaticSubscriber({navigationRef}: IProps) {
  const url = useUrl();

  const getListIdFromUrl = async () => {
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

    getListIdFromUrl().then(listId => {
      if (listId) {
        navigateToList(listId);
      }
    });
  }, [url, navigationRef]);
}
