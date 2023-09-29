import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedProducts } from 'src/models/paginated-products';
import { Product } from 'src/models/products';
import { ProductParams } from 'src/models/query-filter';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProductsFilter(filters: ProductParams): Observable<PaginatedProducts> {
    let params = new HttpParams();
    if (filters.page) {
      params = params.append('page', filters.page.toString());
    }

    if (filters.maxPrice) {
      params = params.append('maxPrice', filters.maxPrice.toString());
    }

    if (filters.maxStock) {
      params = params.append('maxStock', filters.maxStock.toString());
    }

    if (filters.minPrice) {
      params = params.append('minPrice', filters.minPrice.toString());      
    }

    if (filters.minStock) {
      params = params.append('minStock', filters.minStock.toString());
    }

    if (filters.search) {
      params = params.append('search', filters.search);
    }

    if (filters.sort) {
      params = params.append('sort', filters.sort);
    }

    if (filters.sortBy) {
      params = params.append('sortBy', filters.sortBy);
    }
    return this.http.get<PaginatedProducts>('http://localhost:3000/api/product/filter', {params});
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`http://localhost:3000/api/product/get/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('http://localhost:3000/api/product/create', product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>('http://localhost:3000/api/product/update', product);
  }

  deleteProduct(id: string): Observable<Product> { 
    return this.http.delete<Product>(`http://localhost:3000/api/product/delete/${id}`);
  }
}
