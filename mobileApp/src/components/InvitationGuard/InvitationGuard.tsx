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
import {Loader} from '../Loader';
import {validateCode} from './service';
import {styles} from './styles';

enum GuardState {
  Idle = 'idle',
  Loading = 'loading',
  Validating = 'validating',
  Allowed = 'allowed',
  Blocked = 'blocked',
}

interface IProps {
  children: ReactNode | ReactNodeArray;
}

export function InvitationGuard({children}: IProps) {
  const [guardState, setGuardState] = useState<GuardState>(GuardState.Loading);
  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updateGuardStatus = useCallback((isInitialRequest = false) => {
    getInvitationStatus().then(storedStatus => {
      setGuardState(
        storedStatus === 'true'
          ? GuardState.Allowed
          : isInitialRequest
          ? GuardState.Idle
          : GuardState.Blocked,
      );
    });
  }, []);

  useEffect(() => {
    updateGuardStatus(true);
  }, [updateGuardStatus]);

  useEffect(() => {
    const clear = () => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
    };

    clear();
    if (guardState === GuardState.Blocked) {
      errorTimeoutRef.current = setTimeout(
        () => setGuardState(GuardState.Idle),
        4000,
      );
    }
    return () => {
      clear();
    };
  }, [guardState]);

  const onCode = (code: string) => {
    setGuardState(GuardState.Validating);
    validateCode(code)
      .then(async codeIsValid => {
        await saveInvitationStatus(codeIsValid);
        if (!codeIsValid) {
          setGuardState(GuardState.Blocked);
        }
      })
      .then(() => updateGuardStatus());
  };

  return (
    <>
      {guardState === GuardState.Loading && <Loader />}
      {[GuardState.Idle, GuardState.Validating, GuardState.Blocked].includes(
        guardState,
      ) && (
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
            enabled={guardState !== GuardState.Validating}
            onCode={code => onCode(code)}
          />

          <View>
            {guardState === GuardState.Validating && (
              <Text style={styles.feedback}>Vérification en cours</Text>
            )}
            {guardState === GuardState.Blocked && (
              <Text style={styles.feedback}>Code invalide</Text>
            )}
          </View>
        </View>
      )}

      {guardState === GuardState.Allowed && children}
    </>
  );
}
