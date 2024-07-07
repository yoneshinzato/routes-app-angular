import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductsService } from '../products.service';
import { Product } from '../../product';

@Component({
  selector: 'app-product-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],

})
export class ProductListComponent implements OnInit {
  
  selectedProduct: Product | undefined;
  products: Product[] | undefined;


  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

onBuy() {
    window.alert('You just bought ${this.selectedProduct?.name}!');
}

private getProducts() {
  this.productService.getProducts().subscribe(products => this.products = products);
}

onAdd(product: Product) {
  this.products?.push(product);
}

onDelete() {
  this.products =this.products?.filter(product => product !== this.selectedProduct);
  this.selectedProduct = undefined;
}

}
