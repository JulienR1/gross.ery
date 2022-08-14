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

interface IProps {
  onClose: () => void;
}

export const CreateForm = memo(({ onClose }: IProps) => {
  const apiInfo = useApi();
  const { replaceScreen } = useNavigation();
  const isMounted = useIsMounted();
  const formRef = useRef<FormWrapperRef>(null);

  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const canSubmit = useMemo(
    () => !isLoading && title.trim().length > 0,
    [title, isLoading],
  );

  const submit = useCallback(async () => {
    if (apiInfo.connected) {
      setIsLoading(true);
      const id = await createList(apiInfo.api, title);
      if (isMounted() && id) {
        // TODO: add delay before closing the screen to understand what happened
        // TODO: add checkmark animation
        replaceScreen<ListScreenProps>(Screen.List, { listId: id });
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
  } = styles;
  const inputStyles = [inputField, isLoading && disabled];

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
          editable={!isLoading}
          onChangeText={setTitle}
          onSubmitEditing={() => formRef.current?.submit()}
        />
        <View style={loaderContainer}>{isLoading && <Loader />}</View>
      </View>
    </FormWrapper>
  );
});
