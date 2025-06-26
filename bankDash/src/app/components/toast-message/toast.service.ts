import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Toast } from './toast.interface';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private subject = new Subject<Toast>();

  public toasts$ = this.subject.asObservable();

  public showToast(toast: Toast): void {
    this.subject.next(toast);
  }
}
