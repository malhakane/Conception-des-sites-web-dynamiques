import { Injectable,EventEmitter } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ItemsCountService {
  private subject = new Subject<any>();
  
     sendCount(count: number) {
         this.subject.next(count );
     }
  
     clearCount() {
         this.subject.next();
     }
  
     getCount(): Observable<any> {
         return this.subject.asObservable();
     }

}
