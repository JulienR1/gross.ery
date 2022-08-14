import { useEffect, useMemo, useRef, useState } from 'react';

export const useIsDirty = <T extends Record<string, unknown>>(
  comparisonValue: T,
) => {
  const isFirstRender = useRef(true);
  const [initialValue, setInitialValue] = useState<T | undefined>(undefined);

  useEffect(() => {
    if (isFirstRender.current) {
      setInitialValue(comparisonValue);
      isFirstRender.current = false;
    }
  }, [comparisonValue]);

  const isDirty = useMemo(() => {
    if (!initialValue || !comparisonValue) {
      return false;
    }

    const initialKeys = Object.keys(initialValue);
    const currentKeys = Object.keys(comparisonValue);

    if (initialKeys.length !== currentKeys.length) {
      return true;
    }

    const sameKeys = initialKeys.every(initialKey =>
      currentKeys.find(currentKey => initialKey === currentKey),
    );
    if (!sameKeys) {
      return true;
    }

    return initialKeys.some(key => initialValue[key] !== comparisonValue[key]);
  }, [initialValue, comparisonValue]);

  return isDirty;
};
