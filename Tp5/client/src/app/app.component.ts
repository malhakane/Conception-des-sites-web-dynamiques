import { Component,OnInit,Pipe, PipeTransform } from '@angular/core';

/**
 * Defines the main component of the application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{

  // TODO: Modifier le nom des auteurs pour vos noms
  readonly authors = [
    'Antoine Béland',
    'Konstantinos Lambrou-Latreille'
  ];

  // TODO: À compléter

  ngOnInit(){


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
