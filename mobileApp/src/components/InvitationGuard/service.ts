import {SERVER_ENDPOINT} from '@env';

const validateCode = async (code: string): Promise<boolean> => {
  try {
    const response = await fetch(`${SERVER_ENDPOINT}/code?${code}`);
    if (response.ok) {
      const {valid} = await response.json();
      return valid;
    }
  } catch {}
  return false;
};

export {validateCode};
