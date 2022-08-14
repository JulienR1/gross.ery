import LottieView from 'lottie-react-native';
import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import { Loader } from '~/components';
import { useIsMounted } from '~/hooks';
import { useApi } from '~/modules/api';
import { useNavigation } from '~/modules/navigation';
import { ListScreenProps } from '~/screens/list.screen';
import { Screen } from '~/screens/screen.enum';

import { FormWrapper } from '../form-wrapper';
import { FormWrapperRef } from '../form-wrapper/types';
import { createList } from './service';
import { styles } from './styles';

const checkmarkAnimation = require('../../../../assets/checkmark.json');

interface IProps {
  onClose: () => void;
}

enum FormState {
  Editing,
  Loading,
  Success,
}

export const CreateForm = memo(({ onClose }: IProps) => {
  const apiInfo = useApi();
  const { replaceScreen } = useNavigation();
  const isMounted = useIsMounted();
  const formRef = useRef<FormWrapperRef>(null);

  const [title, setTitle] = useState('');
  const [formState, setFormState] = useState(FormState.Editing);

  const canSubmit = useMemo(
    () => formState === FormState.Editing && title.trim().length > 0,
    [title, formState],
  );

  const submit = useCallback(async () => {
    if (apiInfo.connected) {
      setFormState(FormState.Loading);
      const id = await createList(apiInfo.api, title);
      if (isMounted() && id) {
        setFormState(FormState.Success);
        setTimeout(() => {
          if (isMounted()) {
            replaceScreen<ListScreenProps>(Screen.List, { listId: id });
          }
        }, 750);
      }
    } else {
      // TOOD: NO internet connection notification?
    }
  }, [apiInfo, title, isMounted, replaceScreen]);

  const {
    container,
    title: titleStyles,
    inputField,
    disabled,
    loaderContainer,
    checkmark,
  } = styles;
  const inputStyles = [inputField, formState !== FormState.Editing && disabled];

  return (
    <FormWrapper
      ref={formRef}
      canSubmit={canSubmit}
      formValue={{ title }}
      cancel={{ onPress: onClose }}
      submit={{ label: 'Créer', onPress: submit }}>
      <View style={container}>
        <Text style={titleStyles}>Nom de la liste</Text>
        <TextInput
          style={inputStyles}
          editable={formState === FormState.Editing}
          onChangeText={setTitle}
          onSubmitEditing={() => formRef.current?.submit()}
        />
        <View style={loaderContainer}>
          {formState === FormState.Loading && <Loader />}
          {formState === FormState.Success && (
            <LottieView
              autoPlay
              loop={false}
              style={checkmark}
              source={checkmarkAnimation}
            />
          )}
        </View>
      </View>
    </FormWrapper>
  );
});
