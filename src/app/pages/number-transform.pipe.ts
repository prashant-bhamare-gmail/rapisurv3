import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberTransform'
})
export class NumberTransformPipe implements PipeTransform {

  constructor() { }

   transform(number : any){
    if (number == '-') return '-'
    else {
      let hasMinus = String(number).charAt(0) === '-' ? true:false;
      number =  String(number).charAt(0) === '-' ?
              + String(number).substring(1, number.length)  : number;
          if(number <= 999){
            number = number.toFixed(2) ;
          }
          else if(number >= 1000 && number <= 999999){
            number = (number / 1000).toFixed(2) + 'K';
          }
          else if(number >= 1000000 && number <= 999999999){
            number = (number / 1000000).toFixed(2) + 'M';
          }
          else if(number >= 1000000000 && number <= 999999999999){
            number = (number / 1000000000).toFixed(2) + 'B';
          }
          if(hasMinus){
            return '-'+number;
          }else
          {
            return number;
          }
    }
    }

}