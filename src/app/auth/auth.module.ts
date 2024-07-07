import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule, 
    BrowserModule,
    HttpClientModule,
  ],
  exports: [AuthComponent]
})
export class AuthModule { }
