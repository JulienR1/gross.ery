import {CodeValidationEntity} from 'shared';
import {api} from '../../services/api';

const validateCode = async (code: string) => {
  try {
    const response = await api<CodeValidationEntity>(`code/${code}`);
    return response?.isValid ?? false;
  } catch {
    return false;
  }
};

export {validateCode};
