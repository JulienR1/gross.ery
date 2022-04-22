import { Screen } from '~/screens';
import { Action } from '~/types';

export enum NavigationType {
  REGISTER = '[NAVIGATION] REGISTER',
  SELECT = '[NAVIGATION] SELECT',
  CLOSE = '[NAVIGATION] CLOSE',
}

export type NavigationSelectPayload = {
  screen: Screen;
  optionalProps?: Record<string, unknown>;
};

export interface NavigationRegisterAction
  extends Action<NavigationType.REGISTER, Screen> {
  type: NavigationType.REGISTER;
  payload: Screen;
}

export interface NavigationSelectAction
  extends Action<NavigationType.SELECT, NavigationSelectPayload> {
  type: NavigationType.SELECT;
  payload: NavigationSelectPayload;
}

export interface NavigationCloseAction
  extends Action<NavigationType.CLOSE, undefined> {
  type: NavigationType.CLOSE;
}

export function registerScreen(screen: Screen): NavigationRegisterAction {
  return { type: NavigationType.REGISTER, payload: screen };
}

export function selectScreen(
  screen: Screen,
  optionalProps?: Record<string, unknown>,
): NavigationSelectAction {
  return { type: NavigationType.SELECT, payload: { screen, optionalProps } };
}

export function close(): NavigationCloseAction {
  return { type: NavigationType.CLOSE, payload: undefined };
}

export type NavigationAction =
  | NavigationRegisterAction
  | NavigationSelectAction
  | NavigationCloseAction;
