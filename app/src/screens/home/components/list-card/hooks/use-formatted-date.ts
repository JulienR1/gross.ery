import { useMemo } from 'react';

export const useFormattedDate = (date: Date) =>
  useMemo(() => {
    const lastUpdate = date ?? new Date();
    const day = lastUpdate.getDate().toString().padStart(2, '0');
    const month = lastUpdate.getMonth().toString().padStart(2, '0');

    return { day, month };
  }, [date]);
