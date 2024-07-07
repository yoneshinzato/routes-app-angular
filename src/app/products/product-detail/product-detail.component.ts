import { Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../../product';
import { Observable, switchMap } from 'rxjs';
import { ProductsService } from '../products.service';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit, OnChanges {
  @Input() name = "";
  @Input() product: Product | undefined;
  @Output() bought = new EventEmitter<string>();
  today = new Date()
  @Input() id = -1;
  product$: Observable<Product> | undefined;
  @Output() deleted = new EventEmitter();

  constructor(private productService: ProductsService, public authService: AuthService, private activatedRoute: ActivatedRoute) {
    console.log(`Name is ${this.name} in the constructor`);
  }

  ngOnInit(): void {
    this.product$ = this.activatedRoute.paramMap.pipe(
      switchMap(params => {
        return this.productService.getProduct(Number(params.get('id')))
      })
    )
}

ngOnChanges(changes: SimpleChanges): void {
  const product = changes['product'];
  this.product$ = this.productService.getProduct(this.id);
  }

  buy() {
    this.bought.emit(this.name);
  }

  get productName(): string {
    console.log(`Get ${this.name}`)
    return this.name
  }

  changePrice(product: Product, price: number) {
    this.productService.updateProduct(product.id, price).subscribe(() => {
      alert(`You have just changed ${product.name} price!`);
    });
  }

  removeProduct(product: Product) {
    this.productService.deleteProduct(product.id).subscribe(() => {
      this.deleted.emit();
    })
  }

}
