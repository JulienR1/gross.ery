import { CodeInputAction, CodeInputType } from './code-input-action';
import { ICodeInputState, initialState } from './code-input-state';

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
    case CodeInputType.CLEAR:
      return onClear(state);
    default:
      return state;
  }
}

function onSize(
  state: ICodeInputState,
  characterCount: number,
): ICodeInputState {
  return { ...state, characterCount, codeCharacters: Array(characterCount) };
}

function onInsertCharacter(
  state: ICodeInputState,
  newCharacter: string,
): ICodeInputState {
  const currentFocusIndex = state.focusIndex ?? 0;
  const focusIndex = clampFocusIndex(state, currentFocusIndex + 1);
  const codeCharacters = [...state.codeCharacters];
  codeCharacters[currentFocusIndex] = newCharacter;
  return { ...state, codeCharacters, focusIndex };
}

function onRemoveCharacter(state: ICodeInputState): ICodeInputState {
  const currentFocusIndex = state.focusIndex ?? 0;
  const focusIndex = clampFocusIndex(state, currentFocusIndex - 1);
  const codeCharacters = [...state.codeCharacters];
  codeCharacters[currentFocusIndex] = undefined;
  return { ...state, codeCharacters, focusIndex };
}

function onSelectCharacter(
  state: ICodeInputState,
  index: number | undefined,
): ICodeInputState {
  const focusIndex =
    index !== undefined ? clampFocusIndex(state, index) : undefined;
  return { ...state, focusIndex };
}

function onClear(state: ICodeInputState): ICodeInputState {
  return { ...state, codeCharacters: Array(state.characterCount) };
}

const clampFocusIndex = (
  state: ICodeInputState,
  targetIndex: number,
): number => {
  return Math.max(0, Math.min(state.characterCount - 1, targetIndex));
};

export { codeInputReducer };
