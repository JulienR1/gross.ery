import React, { useCallback, useEffect, useState } from 'react';
import { Animated, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useSlideAnimations } from '~/animations';
import { useKeyboard, useSwipeableView } from '~/hooks';
import { ScreenProps } from '~/modules/navigation/types';
import { Colors, rootStyles } from '~/styles';

import { CreateForm, OptionButton, SubscribeForm } from './components';
import { styles } from './styles';

enum RegistrationMode {
  None = 'none',
  Code = 'code',
  Create = 'create',
}

export interface RegisterScreenProps extends ScreenProps {}

export const RegisterScreen = ({}: RegisterScreenProps) => {
  const [registrationMode, setRegistrationMode] = useState(
    RegistrationMode.None,
  );
  const { enableSwipe, disableSwipe } = useSwipeableView();

  const { slidePercent, slideIn, slideOut } = useSlideAnimations(150);
  useKeyboard(slideIn, slideOut);

  const onFormClose = useCallback(
    () => setRegistrationMode(RegistrationMode.None),
    [],
  );

  useEffect(() => {
    if (registrationMode === RegistrationMode.Code) {
      disableSwipe();
    } else {
      enableSwipe();
    }
  }, [registrationMode, enableSwipe, disableSwipe]);

  const optionButtonDisabled = slidePercent > 0;
  const animationPercent = 1 - slidePercent;

  const { title } = rootStyles;
  const { buttonContainer, text } = styles;
  const animatedButtonContainer = {
    opacity: animationPercent,
    maxHeight: `${animationPercent * 100}%`,
    marginVertical: animationPercent * buttonContainer.marginVertical,
  };

  return (
    <>
      <Text style={title}>Nouvelle liste</Text>

      <Animated.View style={[buttonContainer, animatedButtonContainer]}>
        <OptionButton
          disabled={optionButtonDisabled}
          isToggled={registrationMode === RegistrationMode.Code}
          onPress={() => setRegistrationMode(RegistrationMode.Code)}>
          <Icon name="qr-code" size={30} color={Colors.Black} />
          <Text style={text}>Scanner un code</Text>
        </OptionButton>

        <OptionButton
          disabled={optionButtonDisabled}
          isToggled={registrationMode === RegistrationMode.Create}
          onPress={() => setRegistrationMode(RegistrationMode.Create)}>
          <Icon name="library-add" size={30} color={Colors.Black} />
          <Text style={text}>Créer une liste</Text>
        </OptionButton>
      </Animated.View>

      {registrationMode === RegistrationMode.Create && (
        <CreateForm onClose={onFormClose} />
      )}
      {registrationMode === RegistrationMode.Code && (
        <SubscribeForm onClose={onFormClose} />
      )}
    </>
  );
};
