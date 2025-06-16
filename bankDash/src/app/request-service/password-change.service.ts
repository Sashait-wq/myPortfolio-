import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

export interface Change {
  currentPassword: string;
  newPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class PasswordChangeService extends BaseService {
  public passwordChange(password: Change): Observable<Change> {
    return this.put('profile/password', password);
  }
}
