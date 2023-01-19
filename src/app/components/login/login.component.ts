import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string = ''
  password:string = ''

  constructor(private auth:AuthService , private router:Router , private toast:NgToastService) { }

  ngOnInit(): void {
    
  }

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
    
  }

  

}
