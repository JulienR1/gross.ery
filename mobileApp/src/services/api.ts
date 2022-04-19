import config from '../config';

export const api = async <T>(
  route: string,
  init?: RequestInit,
): Promise<T | undefined> => {
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');

  const response = await fetch(`${config.SERVER_URL}/v1/${route}`, {
    ...init,
    headers,
  });
  if (!response.ok) {
    return undefined;
  }
  return response.json();
};
