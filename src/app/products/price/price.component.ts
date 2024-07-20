import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrl: './price.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceComponent { 
  price: number | undefined;
}
