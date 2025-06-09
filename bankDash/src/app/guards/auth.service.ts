import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoginIn = false;

  router = inject(Router);

  constructor() {
    this.isLoginIn = !!localStorage.getItem('token');
  }

  get isAuth(): boolean {
    return this.isLoginIn;
  }

  login(token: string): void {
    localStorage.setItem('token', token);
    this.isLoginIn = true;

    this.router.navigate(['/app/dashboard']);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoginIn = false;

    this.router.navigate(['/login']);
  }
}
