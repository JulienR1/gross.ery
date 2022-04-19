import React, {
  useEffect,
  useState,
  ReactNode,
  ReactNodeArray,
  useCallback,
  useRef,
} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import config from '../../config';
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

  const onCode = async (code: string) => {
    setGuardState(GuardState.Validating);
    const codeIsValid = await validateCode(code);
    await saveInvitationStatus(codeIsValid);
    updateGuardStatus();
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

      {!config.IS_PROD && (
        <TouchableOpacity
          style={{
            paddingVertical: 8,
            position: 'absolute',
            bottom: 0,
            height: 40,
            backgroundColor: 'pink',
          }}
          onPress={() => {
            saveInvitationStatus(false);
            updateGuardStatus();
          }}>
          <Text>Clear invitation</Text>
        </TouchableOpacity>
      )}
    </>
  );
}
