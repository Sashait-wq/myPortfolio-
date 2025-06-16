import { createReducer, on } from '@ngrx/store';
import { register, registerFailure, registerSuccess } from './registration.action';
import { IRegistrationData } from '../../interfaces/registration-data.interface';

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

  on(register, (state, user) => ({
    ...state,
    user,
    error: null
  })),
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
