import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RegistrationState } from './registration.reducers';

export const registerFeaturesSelector = createFeatureSelector<RegistrationState>('register');
export const registerSelector = createSelector(registerFeaturesSelector, (state) => state.form);
