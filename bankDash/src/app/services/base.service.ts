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
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }
  protected get(url: string, params?: any): Observable<any> {
    return this.http.get(this.baseUrl + url, { headers: this.header(), params });
  }

  protected post(url: string, data: any, params?: any): Observable<any> {
    return this.http.post(this.baseUrl + url, data, { headers: this.header(), params });
  }
}

// Конект з беком
// Доробити логін
// І робиби гуарди
