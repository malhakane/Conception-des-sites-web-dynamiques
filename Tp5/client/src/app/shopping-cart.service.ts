import { Injectable } from '@angular/core';
import { Http,RequestOptions,Headers } from '@angular/http';
import { Config } from './config';


/**
 * Defines a item.
 */
export class Item  {
  productId:number;
  quantity:number;

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
  addItem(item:Item):Promise<void>{
    const headers = new Headers({ 'Content-Type': 'application/json' });
    // ***** Il est nécessaire de mettre la propriété "withCredientials" à TRUE. *****
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    let url = `${Config.apiUrl}/shopping-cart/`;
    return this.http.post(url,item,options)
      .toPromise()
      .then()
      .catch(()=>null); 
  }

  deleteItem(productId:number):Promise<null> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    // ***** Il est nécessaire de mettre la propriété "withCredientials" à TRUE. *****
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    const url = `${Config.apiUrl}/shopping-cart/${productId}`;
    return this.http.delete(url,options)
      .toPromise()
      .then()
      .catch(()=>null);
  }

  getItems(): Promise<Item[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    // ***** Il est nécessaire de mettre la propriété "withCredientials" à TRUE. *****
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    const url = `${Config.apiUrl}/shopping-cart/`;
    return this.http.get(url,options)
      .toPromise()
      .then(items => items.json() as Item[])
      .catch(() => null);
  }

  updateQunatity(id:number,direction:number):Promise<void> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    // ***** Il est nécessaire de mettre la propriété "withCredientials" à TRUE. *****
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    let url = `${Config.apiUrl}/shopping-cart/${id}`;
    return this.getItem(id).then(item =>{
      if(direction ===1){
        this.http.put(url,{"quantity": item.quantity+1},options).subscribe();
      }
      if(direction ===-1){
        this.http.put(url,{"quantity": item.quantity-1},options).subscribe();
      }
    }).then();
  }

  getItem(id:number):Promise<Item> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    // ***** Il est nécessaire de mettre la propriété "withCredientials" à TRUE. *****
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    let url = `${Config.apiUrl}/shopping-cart/${id}`;
    return this.http.get(url,options)
      .toPromise()
      .then(item =>item.json() as Item)
      .catch(()=> null);
  }

  deleteItems():Promise<null> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    // ***** Il est nécessaire de mettre la propriété "withCredientials" à TRUE. *****
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    const url = `${Config.apiUrl}/shopping-cart/`;
    return this.http.delete(url,options)
      .toPromise()
      .then()
      .catch(()=>null);
  }

}
