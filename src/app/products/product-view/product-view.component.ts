import { ChangeDetectionStrategy, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ProductViewService } from './product-view.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductViewService]
})
export class ProductViewComponent implements OnInit, OnDestroy { 
  private productSub = new Subject<void>();

  @Input() id = -1;
  name = "";
  constructor(private productViewService: ProductViewService) {}

  ngOnInit(): void {	
    this.getProduct();
  }
  private getProduct() {

    this.productViewService.getProduct(this.id).pipe(
      takeUntil(this.productSub)
    ).subscribe(product => {
        if (product) {
            this.name = product.name;
        }
    });
}

  ngOnDestroy(): void {
    this.productSub.next();
    this.productSub.complete();
}
}
