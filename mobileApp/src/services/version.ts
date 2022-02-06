import {SERVER_ENDPOINT} from '@env';

const getVersion = async (): Promise<{
  version: string;
  downloadLink: string;
}> => {
  const response = await fetch(`${SERVER_ENDPOINT}/version`);
  if (response.ok) {
    const {app, downloadLink} = await response.json();
    return {
      version: app,
      downloadLink: downloadLink,
    };
  }
  throw Error('Could not resolve version.');
};

export {getVersion};
