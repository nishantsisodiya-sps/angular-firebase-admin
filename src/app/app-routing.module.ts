import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { UsersComponent } from './components/users/users.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

const routes: Routes = [
  {path:'' , redirectTo:'login' , pathMatch:'full'},
  {path:'login' , component:LoginComponent},
  {path:'dashboard' , component:DashboardComponent},
  {path:'products' , component:ProductsComponent},
  {path:'add-products' , component:AddProductsComponent},
  {path:'register' , component:RegisterComponent},
  {path:'home' , component:HomeComponent},
  {path:'verify-email' , component:VerifyEmailComponent},
  {path:'forgot-password' , component:ForgotPasswordComponent},
  {path:'users' , component:UsersComponent},
  {path:'root' , component:AppComponent},
  {path:'sidenav' , component:SidenavComponent},
  // {path:'header' , component:HeaderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
