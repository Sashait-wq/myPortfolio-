import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatButton } from '@angular/material/button';
import { PasswordChangeService } from '../../../request-service/password-change.service';
import { ToastService } from '../../toast-message/toast.service';

@Component({
  selector: 'app-security',
  imports: [FormsModule, MatSlideToggle, ReactiveFormsModule, MatButton],
  templateUrl: './security.component.html',
  styleUrl: './security.component.scss'
})
export class SecurityComponent {
  private passwordChangeService = inject(PasswordChangeService);
  private toastService = inject(ToastService);
  form = new FormGroup({
    currentPassword: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
    newPassword: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
    notifyAuthentication: new FormControl<boolean>(false)
  });

  public submit(): void {
    if (this.form.invalid) return;

    const current = this.form.get('currentPassword')?.value;
    const password = this.form.get('newPassword')?.value;

    this.passwordChangeService
      .passwordChange({ currentPassword: current!, newPassword: password! })
      .subscribe({
        next: () => {
          this.toastService.showToast({
            message: 'Password changed successfully',
            title: 'Done'
          });
          this.form.reset();
        },
        error: (err) => {
          this.toastService.showToast({
            message: `Password changed: ${err.message}`,
            error: true,
            title: 'Error',
            buttonClous: true
          });
        }
      });
  }
}
