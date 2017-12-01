import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Product}  from '../products.service'
import{ProductsService} from '../products.service'

/**
 * Defines the component responsible to manage the product page.
 */
@Component({
  selector: 'product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  product:Product;

  /**
   * Initializes a new instance of the ProductComponent class.
   *
   * @param route                   The active route.
   */
  constructor(private route: ActivatedRoute,private ProductService:ProductsService) { }

  /**
   * Occurs when the component is initialized.
   */
  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    this.getProduct(productId);
    // TODO: Compléter la logique pour afficher le produit associé à l'identifiant spécifié (productId).
  }

  getProduct(productId):void{
    this.ProductService.getProduct(productId).then(Product=>{
      this.product = Product;
      console.log(this.product);
    });
  }
}
