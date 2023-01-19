import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  show:boolean = false
  constructor(private router:Router , private toast:NgToastService) { }

  ngOnInit(): void {
    this.adminLogIn()
  }

  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
    this.toast.info({detail:"Logged out",summary:"Logged out successfully", duration:3000})
  }

  adminLogIn(){
    // debugger
    let admin = localStorage.getItem('token')
    if(admin){
      this.show = true
    }else{
      this.show = false
    }    
    console.log(admin)
  }

}
