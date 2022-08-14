import { Screen } from '~/screens';
import { Action } from '~/types';

export enum NavigationType {
  UPDATE_ROOT = '[NAVIGATION] UPDATE ROOT',
  REGISTER = '[NAVIGATION] REGISTER',
  UNREGISTER = '[NAVIGATION] UNREGISTER',
  SELECT = '[NAVIGATION] SELECT',
  BEGIN_CLOSE = '[NAVIGATION] BEGIN CLOSE',
  COMPLETE_CLOSE = '[NAVIGATION] COMPLETE CLOSE',
  REPLACE = '[NAVIGATION] REPLACE SCREEN',
}

export type NavigationSelectPayload = {
  screen: Screen;
  optionalProps?: Record<string, unknown>;
};

export interface NavigationUpdateRootScreen
  extends Action<NavigationType.UPDATE_ROOT, Screen> {
  type: NavigationType.UPDATE_ROOT;
  payload: Screen;
}

export interface NavigationRegisterAction
  extends Action<NavigationType.REGISTER, Screen> {
  type: NavigationType.REGISTER;
  payload: Screen;
}

export interface NavigationUnregisterAction
  extends Action<NavigationType.UNREGISTER, Screen> {
  type: NavigationType.UNREGISTER;
  payload: Screen;
}

export interface NavigationSelectAction
  extends Action<NavigationType.SELECT, NavigationSelectPayload> {
  type: NavigationType.SELECT;
  payload: NavigationSelectPayload;
}

export interface NavigationBeginCloseAction
  extends Action<NavigationType.BEGIN_CLOSE, undefined> {
  type: NavigationType.BEGIN_CLOSE;
}

export interface NavigationCompleteCloseAction
  extends Action<NavigationType.COMPLETE_CLOSE, undefined> {
  type: NavigationType.COMPLETE_CLOSE;
}

export interface NavigationReplaceAction
  extends Action<NavigationType.REPLACE, NavigationSelectPayload> {
  type: NavigationType.REPLACE;
  payload: NavigationSelectPayload;
}

export function updateRootScreen(screen: Screen): NavigationUpdateRootScreen {
  return { type: NavigationType.UPDATE_ROOT, payload: screen };
}

export function registerScreen(screen: Screen): NavigationRegisterAction {
  return { type: NavigationType.REGISTER, payload: screen };
}

export function unregisterScreen(screen: Screen): NavigationUnregisterAction {
  return { type: NavigationType.UNREGISTER, payload: screen };
}

export function selectScreen(
  screen: Screen,
  optionalProps?: Record<string, unknown>,
): NavigationSelectAction {
  return { type: NavigationType.SELECT, payload: { screen, optionalProps } };
}

export function beginClose(): NavigationBeginCloseAction {
  return { type: NavigationType.BEGIN_CLOSE, payload: undefined };
}

export function completeClose(): NavigationCompleteCloseAction {
  return { type: NavigationType.COMPLETE_CLOSE, payload: undefined };
}

export function replace(
  screen: Screen,
  optionalProps?: Record<string, unknown>,
): NavigationReplaceAction {
  return { type: NavigationType.REPLACE, payload: { screen, optionalProps } };
}

export type NavigationAction =
  | NavigationUpdateRootScreen
  | NavigationRegisterAction
  | NavigationUnregisterAction
  | NavigationSelectAction
  | NavigationBeginCloseAction
  | NavigationCompleteCloseAction
  | NavigationReplaceAction;
