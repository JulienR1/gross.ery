import {Action} from '../../models/Action';

export enum CodeInputType {
  SIZE = '[CODE_INPUT] SIZE',
  INSERT_CHARACTER = '[CODE_INPUT] INSERT',
  REMOVE = '[CODE_INPUT] REMOVE',
  SELECT_CHARACTER = '[CODE_INPUT] SELECT',
}

export interface CodeInputSizeAction extends Action<CodeInputType, number> {
  type: CodeInputType.SIZE;
  payload: number;
}

export interface CodeInputInsertAction extends Action<CodeInputType, string> {
  type: CodeInputType.INSERT_CHARACTER;
  payload: string;
}

export interface CodeInputRemoveAction
  extends Action<CodeInputType, undefined> {
  type: CodeInputType.REMOVE;
}

export interface CodeInputSelectAction
  extends Action<CodeInputType, number | undefined> {
  type: CodeInputType.SELECT_CHARACTER;
  payload: number | undefined;
}

export function setCodeSize(size: number): CodeInputSizeAction {
  return {type: CodeInputType.SIZE, payload: size};
}

export function insertCodeCharacter(character: string): CodeInputInsertAction {
  return {
    type: CodeInputType.INSERT_CHARACTER,
    payload: character?.[0],
  };
}

export function removeCodeCharacter(): CodeInputRemoveAction {
  return {type: CodeInputType.REMOVE};
}

export function selectCodeCharacter(
  codeIndex: number | undefined,
): CodeInputSelectAction {
  return {type: CodeInputType.SELECT_CHARACTER, payload: codeIndex};
}

export type CodeInputAction =
  | CodeInputSizeAction
  | CodeInputInsertAction
  | CodeInputRemoveAction
  | CodeInputSelectAction;
