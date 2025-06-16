import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { IRegistrationData } from '../interfaces/registration-data.interface';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService extends BaseService {
  public getUserLogin(user: IRegistrationData): Observable<any> {
    return this.post('register', user);
  }
  public getProfile(): Observable<any> {
    return this.get('profile');
  }
}
