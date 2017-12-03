import { Component,OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import {Item} from '../shopping-cart.service';
import { ProductsService} from '../products.service'


/**
 * Defines the component responsible to manage the shopping cart page.
 */
@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit{
  // TODO: À compléter
  items=[];
  productsMap=[];

  constructor(private ShoppingCartService:ShoppingCartService,private ProductsService: ProductsService) { }
  

  ngOnInit() {
    this.getItems();
  }

  getItems():void{
    this.ShoppingCartService.getItems().then(items =>{
      this.items = items;
      console.log("Items : " + this.items);
      function getItemAssociatedWithProduct(productId) {
        return items.find(function(item) {
          return item.productId === productId;
        });
      }
      this.ProductsService.getProducts('price-asc','all').then(products =>{
        this.productsMap = products.map(function(product){
          var item = getItemAssociatedWithProduct(product.id);
          console.log('Item():'+ item);
          console.log('product():'+ product);
          return {
            product: product,
            quantity: item.quantity,
            total: product.price * item.quantity
          };
        });
      });
    });
  }
}
