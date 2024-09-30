import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { environment } from '@environment/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl: string = environment.apiUrl;
  http: HttpClient = inject(HttpClient);
  products = toSignal(this.http.get<any[]>(`${this.apiUrl}/products`));
}
