import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { Product } from '../product';
import { CartService } from './cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',

})
export class CartComponent implements OnInit {

  cartForm = new FormGroup({
    products: new FormArray<FormControl<number>>([])
  });

  cart: Product[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  this.cart = this.cartService.cart;
  this.cart.forEach(() => {
    this.cartForm.controls.products.push(
      new FormControl(1, { nonNullable: true })
    );
  });
}
 }
