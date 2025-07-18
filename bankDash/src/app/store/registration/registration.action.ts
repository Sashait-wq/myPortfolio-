import { createAction, props } from '@ngrx/store';
import { IRegistrationData } from '../../interfaces/registration-data.interface';

export enum RegistrationUsers {
  Register = '[Auth] Register',
  RegisterSuccess = '[Auth] Register Success',
  RegisterFailures = '[Auth] Register Failures'
}

export const register = createAction(
  RegistrationUsers.Register,
  props<{ user: IRegistrationData }>()
);

export const registerSuccess = createAction(
  RegistrationUsers.RegisterSuccess,
  props<{ user: IRegistrationData }>()
);

export const registerFailure = createAction(
  RegistrationUsers.RegisterFailures,
  props<{ error: any }>()
);
