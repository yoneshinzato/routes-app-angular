import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../products.service';
import { Product } from '../../product';

@Component({
  selector: 'app-product-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductListComponent implements OnInit {

  selectedProduct: Product | undefined;
  products: Product[] = [];
  columnNames = ['name', 'price'];

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  onBuy() {
    window.alert(`You just bought ${this.selectedProduct?.name}!`);
  }

  onAdd(product: Product) {
    this.products.push(product);
  }

  onDelete() {
    this.products = this.products.filter(product => product !== this.selectedProduct);
    this.selectedProduct = undefined;
  }

  private getProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

}