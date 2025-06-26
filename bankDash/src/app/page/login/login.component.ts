import { Component, inject, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatError } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../request-service/login.service';
import { AuthService } from '../../guards/auth.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [NgIf, ReactiveFormsModule, MatError, MatButtonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginService = inject(LoginService);
  authService = inject(AuthService);
  route = inject(ActivatedRoute);
  form = new FormGroup({
    username: new FormControl<string | null>('Sasha2', [Validators.required]),
    password: new FormControl<string | null>('222222', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  submit(): void {
    this.loginService.qetLogin(this.form.value).subscribe((user: any) => {
      this.authService.login(user.token);
    });
  }

  ngOnInit(): void {
    const username = this.route.snapshot.queryParamMap.get('username');
    if (username) {
      this.form.patchValue({ username: username });
    }
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
