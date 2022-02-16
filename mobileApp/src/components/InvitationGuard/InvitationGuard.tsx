import React, {
  useEffect,
  useState,
  ReactNode,
  ReactNodeArray,
  useCallback,
  useRef,
} from 'react';
import {Text, View, Image} from 'react-native';
import {getInvitationStatus, saveInvitationStatus} from '../../localstorage';
import {CodeInput} from '../CodeInput';
import {validateCode} from './service';
import {styles} from './styles';

interface IProps {
  children: ReactNode | ReactNodeArray;
}

export function InvitationGuard({children}: IProps) {
  const [hasBeenInvited, setHasBeenInvited] = useState(false);
  const [isValidatingCode, setIsValidatingCode] = useState(false);
  const [renderInvalid, setRenderInvalid] = useState(false);
  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updateGuardStatus = useCallback(() => {
    getInvitationStatus().then(storedStatus => {
      setHasBeenInvited(storedStatus === 'true');
    });
  }, []);

  useEffect(() => {
    updateGuardStatus();
  }, [updateGuardStatus]);

  useEffect(() => {
    const clear = () => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
    };

    clear();
    errorTimeoutRef.current = setTimeout(() => setRenderInvalid(false), 4000);
    return () => {
      clear();
    };
  }, [renderInvalid]);

  const onCode = (code: string) => {
    setIsValidatingCode(true);
    validateCode(code)
      .then(codeIsValid => {
        saveInvitationStatus(codeIsValid);
        if (!codeIsValid) {
          setRenderInvalid(true);
        }
      })
      .then(() => {
        updateGuardStatus();
        setIsValidatingCode(false);
      });
  };

  return (
    <>
      {!hasBeenInvited && (
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require('./../../assets/cwoissant.png')}
          />
          <View>
            <Text style={styles.title}>Entrer un code d'invitation</Text>
          </View>
          <CodeInput
            characterCount={5}
            enabled={!isValidatingCode}
            onCode={code => onCode(code)}
          />

          <View>
            {isValidatingCode && (
              <Text style={styles.feedback}>Vérification en cours</Text>
            )}
            {renderInvalid && (
              <Text style={styles.feedback}>Code invalide</Text>
            )}
          </View>
        </View>
      )}

      {hasBeenInvited && children}
    </>
  );
}
