import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PortfolioService, } from '../../../shared/services/public-api';

import { MatDialog } from '@angular/material/dialog';
import { HttpStatusCode } from '@angular/common/http';
import { LayoutDialogComponent } from '../layout-dialog/layout-dialog.component';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-plan-forecast-report', 
  templateUrl: './plan-forecast-report.component.html',
  styleUrls: ['./plan-forecast-report.component.scss']
})
export class PlanForecastReportComponent implements OnInit {
  projectId!: number;
  projectDetails: any;
  planForecastData: any[] = []
  transformReportData: any = {}
  summaryData: any
  mainCols: any = {}
  roleNameDisplayRow: any = []
  displayRows: any[] = []
  dataSource: any = []
  summaryDataFilter: any;
  mainColsFilter: any;
  transformData: any;
  displayColumn: any;
  @ViewChild('accordion', { static: true }) accordion!: MatAccordion;
  isOpen = false
  firstOpen = false
  constructor(private dashboardService: PortfolioService,
    private dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.url[1].path)
    this.getProjectDetails()
    this.getPlanForecastData()
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

  getPlanForecastData() {
    this.dashboardService.getProjectForecastComparisonReport(this.projectId).subscribe((res: any) => {
      if (res.status == HttpStatusCode.Ok) {
        this.planForecastData = res.data
        this.summaryData = res.summation
        this.summaryDataFilter = { ...this.summaryData }
        this.planForecastData.forEach(item => {
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
