import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import {
  Text,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native';

import { CharacterInput } from './character-input';
import {
  clearCode,
  insertCodeCharacter,
  removeCodeCharacter,
  selectCodeCharacter,
  setCodeSize,
} from './code-input-action';
import { codeInputReducer } from './code-input-reducer';
import { initialState } from './code-input-state';
import { codeInputStyles } from './styles';
import { CodeInputRef } from './types';

interface IProps {
  characterCount: number;
  enabled: boolean;
  onCode: (code: string) => void;
}

export const CodeInput = memo(
  forwardRef<CodeInputRef, IProps>(
    ({ characterCount, enabled, onCode }, ref) => {
      const inputfield = useRef<TextInput | null>(null);
      const validationRegex = useMemo(
        () => new RegExp(`[a-zA-Z0-9_-]{${characterCount}}`),
        [characterCount],
      );

      const [{ focusIndex, codeCharacters }, dispatch] = useReducer(
        codeInputReducer,
        initialState,
      );

      useImperativeHandle(ref, () => ({
        clear: () => {
          inputfield.current?.clear();
          dispatch(clearCode());
        },
      }));

      const onKeyPress = useCallback(
        (e: TextInputKeyPressEventData) => {
          if (!enabled) {
            return;
          }

          if (e.key === 'Backspace') {
            dispatch(removeCodeCharacter());
          } else if (/[a-zA-Z0-9_-]/.test(e.key)) {
            dispatch(insertCodeCharacter(e.key));
          }
        },
        [dispatch, enabled],
      );

      const selectPosition = (codeIndex: number) => () => {
        inputfield.current?.blur();
        inputfield.current?.focus();
        dispatch(selectCodeCharacter(codeIndex));
      };

      useEffect(() => {
        dispatch(setCodeSize(characterCount));
      }, [characterCount]);

      useEffect(() => {
        const code = codeCharacters.join('');
        if (validationRegex.test(code)) {
          dispatch(selectCodeCharacter(undefined));
          onCode(code);
        }
      }, [codeCharacters, validationRegex, onCode]);

      const { invisible, list, character } = codeInputStyles;
      return (
        <View style={list}>
          <TextInput
            ref={inputfield}
            style={invisible}
            editable={enabled}
            autoCapitalize={'none'}
            maxLength={characterCount}
            onKeyPress={e => onKeyPress(e.nativeEvent)}
          />

          {Array.from(Array(characterCount)).map((_, index) => (
            <CharacterInput
              key={index}
              disabled={!enabled}
              hasFocus={index === focusIndex}
              onPress={selectPosition(index)}
              widthPercent={`${100 / (characterCount * 1.1)}%`}>
              <Text style={character}>{codeCharacters[index] ?? ''}</Text>
            </CharacterInput>
          ))}
        </View>
      );
    },
  ),
);
