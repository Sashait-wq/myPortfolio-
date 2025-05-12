import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  isFormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';

interface ProfileForm {
  yourName: FormControl<string | null>;
  email: FormControl<string | null>;
  dataBirth: FormControl<string | null>;
  address: FormControl<string | null>;
  postalCode: FormControl<number | null>;
  userName: FormControl<string | null>;
  password: FormControl<string | null>;
  presentAddress: FormControl<string | null>;
  city: FormControl<string | null>;
  country: FormControl<string | null>;
}

@Component({
  selector: 'app-profile',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatButton, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  form = new FormGroup<ProfileForm>({
    yourName: new FormControl<string | null>(null),
    email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
    dataBirth: new FormControl<string | null>(null),
    address: new FormControl<string | null>(null),
    postalCode: new FormControl<number | null>(null),
    userName: new FormControl<string | null>(null),
    password: new FormControl<string | null>(null),
    presentAddress: new FormControl<string | null>(null),
    city: new FormControl<string | null>(null),
    country: new FormControl<string | null>(null)
  });

  public save(): void {
    console.log(this.form.value);
    this.form.reset();
  }

  protected readonly isFormControl = isFormControl;
}
