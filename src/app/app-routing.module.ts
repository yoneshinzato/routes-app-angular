import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ProductListComponent } from './products/products-list/products-list.component';
import { authGuard } from './auth/auth.gard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CheckoutGuard } from './auth/checkout.guard';

const routes: Routes = [
  { path: 'cart', 
    component: CartComponent,
    canActivate: [authGuard] ,
    canDeactivate: [CheckoutGuard]
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule
  )},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
