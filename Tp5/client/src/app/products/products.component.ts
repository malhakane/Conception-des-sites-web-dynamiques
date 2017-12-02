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
  criteria:string='price-asc';

  constructor(private ProductsService: ProductsService){}

  ngOnInit(){
    this.getProducts(this.criteria,this.category);
  }

  getProducts(criteria,category):void {
    this.ProductsService.getProducts(criteria,category).then((products) =>{
        this.products = products;
        console.log(this.products);
      });    
  }

  onSelected(event){
    console.log(event.target.textContent);
    if(event.target.textContent === 'Prix (bas-haut)')
      this.criteria = 'price-asc';
    if(event.target.textContent === 'Prix (haut-bas)')
      this.criteria = 'price-dsc';
    if(event.target.textContent === 'Nom (A-Z)')
      this.criteria = 'alpha-asc';
    if(event.target.textContent === 'Nom (Z-A)')
      this.criteria = 'alpha-dsc';

    if(event.target.textContent === 'Appareils Photo')
      this.category = 'cameras';
    if(event.target.textContent === 'Consoles')
      this.category = 'consoles';
    if(event.target.textContent === 'Ecrans')
      this.category = 'screens';
    if(event.target.textContent === 'Ordinateurs')
      this.category = 'computers';
    if(event.target.textContent === 'Tous les produits')
      this.category = 'all';

    this.getProducts(this.criteria,this.category); 
  }
  
}
