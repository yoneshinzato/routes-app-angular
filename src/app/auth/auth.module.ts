import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule, 
    BrowserModule,
    HttpClientModule,
    MatButtonModule
  ],
  exports: [AuthComponent]
})
export class AuthModule { }
