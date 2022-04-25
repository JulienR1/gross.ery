import { api } from './api';

type BaseApiContextPayload<C extends boolean> = {
  connected: C;
};

interface ConnectedApiContextPayload extends BaseApiContextPayload<true> {
  api: ApiFunction;
}

type DisconnectedApiContextPayload = BaseApiContextPayload<false>;

export type ApiContextPayload =
  | ConnectedApiContextPayload
  | DisconnectedApiContextPayload;

export type ApiFunction = typeof api;
