import { Injectable } from '@angular/core'; 
import {  BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ImageService {
  // image = new BehaviorSubject('');
  image = new BehaviorSubject({qs: '', client: ''});
  constructor() { }

  changeEmitted$ = this.image.asObservable();

  addImage(product) {
    let newState = this.image.getValue();
    // console.log('newState', product);
    // console.log('product', product);
    newState.qs = product.qs;
    newState.client = product.client;
   // {qs: '', client: ''}
    this.image.next(newState); 
  } 

  clearimage() {
    this.image.next({qs: '', client: ''});
  }

}