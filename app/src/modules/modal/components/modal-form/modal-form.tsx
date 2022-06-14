import React, { FC, useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';

import { useAnimation } from '~/animations';

import { styles as modalStyles } from '../../styles';
import { ModalButton } from '../modal-button';
import { FormStatus } from './form-status.enum';
import { styles } from './styles';

type FormOption = {
  component: FC;
  onPress: () => void;
  color?: string;
};

interface IProps {
  cancel: FormOption;
  pursue: FormOption;
}

export const ModalForm = ({ cancel, pursue }: IProps) => {
  const { animationPercent, animate } = useAnimation(250);
  const [formStatus, setFormStatus] = useState(FormStatus.PENDING);

  const possibleCallbacks = useMemo(
    () => ({
      [FormStatus.PENDING]: () => {},
      [FormStatus.PURSUING]: pursue.onPress,
      [FormStatus.CANCELLING]: cancel.onPress,
    }),
    [pursue.onPress, cancel.onPress],
  );

  const sendFormResult = useCallback(
    (status: FormStatus) => () => {
      setFormStatus(status);
      animate(1, possibleCallbacks[status]);
    },
    [possibleCallbacks, animate],
  );

  const { component: PursueComponent } = pursue;
  const { component: CancelComponent } = cancel;

  const { container } = styles;
  const { section } = modalStyles;
  return (
    <View style={[container, section]}>
      <ModalButton
        onPress={sendFormResult(FormStatus.CANCELLING)}
        isShrinking={formStatus === FormStatus.PURSUING}
        shrinkPercent={1 - animationPercent}
        color={cancel.color}>
        <CancelComponent />
      </ModalButton>
      <ModalButton
        onPress={sendFormResult(FormStatus.PURSUING)}
        isShrinking={formStatus === FormStatus.CANCELLING}
        shrinkPercent={1 - animationPercent}
        color={pursue.color}>
        <PursueComponent />
      </ModalButton>
    </View>
  );
};
