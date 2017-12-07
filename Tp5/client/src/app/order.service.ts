import { Injectable } from '@angular/core';
import { Product } from './products.service';
import { Http,RequestOptions,Headers } from '@angular/http';
import { Config } from './config';
import {Item} from './shopping-cart.service';

export class Order{
  id:number;
  firstName:string;
  lastName:string;
  email:string;
  phone:string;
  products:Item[];
}

@Injectable()
export class OrderService {

  /**
   * Handles the current error.
   *
   * @param error                   The error to handle.
   * @return {Promise<object>}      A promise object.
   */
  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.feedbackMessage || error);
  }

  constructor(private http: Http) { }

  addOrder(order:Order):Promise<void> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    // ***** Il est nécessaire de mettre la propriété "withCredientials" à TRUE. *****
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    let url = `${Config.apiUrl}/orders/`;
    return this.http.post(url,order,options)
      .toPromise()
      .then() 
      .catch(()=>null);
  }

}
