import config from '../../config';

const validateCode = async (code: string): Promise<boolean> => {
  try {
    const response = await fetch(`${config.SERVER_URL}/code?${code}`);
    if (response.ok) {
      const {valid} = await response.json();
      return valid;
    }
  } catch {}
  return false;
};

export {validateCode};
