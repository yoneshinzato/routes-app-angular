
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../../product';
import { AuthService } from '../../auth/auth.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-product-create',
  templateUrl: `./product-create.component.html`,
  styleUrl: './product-create.component.css',
})
export class ProductCreateComponent { 
  @Output() added = new EventEmitter<Product>();

  

  constructor(private productService: ProductsService, public authService: AuthService, private formBuilder: FormBuilder) { }

  productForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: Validators.required
    }),
    price: new FormControl<number | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)]
    })
  });

  private buildForm() {
    this.productForm = this.formBuilder.nonNullable.group({
      name: this.formBuilder.nonNullable.control(''),
      price: this.formBuilder.nonNullable.control<number | undefined>(undefined, {})
    })
  }

  get name() { return this.productForm?.controls['name'] }
  get price() { return this.productForm?.controls['price'] }


  createProduct() {
    this.productService.addProduct(this.name.value, Number(this.price.value)).subscribe(
      product => {
        this.productForm.reset();
        this.added.emit(product)

        }
    )
  }

}
