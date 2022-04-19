import {api} from './api';
import {AppInfoEntity} from 'shared';

const getVersion = async () => {
  const response = await api<AppInfoEntity>('info');
  if (!response) {
    throw Error('Could not resolve version.');
  }
  return response.app;
};

export {getVersion};
