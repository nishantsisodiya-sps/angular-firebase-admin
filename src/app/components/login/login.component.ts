import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiDataService } from 'src/app/shared/api-data.service';
import { AuthService } from 'src/app/shared/auth.service';
import { HeaderComponent } from '../header/header.component';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string = ''
  password:string = ''
 

  constructor(private auth:AuthService , public sidenav:SidenavComponent) { }

  ngOnInit(): void {}

  login(){
    if(this.email == ''){
      alert("Please Enter Email")
    }
    if(this.password == ''){
      alert("Please Enter Password")
    }

    this.auth.login(this.email , this.password);
    this.email = ""
    this.password = ""

    this.sidenav.show = true
    
  }

  

}
