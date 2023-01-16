import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  show: boolean = false

  constructor(private fireAuth:AngularFireAuth , private router:Router) { }

  //login method

  login(email:string , password:string){
    this.fireAuth.signInWithEmailAndPassword(email,password).then(res =>{
      localStorage.setItem('token', 'true')

      if(res.user?.emailVerified == true){
        this.router.navigate(['/dashboard'])
        
      }else{
        this.router.navigate(['/verify-email'])
      }


    },err=>{
      console.log("Something went wrong");
      this.router.navigate(['/login'])
    })
  }


  //Register user

  register(email:string , password:string ){
    this.fireAuth.createUserWithEmailAndPassword(email , password).then(res=>{
        this.router.navigate(['/login'])
        this.sendEmailForVarification(res.user);
    },err=>{
      console.log("something went wrong")
      this.router.navigate(['/register'])
    })
  }


  //Logout

  logout(){
    this.fireAuth.signOut().then(()=>{
      localStorage.removeItem('token')
      this.router.navigate(['/login'])
    },err=>{
      console.log(err.message)
    })
  }



  //Google signIn

  signInGoogle(){
    return this.fireAuth.signInWithPopup(new GoogleAuthProvider).then(res=>{
      this.router.navigate(['/home'])
      localStorage.setItem('token' , JSON.stringify(res.user?.uid))
    },err=>{
      console.log(err.message);
    })
  }


  //forgot password

  forgotPassword(email:string){
    this.fireAuth.sendPasswordResetEmail(email).then(()=>{
      this.router.navigate(['/verify-email'])
    },err=>{
      console.log("Something went wrong")
    })
  }


  //send Email varification link

  sendEmailForVarification(user:any){
    user.sendEmailVerification().then((res:any)=>{
      this.router.navigate(['/verify-email'])
    },(err:any)=>{
      alert("something went wrong")
    })
  }
}
