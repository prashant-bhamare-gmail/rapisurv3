import {
  A,
  Z,
} from '@angular/cdk/keycodes';
import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  OnInit,
  Renderer2,
  Self,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[thousandSeperator]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ThousandSeperatorDirective),
      multi: true,
    },
  ],
})
export class ThousandSeperatorDirective implements ControlValueAccessor {
  /** implements ControlValueAccessorInterface */
  _onChange: (_: any) => void;

  /** implements ControlValueAccessorInterface */
  _touched: () => void;

  constructor(@Self() private _el: ElementRef, private _renderer: Renderer2) { }

  /** Trata as teclas */
  @HostListener('keyup', ['$event'])
  onKeyDown(evt: KeyboardEvent) {
    const keyCode = evt.keyCode;
    const key = evt.key;
    const rawValue = this._el.nativeElement.value;
    if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105) || keyCode === 8) {

      if(rawValue){
        const value = parseInt(rawValue.replace(/,/g, '')).toLocaleString()
        this._renderer.setProperty(this._el.nativeElement, 'value', value);
        this._onChange(value);
        evt.preventDefault();
      } else {
        this._renderer.setProperty(this._el.nativeElement, 'value', null);
        this._onChange(null);
        evt.preventDefault();
      }
      
    } else {

      const value2 = rawValue.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    
      if (value2) {
        let value3 = parseInt(value2.replace(/,/g, '')).toLocaleString()
        this._renderer.setProperty(this._el.nativeElement, 'value', value3);
        this._onChange(value3);
        evt.preventDefault();
      } else {
        this._renderer.setProperty(this._el.nativeElement, 'value', null);
        this._onChange(null);
        evt.preventDefault();
      }

    }
  }

  @HostListener('blur', ['$event'])
  onBlur() {
    this._touched();
  }

  /** Implementation for ControlValueAccessor interface */
  writeValue(value: any): void {
    this._renderer.setProperty(this._el.nativeElement, 'value', value);
  }

  /** Implementation for ControlValueAccessor interface */
  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  /** Implementation for ControlValueAccessor interface */
  registerOnTouched(fn: () => void): void {
    this._touched = fn;
  }

  /** Implementation for ControlValueAccessor interface */
  setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this._el.nativeElement, 'disabled', isDisabled);
  }
}
