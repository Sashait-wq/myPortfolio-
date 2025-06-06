import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {
  public qetLogin(user: any): Observable<any> {
    return this.post('login', user);
  }
}
