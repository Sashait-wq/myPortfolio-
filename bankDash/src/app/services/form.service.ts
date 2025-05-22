import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationForm } from '../interfaces/registration.interface';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  public createForm(): FormGroup<RegistrationForm> {
    return new FormGroup<RegistrationForm>({
      fullName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      dateOfBirth: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      postalCode: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Za-z0-9\s\-]{3,10}$/)
      ]),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      presentAddress: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required)
    });
  }
}
