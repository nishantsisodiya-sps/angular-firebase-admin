import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup, FormBuilder, FormControl, Validators, MinLengthValidator } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { ConnectableObservable, finalize } from 'rxjs';
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

  myUrl = ''
  constructor(private productsManage: ProductManageService, private firestorage: AngularFireStorage
, private formBuilder: FormBuilder , private toast:NgToastService) {
     }

  ngOnInit(): void {
    this.myFiles = this.formBuilder.group({
      names: [''],
      price: [''],
      discount: [''],
      url: [''],
    })
    this.getAllFiles()

    this.myFiles = new FormGroup({
      'names' : new FormControl(null , Validators.required),
      'price' : new FormControl(null , [Validators.required, Validators.minLength(3), Validators.maxLength(8) ]),
      'discount' : new FormControl(null , [Validators.required , Validators.minLength(1), Validators.maxLength(4)])
    })
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
        
        // Uploading form values
        this.currentFileUpload.id = '';
        this.currentFileUpload.names = this.myFiles.value.names;
        this.currentFileUpload.price = this.myFiles.value.price;
        this.currentFileUpload.discount = this.myFiles.value.discount;
        this.productsManage.saveDataOfFile(this.currentFileUpload);
        this.toast.success({detail:"Uploaded",summary:"Product uploaded successfully", duration:3000})
      
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


  // Getting all files
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
      this.toast.warning({detail:"Deleted",summary:"Product deleted successfully", duration:3000})
    }
  }

  downloadfile(file : fileData){
   console.log(file.url)
  }

}