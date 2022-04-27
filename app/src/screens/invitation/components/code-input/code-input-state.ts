export interface ICodeInputState {
  characterCount: number;
  codeCharacters: (string | undefined)[];
  focusIndex: number | undefined;
}

export const initialState: ICodeInputState = {
  characterCount: 0,
  codeCharacters: [],
  focusIndex: undefined,
};
