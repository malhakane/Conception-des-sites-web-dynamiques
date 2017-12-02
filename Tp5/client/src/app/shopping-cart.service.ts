import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from './config';


/**
 * Defines a product.
 */
export class Item  {
  productId:number;
  quantity:number;

  /*toJson(){
    return {
      productId : this.productId,
      quantity : this.quantity
    };
  }*/
}

@Injectable()
export class ShoppingCartService {

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

  /**
   * Initializes a new instance of the ProductsService class.
   *
   * @param http                    The HTTP service to use.
   */
  constructor(private http: Http) {}

  /**
   * Gets the product associated with the product ID specified.
   *
   * @param item               The item to store in database.
   * @returns {Promise<null>}    A promise that contains null.
   */
  addItem(item:Item):Promise<null> {
    const url = `${Config.apiUrl}/shopping-cart/`;
    return this.http.post(url,item)
      .toPromise()
      .then()
      .catch(() => null);
    
  }

  deleteItem(productId:number):Promise<null> {
    const url = `${Config.apiUrl}/shopping-cart/${productId}`;
    return this.http.delete(url)
      .toPromise()
      .then()
      .catch(()=>null);
  }

  getItems():Promise<Item[]> {
    const url = `${Config.apiUrl}/shopping-cart/`;
    return this.http.get(url)
      .toPromise()
      .then(items => items.json() as Item[])
      .catch(() => null);
  }

}
