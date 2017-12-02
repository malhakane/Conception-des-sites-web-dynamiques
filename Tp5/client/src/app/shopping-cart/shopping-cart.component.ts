import { Component,OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import {Item} from '../shopping-cart.service'

/**
 * Defines the component responsible to manage the shopping cart page.
 */
@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit{
  // TODO: À compléter
  items:Item[];

  constructor(private ShoppingCartService:ShoppingCartService) { }
  

  ngOnInit() {
    this.getItems();
  }

  getItems():void{
    this.ShoppingCartService.getItems().then(items =>{
      this.items = items;
      console.log("Items : " + items);
    });
  }
}
