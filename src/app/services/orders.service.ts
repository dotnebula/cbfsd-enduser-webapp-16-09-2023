import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient: HttpClient) { }

  private ODR_URL =`${environment.apiBaseUrl}/orders`;

  getAll() {
    return this.httpClient.get<any[]>(`${this.ODR_URL}`);
  }

  getOne(id:number) {
    return this.httpClient.get<any[]>(`${this.ODR_URL}/${id}`);
  }

  addOrder(order:any) {
    return this.httpClient.post<any[]>(`${this.ODR_URL}`, order);
  }
}
