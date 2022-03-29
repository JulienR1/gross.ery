import { Type } from 'class-transformer';
import { IsEnum, IsPort, Matches } from 'class-validator';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsPort()
  @Type(() => String)
  PORT: number;

  @Matches(/^\d+\.\d+\.\d+$/g)
  APP_VERSION: string;
}
