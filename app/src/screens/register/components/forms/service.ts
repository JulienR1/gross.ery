import { CreateListDto, CreateListEntity } from 'shared/dist';

import { ApiFunction } from '~/modules/api/types';
import { addStoredList } from '~/modules/storage';

export const createList = async (api: ApiFunction, name: string) => {
  const body: CreateListDto = { name };
  const response = await api<CreateListEntity>('list', {
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (response) {
    await addStoredList(response.id, name);
    return response.id;
  }

  return undefined;
};
