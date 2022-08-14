import React, { useCallback, useEffect, useState } from 'react';

import { FormWrapper } from '../form-wrapper';
import { QrCamera } from '../qr-camera';

interface IProps {
  onClose: () => void;
}

export const SubscribeForm = ({ onClose }: IProps) => {
  const [readQr, setReadQr] = useState(true);
  const [qrData, setQrData] = useState('');

  const onQrClose = useCallback(() => {
    setReadQr(false);
    if (!qrData) {
      onClose();
    }
  }, [qrData, onClose]);

  useEffect(() => {
    console.log('Processing qr data...', qrData);
  }, [qrData]);

  return (
    <>
      <FormWrapper
        canSubmit={false}
        isDirty={false}
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
      {readQr && (
        <QrCamera onData={data => setQrData(data)} onClose={onQrClose} />
      )}
    </>
  );
};
