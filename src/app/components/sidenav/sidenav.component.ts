import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  show:boolean = false
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.adminLogIn()
  }

  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
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
