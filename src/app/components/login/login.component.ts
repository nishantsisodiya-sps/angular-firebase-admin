import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  userLogin!: FormGroup;

  constructor(private auth:AuthService , public sidenav:SidenavComponent , private fb:FormBuilder) { }

  ngOnInit(): void {
    this.userLogin = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(6)]]
    })
  }

   login(email:string , password:string){
    if(email == '' || password == ''){
      alert("please fill fields")
    }else if(this.email == 'nishantsisodiya.softprodigy@gmail.com' && this.password == '123456'){
   let mylogin = new Promise<void>((resolve, reject) => {
     resolve(this.auth.login(this.email , this.password)) 
   }) 

   mylogin.then(()=>{
    this.sidenav.show=true
   })
  }else{
    alert("Please enter correct Email and Password")
  }
  }


}
