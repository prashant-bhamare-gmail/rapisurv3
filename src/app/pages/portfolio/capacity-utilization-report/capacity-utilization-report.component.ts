import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../../shared/services/public-api';

import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpStatusCode } from '@angular/common/http';
import { LayoutDialogComponent } from '../layout-dialog/layout-dialog.component';

@Component({
  selector: 'app-capacity-utilization-report',
  templateUrl: './capacity-utilization-report.component.html',
  styleUrls: ['./capacity-utilization-report.component.scss']
})
export class CapacityUtilizationReportComponent implements OnInit {
  projectId!: number;
  projectDetails: any;
  capacityUtilizationData: any[] = [];
  tableHeaderRow: any[] = [];
  constructor(private dashboardService: PortfolioService,
    private dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.url[1].path)
    this.getProjectDetails()
    this.getCapacityUtilizationData();
  }

  get visibleColumns() {
    return this.tableHeaderRow?.filter((column: any) => column.visible).map((column: any) => column.property)
  }
  trackByProperty<T>(index: number, column: any) {
    return column.property
  }

  openTableDialog(){
    const dialogInstance =  this.dialog.open(LayoutDialogComponent, {
        width: '960px',
        autoFocus: false,
        data: {
        filterColumns : this.tableHeaderRow,
        name: 'LayoutDialog'
        }
    })
}

openCSVDialog() {
    const dialogInstance =  this.dialog.open(LayoutDialogComponent, {
        width: '500px',
        autoFocus: false,
        disableClose: true,
        data: {
        name: 'CSVInputDialog',
        message: 'Enter the file name to save file'
        }
    })
    dialogInstance.afterClosed().subscribe(data => {
        if (data != null || data != undefined )
            this.dashboardService.excelFileHandler(this.capacityUtilizationData, data, this.tableHeaderRow)
    })
}

  getProjectDetails() {
    this.dashboardService.getProjectByID(this.projectId).subscribe((res: any) => {
      if (res.status == HttpStatusCode.Ok)
        this.projectDetails = res.data      
    })
  }

  getCapacityUtilizationData() {
    this.dashboardService.getProjectCapacityReport(this.projectId).subscribe((res: any) => {
      if (res.status == HttpStatusCode.Ok) {
        this.capacityUtilizationData = res.data        
        this.tableHeaderRow.push(...this.dashboardService.transformTableHeader(Object.keys(this.capacityUtilizationData[0]).reduce((accumulator, value) => {
          return { ...accumulator, [value]: true };
      }, {})))
      }
    })
  }

}
