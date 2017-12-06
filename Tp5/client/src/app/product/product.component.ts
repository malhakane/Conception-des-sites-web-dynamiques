import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Product}  from '../products.service'
import{ProductsService} from '../products.service'
import { ShoppingCartService } from '../shopping-cart.service';
import {Item} from '../shopping-cart.service';
import {ItemsCountService} from '../items-count.service'

/**
 * Defines the component responsible to manage the product page.
 */
@Component({
  selector: 'product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  product:Product;
  item:Item ={"productId":1,'quantity':1};

  /**
   * Initializes a new instance of the ProductComponent class.
   *
   * @param route                   The active route.
   */
  constructor(private route: ActivatedRoute,
    private ProductService:ProductsService,
    private ShoppingCartService:ShoppingCartService,
    private ItemsCountService:ItemsCountService) { }

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
      this.item.productId = Product.id; 
    });
  }

  submit():void {
    console.log('Item : ' + this.item.productId);
    this.ShoppingCartService.addItem(this.item).then(() =>{
      this.ShoppingCartService.getItems().then(items =>{
        var itemsNumber=0;
        items.forEach(item => {
          itemsNumber +=item.quantity;
        });
        this.ItemsCountService.sendCount(itemsNumber);
      });  
    });
  }
}
