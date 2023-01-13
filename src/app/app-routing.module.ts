import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path:'' , redirectTo:'/login' , pathMatch:'full'},
  {path:'/login' , component:LoginComponent},
  {path:'/dashboard' , component:DashboardComponent},
  {path:'/products' , component:ProductsComponent},
  {path:'/add-products' , component:AddProductsComponent},
  {path:'/register' , component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
