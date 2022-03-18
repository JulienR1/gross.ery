import {useEffect, useState} from 'react';
import {Linking} from 'react-native';

const CUSTOM_SCHEME = 'grossery://';

export function useUrl() {
  const [urlObj, setUrlObj] = useState<{url: string | undefined}>({
    url: undefined,
  });

  const parseUrl = (newUrl: string | null): string | undefined => {
    const fromSchemeUrlStart = `${CUSTOM_SCHEME}?target_url=`;
    if (newUrl?.startsWith(fromSchemeUrlStart)) {
      const parsedRegularUrl = newUrl.replace(fromSchemeUrlStart, '');
      return decodeURIComponent(parsedRegularUrl);
    }
    return newUrl ?? undefined;
  };

  useEffect(() => {
    const listener = Linking.addEventListener('url', ({url}) => {
      const parsedUrl = parseUrl(url);
      setUrlObj({url: parsedUrl});
    }) as any;

    return () => listener.remove();
  }, []);

  return urlObj;
}
