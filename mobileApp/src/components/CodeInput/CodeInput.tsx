import React, {useEffect, useMemo, useReducer, useRef} from 'react';
import {Text, TextInput, TextInputKeyPressEventData, View} from 'react-native';
import {CharacterInput} from './CharacterInput';
import {
  insertCodeCharacter,
  removeCodeCharacter,
  selectCodeCharacter,
  setCodeSize,
} from './codeInputAction';
import {codeInputReducer} from './codeInputReducer';
import {initialState} from './codeInputState';
import {styles} from './styles';

interface IProps {
  characterCount: number;
  enabled: boolean;
  onCode: (code: string) => void;
}

export function CodeInput({characterCount, enabled, onCode}: IProps) {
  const mainInput = useRef<TextInput | null>(null);
  const [{focusIndex, codeCharacters}, dispatch] = useReducer(
    codeInputReducer,
    initialState,
  );
  const validationRegex = useMemo(
    () => new RegExp(`[a-zA-Z0-9_-]{${characterCount}}`),
    [characterCount],
  );

  useEffect(() => {
    dispatch(setCodeSize(characterCount));
  }, [characterCount]);

  useEffect(() => {
    const code = codeCharacters.join('');
    if (validationRegex.test(code)) {
      dispatch(selectCodeCharacter(undefined));
      onCode(code);
    }
  }, [codeCharacters, validationRegex]);

  const onKeyPress = (e: TextInputKeyPressEventData) => {
    if (e.key === 'Backspace') {
      dispatch(removeCodeCharacter());
    } else if (/[a-zA-Z0-9_-]/.test(e.key)) {
      dispatch(insertCodeCharacter(e.key));
    }
  };

  const onSelectPosition = (codeIndex: number) => {
    mainInput.current?.blur();
    mainInput.current?.focus();
    dispatch(selectCodeCharacter(codeIndex));
  };

  return (
    <View style={styles.codeList}>
      <TextInput
        ref={mainInput}
        editable={enabled}
        autoCapitalize={'none'}
        style={styles.invisible}
        onKeyPress={e => onKeyPress(e.nativeEvent)}
      />

      {Array(characterCount)
        .fill(undefined)
        .map((_, index) => (
          <CharacterInput
            key={`code-${index}`}
            hasFocus={index === focusIndex}
            disabled={!enabled}
            onPress={() => onSelectPosition(index)}>
            <Text style={styles.character}>{codeCharacters[index] ?? ''}</Text>
          </CharacterInput>
        ))}
    </View>
  );
}
