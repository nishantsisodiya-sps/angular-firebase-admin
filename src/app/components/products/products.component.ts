import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ApiDataService } from 'src/app/shared/api-data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products : Product[] = []
  constructor(private fetchApi : ApiDataService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this.fetchApi.getProducts().subscribe(result =>{
      this.products = result.products
    })
    
  }

}
