import { createReducer, on } from '@ngrx/store';
import { registerFailure, registerSuccess } from './registration.action';
import { IRegistrationData } from './registration-data.interface';

export interface RegistrationState {
  form: IRegistrationData;
  token: string | null;
  error: any;
}

const initialState: RegistrationState = {
  form: {
    username: '',
    password: '',
    email: '',
    fullName: '',
    dateOfBirth: '',
    presentAddress: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  },
  token: null,
  error: null
};

export const registerReducer = createReducer(
  initialState,

  on(registerSuccess, (state, { user }) => ({
    ...state,
    form: { ...user },
    error: null
  })),

  on(registerFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
