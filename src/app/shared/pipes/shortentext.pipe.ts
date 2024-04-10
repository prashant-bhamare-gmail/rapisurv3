import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenText'
})
export class ShortenTextPipe implements PipeTransform {

  transform(value: string, limit: number = 50, trail: string = '...'): string {
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }

}