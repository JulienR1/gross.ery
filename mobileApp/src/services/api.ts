import config from '../config';

export const api = async <T>(
  route: string,
  init?: RequestInit,
): Promise<T | undefined> => {
  const response = await fetch(`${config.SERVER_URL}/v1/${route}`, init);
  if (!response.ok) {
    return undefined;
  }
  return response.json();
};
