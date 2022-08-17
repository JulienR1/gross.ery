import React, {
  ForwardedRef,
  forwardRef,
  memo,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import { LayoutChangeEvent, Text, TouchableOpacity, View } from 'react-native';

import { useModal } from '~/modules/modal';
import { CancelEditModal } from '~/modules/modal/instances';

import { useIsDirty } from './hooks';
import { styles } from './styles';
import { FormWrapperRef } from './types';

type FormButton = { label?: string; onPress: () => void };

interface IProps<T extends Record<string, unknown>> {
  children: ReactNode | ReactNode[];
  formValue: T;
  canSubmit: boolean;
  submit: FormButton;
  cancel: FormButton;
}

const FormWrapperComponent = <T extends Record<string, unknown>>(
  { children, formValue, canSubmit, submit, cancel }: IProps<T>,
  ref: ForwardedRef<FormWrapperRef>,
) => {
  const { openModal } = useModal();
  const isDirty = useIsDirty(formValue);
  const [containerViewHeight, setContainerViewHeight] = useState(200);

  useImperativeHandle(ref, () => ({
    submit: () => canSubmit && submit.onPress(),
  }));

  const onCancel = useCallback(async () => {
    if (isDirty) {
      const { cancelled } = await openModal({
        component: CancelEditModal,
        mustAnswer: true,
      });

      if (cancelled) {
        return;
      }
    }
    cancel.onPress();
  }, [isDirty, cancel, openModal]);

  const {
    localItemContainer,
    buttonContainer,
    button,
    buttonCancel,
    buttonLabel,
    buttonLabelCancel,
    buttonDisabled,
  } = styles;

  const onFormLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const formHeight = event.nativeEvent.layout.height;
      const reductionHeight =
        buttonContainer.bottom +
        buttonLabel.lineHeight +
        (button.paddingVertical + button.borderRadius) * 2;
      setContainerViewHeight(formHeight - reductionHeight);
    },
    [buttonContainer, buttonLabel, button],
  );

  const childrenContainerStyles = { height: containerViewHeight };

  return (
    <View onLayout={onFormLayout} style={localItemContainer}>
      <View style={childrenContainerStyles}>{children}</View>
      <View style={buttonContainer}>
        <TouchableOpacity onPress={onCancel} style={[button, buttonCancel]}>
          <Text style={[buttonLabel, buttonLabelCancel]}>
            {cancel.label ?? 'Annuler'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!canSubmit}
          onPress={submit.onPress}
          style={[button, !canSubmit && buttonDisabled]}>
          <Text style={buttonLabel}>{submit.label ?? 'Envoyer'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const FormWrapper = memo(
  forwardRef(FormWrapperComponent) as <T extends Record<string, unknown>>(
    props: IProps<T> & { ref?: ForwardedRef<FormWrapperRef> },
  ) => ReturnType<typeof FormWrapperComponent>,
);
