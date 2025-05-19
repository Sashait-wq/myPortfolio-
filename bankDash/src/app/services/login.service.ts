import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {
  public qetLogin(): Observable<any> {
    return this.post('login', {
      username: 'user123',
      password: 'password123'
    });
  }
}
