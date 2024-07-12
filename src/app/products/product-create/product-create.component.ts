
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../../product';
import { AuthService } from '../../auth/auth.service';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-product-create',
  templateUrl: `./product-create.component.html`,
  styleUrl: './product-create.component.css',
})
export class ProductCreateComponent { 
  @Output() added = new EventEmitter<Product>();

  
  get name() { return this.productForm.controls['name'] }
  get price() { return this.productForm.controls['price'] }

  constructor(private productService: ProductsService, public authService: AuthService) { }

  productForm: FormGroup = new FormGroup({
    name: new FormControl('', {nonNullable: true}),
    price: new FormControl<number | undefined>(undefined, {nonNullable: true}),
  })


  createProduct() {
    this.productService.addProduct(this.name.value, Number(this.price.value)).subscribe(
      product => {
        this.productForm.reset();
        this.added.emit(product)

        }
    )
  }

}
