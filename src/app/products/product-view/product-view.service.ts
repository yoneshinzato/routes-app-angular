import { Injectable } from '@angular/core';

import { ProductsService } from '../products.service';
import { Observable, mergeMap, of, switchMap } from 'rxjs';
import { Product } from '../../product';

@Injectable()
export class ProductViewService {

  private product: Product | undefined;

  constructor(private productService: ProductsService) { }

  getProduct(id: number): Observable<Product> {

    return this.productService.getProducts().pipe(
      mergeMap((products) => {
        if(!this.product) {
          this.product = products[id];
        }
        return of(this.product)
      })
    )

  }

}
