import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  menuType : string = 'default'
  userName: string =''
  
  constructor(private router:Router , private toast:NgToastService) { }
  
  ngOnInit(): void {
  }

  userLogout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
    this.toast.info({detail:"Logged out",summary:"Logged out successfully", duration:3000})
  }

}
