import {CodeInputAction, CodeInputType} from './codeInputAction';
import {ICodeInputState, initialState} from './codeInputState';

function codeInputReducer(
  state = initialState,
  action: CodeInputAction,
): ICodeInputState {
  switch (action.type) {
    case CodeInputType.SIZE:
      return onSize(state, action.payload);
    case CodeInputType.INSERT_CHARACTER:
      return onInsertCharacter(state, action.payload);
    case CodeInputType.REMOVE:
      return onRemoveCharacter(state);
    case CodeInputType.SELECT_CHARACTER:
      return onSelectCharacter(state, action.payload);
    default:
      return state;
  }
}

function onSize(state: ICodeInputState, payload: number): ICodeInputState {
  return {
    ...state,
    characterCount: payload,
    codeCharacters: Array(payload),
  };
}

function onInsertCharacter(
  state: ICodeInputState,
  payload: string,
): ICodeInputState {
  const currentFocusIndex = state.focusIndex ?? 0;
  const focusIndex = clampFocusIndex(state, currentFocusIndex + 1);
  const codeCharacters = [...state.codeCharacters];
  codeCharacters[currentFocusIndex] = payload;
  return {...state, codeCharacters, focusIndex};
}

function onRemoveCharacter(state: ICodeInputState): ICodeInputState {
  const currentFocusIndex = state.focusIndex ?? 0;
  const focusIndex = clampFocusIndex(state, currentFocusIndex - 1);
  const codeCharacters = [...state.codeCharacters];
  codeCharacters[currentFocusIndex] = undefined;
  return {...state, codeCharacters, focusIndex};
}

function onSelectCharacter(
  state: ICodeInputState,
  payload: number | undefined,
): ICodeInputState {
  const focusIndex = payload ? clampFocusIndex(state, payload) : undefined;
  return {...state, focusIndex};
}

const clampFocusIndex = (
  state: ICodeInputState,
  targetIndex: number,
): number => {
  return Math.max(0, Math.min(state.characterCount - 1, targetIndex));
};

export {codeInputReducer};
