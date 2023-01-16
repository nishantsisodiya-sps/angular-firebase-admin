import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import {AngularFireModule} from '@angular/fire/compat'
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { FormsModule } from '@angular/forms';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { UsersComponent } from './components/users/users.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductsComponent,
    DashboardComponent,
    AddProductsComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    UsersComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
