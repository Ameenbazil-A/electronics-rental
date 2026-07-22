import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ApiResponse } from '../models/api-response.model';

import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/products/`;

  

  getProducts(
    search?: string,
    category?: string,
    ordering?: string,
    available?: string
  ): Observable<ApiResponse<Product>> {

    let params = new HttpParams();

    if (search) {
      params = params.set('search', search);
    }

    if (category) {
      params = params.set('category', category);
    }

    if (ordering) {
      params = params.set('ordering', ordering);
    }

    if (available) {
      params = params.set('available', available);
    }

    return this.http.get<ApiResponse<Product>>(
      this.apiUrl,
      { params }
    );

  }

  getProductsByUrl(url: string): Observable<ApiResponse<Product>> {

    return this.http.get<ApiResponse<Product>>(url);

  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}${id}/`);
  }


  createProduct(data: FormData) {
    return this.http.post(this.apiUrl, data);
  }

  updateProduct(id: number, data: FormData) {
    return this.http.put(`${this.apiUrl}${id}/`, data);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

}