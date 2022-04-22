import React, { ReactNode, useEffect, useState } from 'react';

import { getIsAuthorized, setIsAuthorized } from '../storage';
import { AuthorizationContext } from './authorization-context';

interface IProps {
  children: ReactNode | ReactNode[];
}

export const AuthorizationProvider = ({ children }: IProps) => {
  const [isAuthorized, setAuthorized] = useState(false);

  useEffect(() => {
    reflectStoredAuthorization();
  }, []);

  const reflectStoredAuthorization = () =>
    getIsAuthorized().then(setAuthorized);

  const updateAuthorization = async (newValue: boolean) => {
    await setIsAuthorized(newValue);
    reflectStoredAuthorization();
  };

  return (
    <AuthorizationContext.Provider
      value={{ isAuthorized, updateAuthorization }}>
      {children}
    </AuthorizationContext.Provider>
  );
};
