import { ILocalList } from '~/modules/storage';

type BaseLocalLists<L extends boolean> = {
  isLoading: L;
};

interface LoadedLocalLists extends BaseLocalLists<false> {
  localLists: ILocalList[];
}

type LoadingLocalLists = BaseLocalLists<true>;

export type LocalListsPayload = LoadedLocalLists | LoadingLocalLists;
