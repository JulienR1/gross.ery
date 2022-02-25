import {SERVER_ENDPOINT} from '@env';

const getVersion = async (): Promise<string> => {
  const response = await fetch(`${SERVER_ENDPOINT}/version`);
  if (response.ok) {
    const {appVersion} = await response.json();
    return appVersion;
  }
  throw Error('Could not resolve version.');
};

export {getVersion};
