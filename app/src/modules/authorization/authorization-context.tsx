import { createContext, useContext } from 'react';

interface IAuthorizationContext {
  isAuthorized: boolean;
  updateAuthorization: (isAuthorized: boolean) => Promise<void>;
}

export const AuthorizationContext = createContext<IAuthorizationContext>({
  isAuthorized: false,
  updateAuthorization: async () => {},
});

export const useAuthorization = () => useContext(AuthorizationContext);
