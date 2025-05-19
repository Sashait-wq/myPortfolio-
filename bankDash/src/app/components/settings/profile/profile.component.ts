import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  isFormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ProfileForm } from '../../../interfaces/setting.interface';

@Component({
  selector: 'app-profile',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatButton, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  form = new FormGroup<ProfileForm>({
    yourName: new FormControl<string | null>(null, Validators.required),
    email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
    dataBirth: new FormControl<string | null>(null, Validators.required),
    address: new FormControl<string | null>(null, Validators.required),
    postalCode: new FormControl<string | null>(null, [
      Validators.required,
      Validators.pattern(/^[A-Za-z0-9\s\-]{3,10}$/)
    ]),
    userName: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, [Validators.required, Validators.minLength(6)]),
    presentAddress: new FormControl<string | null>(null, Validators.required),
    city: new FormControl<string | null>(null, Validators.required),
    country: new FormControl<string | null>(null, Validators.required)
  });

  public save(): void {
    console.log(this.form.value);
    this.form.reset();
  }

  public isInvalid(controlName: string): boolean {
    const control: AbstractControl | null = this.form.get(controlName);
    return !!control && control.invalid && control.touched;
  }

  public getError(controlName: string, errorCode: string): boolean {
    const control: AbstractControl | null = this.form.get(controlName);
    return !!control && control.hasError(errorCode);
  }

  protected readonly isFormControl = isFormControl;
}
