import { Component,OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import {Item} from '../shopping-cart.service';
import { ProductsService} from '../products.service';
import {Product}  from '../products.service'


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
  total =0;
  isValid = false;



  constructor(private ShoppingCartService:ShoppingCartService,private ProductsService: ProductsService) { }
  

  ngOnInit() {
    this.getItems().then(datas => {this.productsMap=datas;});
    this.getTotalAmount();
  }

  getItems():Promise<{product: any; quantity: any; total: number; }[]>{
    return Promise.all([this.ProductsService.getProducts("alpha-asc",'all'), this.ShoppingCartService.getItems()]).then(values =>{
      function getItemAssociatedWithProduct(productId) {
        return values[1].find(function(item) {
          return item.productId === productId;
        })
      }
      return values[0].filter(function(product) {
        return getItemAssociatedWithProduct(product.id) !== undefined;
      }).map(function(product) {
        var item = getItemAssociatedWithProduct(product.id);
        return {
          product: product,
          quantity: item.quantity,
          total: product.price * item.quantity
        }; 
      });
     
    });
  };

  getTotalAmount():void {
    this.getItems().then(items =>{
      items.forEach(item => {
        if(item){
          this.total +=item.total;
        }
      });
    })
  }

  removeItem(id:number):void {
    this.ShoppingCartService.deleteItem(id).then(()=>{
      this.total =0;
      this.getItems().then(datas =>{
        this.total =0; 
        this.productsMap=datas;
      });
      this.getTotalAmount();
    });
  }

  updateQuantity(id:number,direction:number):void {
    this.ShoppingCartService.updateQunatity(id,direction).then(()=>{     
      this.getItems().then(datas =>{
        this.total =0; 
        this.productsMap=datas;
        this.getTotalAmount();
      });
      
    });
  }

  deleteAllItems():void{
    this.ShoppingCartService.deleteItems().then(()=>{
      this.getItems().then(datas => {
        this.total =0; 
        this.productsMap=datas;
        this.getTotalAmount();
      }); 
    });
  }

  isValidForm(quantity:number) {
    
    if(quantity > 1){
      return false;
    }else{
      return true;
    }
  }
}
