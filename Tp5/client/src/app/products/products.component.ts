import { Component } from '@angular/core';
import{ProductsService} from '../products.service'
import {Product}  from '../products.service'
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
/**
 * Defines the component responsible to manage the display of the products page.
 */
@Component({
  selector: 'products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit{
  // TODO: À compléter
  products:Product[];

  category:string='all';
  criteria:string='price';

  constructor(private ProductsService: ProductsService){}

  ngOnInit(){
    this.getProducts();
  }

  getProducts():void {
    this.ProductsService.getProducts('price-asc','all').then((products) =>{
        this.products = products;
        console.log(this.products);
      });    
  }

  onSelected(event){
    console.log(event.target.textContent);
  }
  
}
