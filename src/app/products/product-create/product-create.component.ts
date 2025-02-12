
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../../product';
import { AuthService } from '../../auth/auth.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { priceRangeValidators } from '../price-range.directive';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-product-create',
  templateUrl: `./product-create.component.html`,
  styleUrl: './product-create.component.css',
})
export class ProductCreateComponent implements OnInit { 
  @Output() added = new EventEmitter<Product>();
  showPriceRangeHint = false;
  products: Product[] = [];
  products$: Observable<Product[]> | undefined;


  categories = ['Hardware', 'Computers', 'Clothing', 'Software'];

  constructor(private productService: ProductsService, public authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.products$ = this.name.valueChanges.pipe(
      map(name => this.products.filter(product => product.name.startsWith(name)))
    )

      this.productService.getProducts().subscribe(products => {
        this.products = products
      })
  }

  productForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: Validators.required
    }),
    price: new FormControl<number | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required, priceRangeValidators()]
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
