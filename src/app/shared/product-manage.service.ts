import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {AngularFireStorage} from '@angular/fire/compat/storage'
import { fileData, FileMetaData } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductManageService {

  constructor(private firestore:AngularFirestore , private firestorage:AngularFireStorage) { }

  //save data
  saveDataOfFile(fileObj : FileMetaData){

    const fileMeta = {
      id : '' ,
      names : fileObj.names,
      price : fileObj.price,
      discount : fileObj.discount,
      url : fileObj.url,   
    }
    fileMeta.id = this.firestore.createId();
    this.firestore.collection('/upload').add(fileMeta);
  }

  getAllFiles(){
    return this.firestore.collection('/upload').snapshotChanges();
  }

  deleteFile(fileMeta:fileData){
    this.firestore.collection('/upload').doc(fileMeta.id).delete()
    this.firestorage.ref('/upload' + fileMeta.names).delete()
  }

  addProducts(fileMeta:fileData){
    fileMeta.id = this.firestore.createId();
    return this.firestore.collection('/upload').add(fileMeta)
  }
}