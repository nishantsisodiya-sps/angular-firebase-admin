import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup, FormBuilder } from '@angular/forms';
import { finalize } from 'rxjs';
import { FileMetaData, fileData } from 'src/app/model/product';
import { ProductManageService } from 'src/app/shared/product-manage.service';


@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  myFiles !: FormGroup
  selectedFiles !: FileList;
  currentFileUpload !: FileMetaData;
  percentage: number = 0;

  listOfFiles: FileMetaData[] = [];
  data: fileData[] = []

  filedata: fileData = {
    id: '',
    names: '',
    price: '',
    discount: '',
    url: '',

  }
  constructor(private productsManage: ProductManageService, private firestorage: AngularFireStorage
    , private firestore: AngularFirestore, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.myFiles = this.formBuilder.group({
      names: [''],
      price: [''],
      discount: [''],
      url: [''],
    })
    this.getAllFiles()
  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  uploadFile() {
    this.currentFileUpload = new FileMetaData(this.selectedFiles[0])
    const path = '/upload' + this.currentFileUpload.file.name;

    const storageRef = this.firestorage.ref(path);
    const uploadTask = storageRef.put(this.selectedFiles[0])

    uploadTask.snapshotChanges().pipe(finalize(() => {
      storageRef.getDownloadURL().subscribe(downloadLink => {
        // Uploading image values
        this.currentFileUpload.url = downloadLink,
        this.currentFileUpload.names = this.currentFileUpload.file.name
        
        // Uploading form values
        this.currentFileUpload.id = '';
        this.currentFileUpload.names = this.myFiles.value.names;
        this.currentFileUpload.price = this.myFiles.value.price;
        this.currentFileUpload.discount = this.myFiles.value.discount;
        this.productsManage.saveDataOfFile(this.currentFileUpload);
        
      
      })
    })
    ).subscribe((res: any) => {
      // Percentage bar
      this.percentage = (res.bytesTransferred * 100 / res.totalBytes)
      console.log(this.currentFileUpload)
    }, err => {
      console.log("Error Occured")
    })
  }


  // Getting all files in inputs
  getAllFiles() {
    this.productsManage.getAllFiles().subscribe(res => {
      this.listOfFiles = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data
      })
    }, err => {
      console.log("Error occured while fetching files")
    })
  }


  // Delete files method
  deleteFile(file: FileMetaData) {
    if (window.confirm('Are you sure you want to delete ' + file.names + '?')) {
      this.productsManage.deleteFile(file);
      this.ngOnInit()
    }
  }

}