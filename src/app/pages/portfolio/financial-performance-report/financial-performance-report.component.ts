import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpStatusCode } from '@angular/common/http';
import { MatAccordion } from '@angular/material/expansion';
import { LayoutDialogComponent } from '../layout-dialog/layout-dialog.component';
import { PortfolioService } from '../../../shared/services/public-api';
import { NumberTransformPipe } from '../../number-transform.pipe';
@Component({
  selector: 'app-financial-performance-report',
  templateUrl: './financial-performance-report.component.html',
  styleUrls: ['./financial-performance-report.component.scss'],
  providers: [NumberTransformPipe]
})
export class FinancialPerformanceReportComponent implements OnInit {
  projectId!: number;
  projectDetails: any;
  financialPerformanceData: any[] = []
  transformReportData: any = {}
  summaryData: any
  mainCols: any = {}
  roleNameDisplayRow: any = []
  displayRows: any[] = []
  dataSource: any = []
  isOpen = false
  firstOpen = false
  summaryDataFilter: any;
  mainColsFilter: any;
  transformData: any;
  displayColumn: any;
  @ViewChild('accordion', { static: true }) accordion!: MatAccordion;
  constructor(private dashboardService: PortfolioService,
    private dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.url[1].path)
    this.getProjectDetails()
    this.getFinancilaPerformanceData()
  }

  getProjectDetails() {
    this.dashboardService.getProjectByID(this.projectId).subscribe((res: any) => {
      if (res.status == HttpStatusCode.Ok)
        this.projectDetails = res.data
    })
  }

  openTableDialog() {
    this.displayColumn = [...this.displayRows]
    const dialogInstance = this.dialog.open(LayoutDialogComponent, {
        width: '960px',
        autoFocus: false,
        data: {
            name: 'LayoutDialog',
            filterColumns: this.displayColumn,
        }

    })
    dialogInstance.afterClosed().subscribe(data => {
        this.displayColumn = this.displayRows.filter(item => item.visible)
        this.isMainColItemVisible()
    })
}

isMainColItemVisible() {
    this.summaryDataFilter = Object.assign({}, this.summaryData)
    this.mainColsFilter = Object.assign({}, this.mainCols);
    this.transformData = Object.assign({}, this.transformReportData);
    this.displayRows.forEach((element: any) => {
        if (!element.visible) {
            this.mainColsFilter = JSON.parse(JSON.stringify(this.mainColsFilter));
            Object.values(this.mainColsFilter).forEach((item: any) => {
                delete item[element.property];
            });
            this.transformData = JSON.parse(JSON.stringify(this.transformData));
            Object.values(this.transformData).filter(item => {
                Object.values(item).forEach(elemt => {
                    for (const item of elemt) {
                        delete item[element.property]
                    }
                })
            })
            delete this.summaryDataFilter[element.property]
        }
    });
}

  sliceNumber(number) {
    return Math.round(number).toString() + '%'
  }
  noSort() {
    return 0;
  }

  excelFileHandler() {
    const dialogInstance = this.dialog.open(LayoutDialogComponent, {
      width: '500px',
      autoFocus: false,
      disableClose: true,
      data: {
        name: 'CSVInputDialog',
        message: 'Enter the file name to save file'
      }
    })

    dialogInstance.afterClosed().subscribe(data => {
      if (data != null || data != undefined)
        this.dashboardService.excelFileHandler(this.dataSource, data, this.displayRows)
    })
  }

  openCloseHandler() {
    this.firstOpen = true
    if (this.isOpen) this.accordion.closeAll();
    else this.accordion.openAll();
    this.isOpen = !this.isOpen
  }
  getFinancilaPerformanceData() {
    this.dashboardService.getProjectFinancialPerformanceReport(this.projectId).subscribe((res: any) => {
      if (res.status == HttpStatusCode.Ok) {
        this.financialPerformanceData = res.data
        this.summaryData = res.summation
        this.summaryDataFilter = { ...this.summaryData }
        this.financialPerformanceData.forEach(item => {
          this.mainCols[item?.element] = item?.sub_summation
          this.mainColsFilter = { ...this.mainCols }
          this.transformReportData[item?.element] = item?.items.reduce((acc: any, curr: any) => {
            acc[curr['name']] = curr['data'];
            return acc;
          }, {});
          this.roleNameDisplayRow = Object.keys(item?.items[0]?.data[0])
          this.dataSource.push(...item?.items.map((element: any) => element.data[0]))
          this.displayRows = this.roleNameDisplayRow.map((item: string) => {
            return item
          })
          this.displayRows = this.displayRows.reduce((accumulator, value) => {
            return { ...accumulator, [value]: true };
          }, {});
          this.displayRows = this.dashboardService.transformTableHeader(this.displayRows)
          this.displayColumn = [...this.displayRows]
        })
        this.transformData = { ...this.transformReportData }
      }
    })
  }

}
