import config from './../config';

const getVersion = async (): Promise<string> => {
  const response = await fetch(`${config.SERVER_URL}/version`);
  if (response.ok) {
    const {appVersion} = await response.json();
    return appVersion;
  }
  throw Error('Could not resolve version.');
};

export {getVersion};
