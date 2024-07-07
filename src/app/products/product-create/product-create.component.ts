import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../../product';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-product-create',
  templateUrl: `./product-create.component.html`,
  styleUrl: './product-create.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCreateComponent { 
  @Output() added = new EventEmitter<Product>()

  constructor(private productService: ProductsService, public authService: AuthService) { }

  createProduct(name: string, price: number) {
    this.productService.addProduct(name, price).subscribe(product => this.added.emit(product))
  }
}
