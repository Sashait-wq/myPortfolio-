import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatError } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  imports: [NgIf, ReactiveFormsModule, MatError, MatButton],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginService = inject(LoginService);

  form = new FormGroup({
    username: new FormControl<string | null>('Sasha', [Validators.required]),
    password: new FormControl<string | null>('password123', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  submit(): void {
    this.loginService.qetLogin(this.form.value).subscribe((user: any) => {
      console.log(user);
    });
  }

  public isInvalid(controlName: string): boolean {
    const control: AbstractControl | null = this.form.get(controlName);
    return !!control && control.invalid && control.touched;
  }

  public getError(controlName: string, errorCode: string): boolean {
    const control: AbstractControl | null = this.form.get(controlName);
    return !!control && control.hasError(errorCode);
  }
}
