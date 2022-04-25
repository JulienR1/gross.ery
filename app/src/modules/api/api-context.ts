import { createContext, useContext } from 'react';

import { ApiContextPayload } from './types';

const ApiContext = createContext<ApiContextPayload>({ connected: false });

const useApi = () => useContext(ApiContext);

export { ApiContext, useApi };
