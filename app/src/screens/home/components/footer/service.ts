import { AppInfoEntity } from 'shared';

import { ApiFunction } from '~/modules/api/types';

export const getCurrentAppVersion = () => {
  const { version } = require('./../../../../../package.json');
  return version as string;
};

export const getLatestAppVersion = async (
  api: ApiFunction,
): Promise<string> => {
  const response = await api<AppInfoEntity>('info');
  return response?.app ?? '0.0.0';
};

export const canAppBeUpdated = async (api: ApiFunction) => {
  const currentVersion = getCurrentAppVersion();
  const latestVersion = await getLatestAppVersion(api);

  const versionHasChanged =
    latestVersion.localeCompare(currentVersion, undefined, {
      numeric: true,
      sensitivity: 'base',
    }) > 0;

  return versionHasChanged;
};
