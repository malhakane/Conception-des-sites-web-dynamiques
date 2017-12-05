import { Component,OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import {Item} from '../shopping-cart.service';
import { ProductsService} from '../products.service';
import {Product}  from '../products.service';
import {Popup} from 'ng2-opd-popup';


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
  idToDelete = 0;

  

  constructor(private ShoppingCartService:ShoppingCartService,
    private ProductsService: ProductsService,
    private popup1:Popup,
    private popup2:Popup) { }
  

  ngOnInit() {
    this.getItems().then(datas => {
      this.productsMap=datas;
      this.AnyProductInChart();});
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
    this.idToDelete = id;
    this.popup1.options = {
      header: "Suppression Produit",
      color: "#14597f", // red, blue.... 
      widthProsentage: 60, // The with of the popou measured by browser width 
      animationDuration: 1, // in seconds, 0 = no animation 
      showButtons: true, // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "OK", // The text on your confirm button 
      cancleBtnContent: "NO", // the text on your cancel button 
      animation: "fadeInDown" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
  };
    this.popup1.show();
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
    this.popup2.options = {
      header: "Suppression des Produits",
      color: "#14597f", // red, blue.... 
      widthProsentage: 60, // The with of the popou measured by browser width 
      animationDuration: 1, // in seconds, 0 = no animation 
      showButtons: true, // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "OK", // The text on your confirm button 
      cancleBtnContent: "NO", // the text on your cancel button 
      animation: "fadeInDown" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };
    this.popup2.show();
  }

  isValidForm(quantity:number) {
    
    if(quantity > 1){
      return false;
    }else{
      return true;
    }
  }

  AnyProductInChart(){
    console.log("productsMap : " + this.productsMap.length);
    if(this.productsMap.length === 0){
      return true;
    }else{
      return false;
    }
  }
  
  Ok1(){
    this.ShoppingCartService.deleteItem(this.idToDelete).then(()=>{
      this.total =0;
      this.getItems().then(datas =>{
        this.total =0; 
        this.productsMap=datas;
        //this.AnyProductInChart();
      });
      this.getTotalAmount();
      this.popup1.hide();
      
    });
    
  }

  Ok2(){
    this.ShoppingCartService.deleteItems().then(()=>{
      this.getItems().then(datas => {
        this.total =0; 
        this.productsMap=datas;
        this.getTotalAmount();
        this.popup2.hide();
        //this.AnyProductInChart();
      }); 
    });
  }


}
