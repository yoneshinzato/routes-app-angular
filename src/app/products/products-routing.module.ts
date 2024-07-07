import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './products-list/products-list.component';

const routes: Routes = [
  { path: 'products', component: ProductListComponent }
];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class ProductsRoutingModule { }