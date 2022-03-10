import {useEffect, useState} from 'react';
import {Linking} from 'react-native';

export function useUrl() {
  const CUSTOM_SCHEME = 'grossery://';
  const [url, setUrl] = useState<string | undefined>(undefined);

  const updateUrl = (url: string | null) => {
    const fromSchemeUrlStart = `${CUSTOM_SCHEME}?target_url=`;
    if (url?.startsWith(fromSchemeUrlStart)) {
      const parsedRegularUrl = url.replace(fromSchemeUrlStart, '');
      const regularUrl = decodeURIComponent(parsedRegularUrl);
      setUrl(regularUrl);
    } else {
      setUrl(url ?? undefined);
    }
  };

  useEffect(() => {
    Linking.getInitialURL().then(url => updateUrl(url));
    const listener = Linking.addEventListener('url', ({url}) =>
      updateUrl(url),
    ) as any;

    return () => listener.remove();
  }, []);

  useEffect(() => {
    console.log(url);
  }, [url]);

  return url;
}
