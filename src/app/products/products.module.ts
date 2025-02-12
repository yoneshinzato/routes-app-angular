import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { ProductListComponent } from './products-list/products-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductsRoutingModule } from './products-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { PriceComponent } from './price/price.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductViewComponent,
    ProductCreateComponent,
    PriceComponent
  ],
  imports: [
    CommonModule,
    ProductComponent,
    BrowserModule,
    HttpClientModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatGridListModule,
    MatDialogModule,
    MatTableModule,

  ],
  exports: [
    ProductListComponent
  ]
})
export class ProductsModule { }
