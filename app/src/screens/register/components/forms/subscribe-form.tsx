import React, { useCallback, useEffect, useState } from 'react';

import { FormWrapper } from '../form-wrapper';
import { QrCamera } from '../qr-camera';

interface IProps {
  onClose: () => void;
}

export const SubscribeForm = ({ onClose }: IProps) => {
  const [readQr, setReadQr] = useState(true);

  const onQrClose = useCallback(
    (forceClose: boolean) => {
      setReadQr(false);
      if (!forceClose) {
        onClose();
      }
    },
    [onClose],
  );

  const onQrData = (qrData: string) => {
    console.log('Processing qr data...', qrData);
  };

  return (
    <>
      <FormWrapper
        canSubmit={false}
        formValue={{}}
        submit={{
          onPress: () => {
            console.log('submit');
            onClose();
          },
        }}
        cancel={{
          onPress: () => {
            console.log('cancel');
            onClose();
          },
        }}>
        {/* <FormItem></FormItem> */}
      </FormWrapper>
      {readQr && <QrCamera onData={onQrData} onClose={onQrClose} />}
    </>
  );
};
