import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Product } from '../product';
import { HttpClient, HttpHeaders } from '@angular/common/http';


interface ProductDTO {
  id: number;
  title: string;
  price: number; 
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) { }


  getProducts(): Observable<Product[]> {
    // const options = {
    //   headers: new HttpHeaders({Authorization: "myAuthToken"})
    // }
    return this.http.get<ProductDTO[]>(this.apiUrl).pipe(
      map(products => products.map(product => {
        return this.convertToProduct(product);
      }))
    );
  }

  private convertToProduct(productDTO: ProductDTO): Product {
    return {
      id: productDTO.id,
      name: productDTO.title,
      price: productDTO.price
    }
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<ProductDTO>(`${this.apiUrl}/${id}`).pipe(
      map(productDTO => this.convertToProduct(productDTO))
    )
  }

  addProduct(name: string, price: number): Observable<Product> {
    return this.http.post<ProductDTO>(this.apiUrl, {
      title: name,
      price: price
    }).pipe(map(product => this.convertToProduct(product)))
  }

  updateProduct(id: number, price: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}`, { price: price })
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }

}
