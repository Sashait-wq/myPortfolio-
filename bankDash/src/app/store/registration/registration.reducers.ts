import { createReducer, on } from '@ngrx/store';
import { registerFailure, registerSuccess } from './registration.action';
import { IRegistrationData } from './registration-data.interface';

export interface RegistrationState {
  form: IRegistrationData;
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
  error: null
};

export const registerReducer = createReducer(
  initialState,

  on(registerSuccess, (state, { user }) => {
    Object.entries(user).forEach(([key, value]) => {
      (state.form as any)[key]?.setValue(value);
    });
    return { ...state, error: null };
  }),

  on(registerFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
