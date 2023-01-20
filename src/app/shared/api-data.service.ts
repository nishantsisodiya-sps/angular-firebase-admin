import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { users } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  show: boolean =false
  
  get getshow(): boolean{
    return this.show
  }

  constructor( private http:HttpClient , private fireStore : AngularFirestore) { }

  getProducts():Observable<any>{
    return this.http.get<any>('https://dummyjson.com/products');
  }

  addUser(user : users){
    user.id = this.fireStore.createId();
    return this.fireStore.collection('/users').add(user);
  }

  getAllUsers(){
    return this.fireStore.collection('/users').snapshotChanges();
  }

  deleteUser(user:users){
    return this.fireStore.doc('/users/' +user.id).delete()
  }
  }
