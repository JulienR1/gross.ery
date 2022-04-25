import { config } from '../config';

export const api = async <T>(
  route: string,
  init?: RequestInit,
): Promise<T | undefined> => {
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');

  const uri = `${config.SERVER_URL}/v${config.API_VERSION}/${route}`;
  const params: RequestInit = { ...init, headers };

  const response = await fetch(uri, params);
  if (!response.ok) {
    return undefined;
  }
  return response.json();
};
