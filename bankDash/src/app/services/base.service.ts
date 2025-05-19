import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  protected baseUrl = 'http://localhost:3000/api/';
  constructor(private http: HttpClient) {}

  protected header(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer jwt'
    });
  }
  protected get(url: string): Observable<any> {
    return this.http.get(this.baseUrl + url);
  }

  protected post(url: string, data: any, params?: any): Observable<any> {
    return this.http.post(this.baseUrl + url, data, { headers: this.header(), params });
  }
}
