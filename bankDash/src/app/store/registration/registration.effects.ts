import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { register, registerFailure, registerSuccess } from './registration.action';
import { RegistrationService } from '../../request-service/registration.service';
import { Router } from '@angular/router';

@Injectable()
export class RegistrationEffects {
  private service = inject(RegistrationService);
  private action = inject(Actions);
  private router = inject(Router);

  registerEffects$ = createEffect(() =>
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

  redirectAfterRegister$ = createEffect(
    () =>
      this.action.pipe(
        ofType(registerSuccess),
        tap(({ user }) => {
          this.router.navigate(['/login'], { queryParams: { username: user.username } });
        }),
        catchError((error) => {
          return of(registerFailure(error));
        })
      ),
    { dispatch: false }
  );
}
