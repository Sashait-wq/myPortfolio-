import { Component, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Toast } from './toast.interface';
import { ToastService } from './toast.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-toast-message',
  imports: [MatIconButton, MatIcon, NgClass],
  templateUrl: './toast-message.component.html',
  styleUrl: './toast-message.component.scss'
})
export class ToastMessageComponent implements OnInit {
  public toasts: Toast[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toasts$.subscribe((toast: Toast) => {
      this.toasts.push(toast);

      if (!toast.buttonClous) {
        setTimeout(() => {
          this.toasts = this.toasts.filter((t: Toast) => {
            return t !== toast;
          });
        }, toast.duration || 3000);
      }
    });
  }

  public closeToast(i: Toast): void {
    this.toasts = this.toasts.filter((t: Toast) => {
      return t !== i;
    });
  }
}
