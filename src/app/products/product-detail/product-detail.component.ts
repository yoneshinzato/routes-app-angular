import { Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../../product';
import { Observable, switchMap, of, filter } from 'rxjs';
import { ProductsService } from '../products.service';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../cart/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { PriceComponent } from '../price/price.component';


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

  constructor(
    private productService: ProductsService, 
    public authService: AuthService, 
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private dialog: MatDialog
  ) {
    console.log(`Name is ${this.name} in the constructor`);
  }

  ngOnInit(): void {
    this.product$ = this.activatedRoute.data.pipe(
      switchMap(data => of(data['product']))
    )
}

ngOnChanges(changes: SimpleChanges): void {
  this.product$ = this.productService.getProduct(this.id);
  }

  buy(product: Product) {
    this.cartService.addProduct(product);
  }

  get productName(): string {
    console.log(`Get ${this.name}`)
    return this.name
  }

  changePrice(product: Product) {
;
    this.dialog.open(PriceComponent, {
      data: product.price
    }).afterClosed().pipe(
      filter(price => !!price),
      switchMap(price => this.productService.updateProduct(product.id, price))
    ).subscribe(() => {
      alert(`You have just changed ${product.name} price!`);
    })
    
  }

  removeProduct(product: Product) {
    this.productService.deleteProduct(product.id).subscribe(() => {
      this.deleted.emit();
    })
  }

}
