export interface Product {
    id: number ,
    title: string ,
    description: string, 
    price: number ,
    discountPercentage: number, 
    rating: number ,
    stock: number ,
    brand: string,
    category: string ,
    thumbnail: string,
    quantity : undefined | number
    productId:undefined|number
};


export class FileMetaData {
    id : string ='';
    names : string = '';
    price : string = '';
    discount : string='';
    url : string = '';
    file : File;
    

    constructor(file : File) {
      this.file = file;
    }
}

export interface fileData {
  id : string 
  names : string 
  price : string 
  discount : string
  url : string 
}