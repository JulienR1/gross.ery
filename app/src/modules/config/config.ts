import { config as dev } from './env.dev';
import { config as prod } from './env.prod';

export interface VariableConfig {
  IS_PROD: boolean;
  SERVER_URL: string;
  API_VERSION: number;
}

export interface Config extends VariableConfig {
  QR_PREFIX: string;
}

const env = process.env.NODE_ENV;
const variableConfig = env === 'production' ? prod : dev;

export const config: Config = {
  ...variableConfig,
  QR_PREFIX: 'gross.ery',
};
