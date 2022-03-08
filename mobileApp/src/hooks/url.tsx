import {useEffect, useState} from 'react';
import {Linking} from 'react-native';

export function useUrl() {
  const [url, setUrl] = useState<string | undefined>(undefined);

  const updateUrl = (url: string | null) => setUrl(url ?? undefined);

  useEffect(() => {
    Linking.getInitialURL().then(url => updateUrl(url));
    const listener = Linking.addEventListener('url', ({url}) =>
      updateUrl(url),
    ) as any;

    return () => listener.remove();
  }, []);

  return url;
}
