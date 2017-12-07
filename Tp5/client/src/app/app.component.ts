import { Component,OnInit,Pipe, PipeTransform,OnDestroy } from '@angular/core';
import {ItemsCountService} from './items-count.service';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from './shopping-cart.service';

/**
 * Defines the main component of the application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit,OnDestroy{

  subscription:Subscription;
  count:any;

  // TODO: Modifier le nom des auteurs pour vos noms
  readonly authors = [
    'Antoine Béland',
    'Konstantinos Lambrou-Latreille'
  ];

  // TODO: À compléter

  constructor(private ShoppingCartService:ShoppingCartService,private ItemsCountService:ItemsCountService){
    this.ShoppingCartService.getItems().then(items =>{
      items.forEach(item => {
         this.count += item.quantity;
      });
    })
  }

  ngOnInit(){
    
    this.ItemsCountService.getCount().subscribe(count =>{this.count = count;console.log('count : '+ JSON.stringify(count))});

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  
}

@Pipe({name: 'frenchFormat'})
export class frenchFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (value == null) {
      return null;
    } else {
      return value.toFixed(2).replace('.', ',') + '';
    }
  }
}
