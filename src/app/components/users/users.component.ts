import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {FormBuilder , FormGroup , FormControl} from '@angular/forms'
import { NgToastService } from 'ng-angular-popup';
import { users } from 'src/app/model/user';
import { ApiDataService } from 'src/app/shared/api-data.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userDetail !: FormGroup
  user:users [] = []
  
  myUsers : users = {
    id: '',
    name: '',
    email: '',
    contact: '',
    city: '',
  }
  id : string = '';
  name : string = '';
  email : string = '';
  contact : string ='';
  city : string = '';
  index: any;

  
  constructor(private formBuilder:FormBuilder , private fetchApi:ApiDataService 
    ,private toast:NgToastService , private firestore : AngularFirestore) { }
  
    editUserId = ''
  
  ngOnInit(): void {
    this.userDetail = this.formBuilder.group({
      name : [''],
      email : [''],
      contact : [''],
      city : [''],
    })
    this.getAllUsers();
  }

  addUsers(){
    this.myUsers.id = '';
    this.myUsers.name = this.userDetail.value.name;
    this.myUsers.email = this.userDetail.value.email;
    this.myUsers.contact = this.userDetail.value.contact;
    this.myUsers.city = this.userDetail.value.city;

    this.fetchApi.addUser(this.myUsers);
    this.toast.success({detail:"user Added",summary:"User added successfully", duration:3000})
  }

 getAllUsers(){
  this.fetchApi.getAllUsers().subscribe((result:any)=>{
    this.user = result.map((e:any)=>{
      const data = e.payload.doc.data();
      data.id = e.payload.doc.id;
      return data;
    }, (err:any)=>{
      alert("Error while fetching users")
    })
  })
 }

 delete(user:users){
  if(window.confirm('Are you sure ? You want to delete'+ user.name + '?')){
    this.fetchApi.deleteUser(user);
    this.toast.warning({detail:"Deleted",summary:"user Deleted successfully", duration:3000})
  }
 }

 editUser(user:users){
  this.editUserId = user.id
  this.userDetail.controls['name'].setValue(user.name)
  this.userDetail.controls['email'].setValue(user.email)
  this.userDetail.controls['contact'].setValue(user.contact)
  this.userDetail.controls['city'].setValue(user.city)
 }

 update(user: users){
   this.myUsers.id = '';
   this.myUsers.name = this.userDetail.value.name;
   this.myUsers.email = this.userDetail.value.email;
   this.myUsers.contact = this.userDetail.value.contact;
   this.myUsers.city = this.userDetail.value.city;
   this.firestore.doc('/users/' +this.editUserId).update(user) 
   this.toast.success({detail:"Updated",summary:"User Updated successfully", duration:3000})
 }

}
