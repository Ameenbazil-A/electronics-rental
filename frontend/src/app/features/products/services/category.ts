import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';

import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/categories/`;

  getCategories(): Observable<ApiResponse<Category>> {

    return this.http.get<ApiResponse<Category>>(this.apiUrl)

  }

  getCategory(id: number) {
    return this.http.get<Category>(`${this.apiUrl}${id}/`);
  }

  createCategory(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  updateCategory(id: number, data: any) {
    return this.http.put(`${this.apiUrl}${id}/`, data);
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }


  

}