import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PortfolioService} from '../../../shared/services/public-api';

@Component({
  selector: 'app-layout-dialog',
  templateUrl: './layout-dialog.component.html',
  styleUrls: ['./layout-dialog.component.scss']
})
export class LayoutDialogComponent implements OnInit {
  filterButton: string[] = ['Column Selection']
  // 'Sort Order', 'Filter'
  isActiveButton: string = 'Column Selection';
  columnsFilterList: any;
  dialogName: string = '';
  message: string = ''
  inputValue: string = '';
  calledFrom: string = '';
  row: any;
  selectedOption: string = 'Current'; // Set the default value to 'option1'
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<any>, public dashboardService: PortfolioService) { }

  ngOnInit(): void {
    this.dialogName = this.data?.name
    this.columnsFilterList = this.data?.filterColumns
    this.message = this.data?.message
    this.calledFrom = this.data?.calledFrom
    this.onOptionSelected({ value: this.selectedOption });
  }

  noSort() {
    return 0;
}


  onOptionSelected(event: any) {
    const selectedValue = event.value;
    this.dashboardService.dialogValue = selectedValue;
  }

  toggleColumnVisibility(column: any, event: any) {
    event.stopPropagation()
    event.stopImmediatePropagation()  
  }

  isClicked(btn: any) {
    this.isActiveButton = btn
  }

  onSave() {
    this.dialogRef.close(this.inputValue)
  }
  onClose() {
    // this.dialogRef.close(this.onOptionSelected({ value: this.selectedOption, columnData : this.columnsFilterList }))
    this.dialogRef.close(this.columnsFilterList)

  }
}