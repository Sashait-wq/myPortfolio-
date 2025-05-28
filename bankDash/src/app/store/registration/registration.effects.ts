import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { register, registerFailure, registerSuccess } from './registration.action';
import { RegistrationService } from '../../services/registration.service';

@Injectable()
export class RegistrationEffects {
  private service = inject(RegistrationService);
  private action = inject(Actions);

  RegisterEffects$ = createEffect(() =>
    this.action.pipe(
      ofType(register),
      switchMap(({ user }) =>
        this.service.getUserLogin(user).pipe(
          map((response) => {
            localStorage.setItem('token', response.token);
            return registerSuccess({
              user: response.user,
              token: response.token
            });
          }),
          catchError((error) => of(registerFailure({ error })))
        )
      )
    )
  );
}
