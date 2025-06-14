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
            return registerSuccess({
              user: response.user
            });
          }),
          catchError((error) => of(registerFailure({ error })))
        )
      )
    )
  );
}
