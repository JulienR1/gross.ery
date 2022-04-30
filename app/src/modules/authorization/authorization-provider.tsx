import React, { ReactNode, useEffect, useState } from 'react';

import { Loader } from '~/components';

import { getIsAuthorized, setIsAuthorized } from '../storage';
import { AuthorizationContext } from './authorization-context';

interface IProps {
  children: ReactNode | ReactNode[];
}

export const AuthorizationProvider = ({ children }: IProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setAuthorized] = useState(false);

  useEffect(() => {
    reflectStoredAuthorization().then(() => setIsLoading(false));
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
      {isLoading && <Loader />}
      {!isLoading && children}
    </AuthorizationContext.Provider>
  );
};
