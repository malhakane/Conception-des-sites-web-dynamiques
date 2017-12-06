import { Component, OnInit } from '@angular/core';
import {Order } from '../order.service';
import { ShoppingCartService } from '../shopping-cart.service';
import {Item} from '../shopping-cart.service';
import {OrderService} from '../order.service';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
declare const $: any;

/**
 * Defines the component responsible to manage the order page.
 */
@Component({
  selector: 'order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  orderForm: any;
  order ={'id':0,
          "firstName":'',
          "lastName":'',
          'email':'',
          'phone':'',
          'products':[] 
        };


  constructor(private router: Router,private ShoppingCartService:ShoppingCartService,private OrderService:OrderService){}

  /**
   * Occurs when the component is initialized.
   */
  ngOnInit() {
    // Initializes the validation of the form. This is the ONLY place where jQuery usage is allowed.
    this.orderForm = $('#order-form');
    $.validator.addMethod('ccexp', function(value) {
      if (!value) {
        return false;
      }
      const regEx = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[1-9][0-9])$/g;
      return regEx.test(value);
    }, 'La date d\'expiration de votre carte de crédit est invalide.');
    this.orderForm.validate({
      rules: {
        'phone': {
          required: true,
          phoneUS: true
        },
        'credit-card': {
          required: true,
          creditcard: true
        },
        'credit-card-expiry': {
          ccexp: true
        }
      }
    });

    //this.getItems();
  }

  /**
   * Submits the order form.
   */
  submit() {
    if (!this.orderForm.valid()) {
      return;
    }
    // TODO: Compléter la soumission des informations lorsque le formulaire soumis est valide.
    console.log('Order : '+ JSON.stringify(this.order));
    this.ShoppingCartService.getItems().then(items => {
      this.order.products = items;
      console.log('Items : '+items);
      this.OrderService.addOrder(this.order);
      this.router.navigate(['/confirmation']);},(error) => { return;});
  }
}
