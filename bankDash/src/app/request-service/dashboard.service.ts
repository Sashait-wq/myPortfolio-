import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { DashboardResponse } from '../page/dashboard/dashboard.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseService {
  public getDashboard(): Observable<DashboardResponse> {
    return this.get('dashboard');
  }
}
