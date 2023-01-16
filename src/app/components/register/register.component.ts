import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email:string=''
  password:string=''

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }

  register(){
    if(this.email == ''){
      alert("please Enter Email")
    }
    if(this.password == ''){
      alert("Please Enter Password")
    }
    this.auth.register(this.email , this.password);
    this.email =''
    this.password =''
  }

  signInWithGoogle(){
  console.log("signed in")
  this.auth.signInGoogle();
}

}
