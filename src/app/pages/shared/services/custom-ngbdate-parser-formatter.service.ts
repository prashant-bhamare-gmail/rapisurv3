import { Injectable } from '@angular/core';

import {
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class CustomNgbDateParserFormatterService extends NgbDateParserFormatter {
  parse(value: string): NgbDateStruct {
    if (value) {
      const date = new Date(value);
      return this.toNgbDateStruct(date);
    }
    return null;
  }

  format(date: NgbDateStruct): string {
    if (date) {
      const jsDate = this.toJSDate(date);
      const returnValue = jsDate.toLocaleDateString([], {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      return returnValue;
    }

    return '';
  }

  /**
   * Converts NgbDateStruct into JavaScript Date object.
   * Sets values according to UTC methods.
   *
   * @param {NgbDateStruct} date
   * @returns {Date}
   * @memberof NgbCustomDateFormater
   */
  toJSDate(date: NgbDateStruct): Date {
    const jsDate = new Date();
    if (date) {
      jsDate.setUTCHours(0, 0, 0, 0);
      jsDate.setUTCFullYear(date.year);
      jsDate.setUTCMonth(date.month - 1);
      jsDate.setUTCDate(date.day);
    }
    return jsDate;
  }

  /**
   * Converts JavaScript Date object to NgbDateStruct according to
   * UTC methods.
   *
   * @param {Date} _date
   * @returns {NgbDateStruct}
   * @memberof NgbCustomDateFormater
   */
  toNgbDateStruct(_date: Date): NgbDateStruct {
    const date = _date ? _date : new Date();
    const struct: NgbDateStruct = {
      year: this.toInteger(date.getUTCFullYear()),
      month: this.toInteger(date.getUTCMonth() + 1),
      day: this.toInteger(date.getUTCDate()),
    };
    return struct;
  }

  isNumber(value: any): boolean {
    return !isNaN(this.toInteger(value));
  }

  padNumber(value: number) {
    if (this.isNumber(value)) {
      return `0${value}`.slice(-2);
    } else {
      return '';
    }
  }

  toInteger(value: any): number {
    return parseInt(`${value}`, 10);
  }
}
