import {RequestMethod} from './RequestMethod';

export interface IRequestContent {
  method: RequestMethod;
  body?: {[key: string]: any};
}
