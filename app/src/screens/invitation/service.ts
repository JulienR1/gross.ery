import { CodeValidationEntity } from 'shared';

import { ApiFunction } from '~/modules/api/types';
import { InvitationState } from './invitation-state.enum';

export const validateCode = async (api: ApiFunction, code: string) => {
  try {
    const response = await api<CodeValidationEntity>(`code/${code}`);
    return response?.isValid ?? false;
  } catch {
    return false;
  }
};

export const isInvalidState = (invitationState: InvitationState) => {
  return [InvitationState.Blocked, InvitationState.NoConnection].includes(
    invitationState,
  );
};

export const canProcessState = (invitationState: InvitationState) => {
  return InvitationState.Idle === invitationState;
};

export const getFeedbackText = (invitationState: InvitationState) => {
  switch (invitationState) {
    case InvitationState.Validating:
      return 'Vérification en cours';
    case InvitationState.Blocked:
      return 'Code invalide';
    case InvitationState.NoConnection:
      return "Impossible d'accéder à internet";
    default:
      return '';
  }
};
