import { ListEntity } from 'shared';

export interface ILocalList extends ListEntity {
  lastUpdate: Date;
}

export type Subscriber = (lists: ILocalList[]) => void;
