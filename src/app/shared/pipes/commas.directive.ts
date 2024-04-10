import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[addCommas]',
})
export class CommasDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input') onMouseEnter() {
    let viewValue = this.el.nativeElement.value;
    viewValue = viewValue.replace(/[\,\.\-\+]/g, '');
    if (Number(viewValue)) {
      const plainNumber = viewValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      this.el.nativeElement.value = plainNumber;
    } else {
      this.el.nativeElement.value = '';
    }
  }

}
