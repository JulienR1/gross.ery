import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Keyboard, Text, TouchableOpacity, View } from 'react-native';

import { useSlideAnimations } from '~/animations';
import { Loader } from '~/components';
import { useApi } from '~/modules/api';
import { useAuthorization } from '~/modules/authorization';
import { config } from '~/modules/config';
import { devStyles } from '~/styles/dev-styles';

import { CodeInput, CwoissantImage } from './components';
import { CodeInputRef } from './components/code-input/types';
import { useKeyboard } from './hooks';
import { InvitationState } from './invitation-state.enum';
import {
  canProcessState,
  getFeedbackText,
  isInvalidState,
  validateCode,
} from './service';
import { styles } from './styles';

export const InvitationScreen = () => {
  const apiData = useApi();
  const { updateAuthorization } = useAuthorization();

  const codeInputRef = useRef<CodeInputRef | null>(null);
  const [invitationState, setInvitationState] = useState(InvitationState.Idle);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const { slidePercent, slideIn, slideOut } = useSlideAnimations(150);

  useKeyboard(keyboardHeight => {
    setKeyboardHeight(keyboardHeight);
    slideIn();
  }, slideOut);

  const resetInput = useCallback(() => {
    codeInputRef.current?.clear();
    setInvitationState(InvitationState.Idle);
  }, []);

  useEffect(() => {
    if (isInvalidState(invitationState)) {
      const timeout = setTimeout(resetInput, 4000);
      return () => clearTimeout(timeout);
    }
  }, [invitationState]);

  const onCode = useCallback(
    async (code: string) => {
      Keyboard.dismiss();

      if (!apiData.connected) {
        setInvitationState(InvitationState.NoConnection);
        return;
      }

      setInvitationState(InvitationState.Validating);
      const codeIsValid = await validateCode(apiData.api, code);
      await updateAuthorization(codeIsValid);

      if (!codeIsValid) {
        setInvitationState(InvitationState.Blocked);
      }
    },
    [apiData, updateAuthorization],
  );

  const { container, imageContainer, image, text, title, feedback } = styles;
  const containerStyles = {
    transform: [{ translateY: -slidePercent * (keyboardHeight / 10) }],
  };
  const imageContainerStyles = { maxWidth: 100 + 100 * (1 - slidePercent) };

  return (
    <View style={container}>
      <View style={[imageContainer, imageContainerStyles]}>
        <CwoissantImage style={image} />
      </View>

      <Animated.View style={containerStyles}>
        <Text style={[title, text]}>Entrer un code d'invitation</Text>
        <CodeInput
          onCode={onCode}
          ref={codeInputRef}
          characterCount={5}
          enabled={canProcessState(invitationState)}
        />

        <Text style={[feedback, text]}>{getFeedbackText(invitationState)}</Text>
        {invitationState === InvitationState.Validating && <Loader />}
      </Animated.View>

      {!config.IS_PROD && (
        <View style={devStyles.container}>
          <TouchableOpacity
            onPress={() => updateAuthorization(true)}
            style={devStyles.wrapper}>
            <Text style={devStyles.text}>Get authorized</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
