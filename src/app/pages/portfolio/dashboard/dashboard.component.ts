import { Component, HostListener, OnInit } from '@angular/core';
import * as HighCharts from 'highcharts'
import { PortfolioService } from '../../../shared/services/public-api';
import { HttpStatusCode } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { LayoutDialogComponent } from '../layout-dialog/layout-dialog.component';
import { NavigationEnd, Router } from '@angular/router';
import { NumberTransformPipe } from '../../number-transform.pipe';
import { Location } from '@angular/common';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    providers: [NumberTransformPipe]
})
export class DashboardComponent implements OnInit {
    dataSource: any[] = []
    projectList: any[] = []
    isTableViewMode: boolean = false
    portfolioList: any = []
    portfolioData: any = {}
    selectedIndex = 0
    portfolioDataForCharts: any = {}
    columnList: any =
        {
            'project_id': true,
            'project_name': true,
            'contract_sum': true,
            'revised_sum': true,
            'approved_change': true,
            'unapproved_change': true,
            'completed_sum': true,
            'per_complete': true,
            'total_valuations': true,
            'pending_valuations': true,
            'planned_cost': true,
            'original_budget': true,
            'current_budget': true,
            'budget_variance': true,
            'per_budget_variance': true,
            'internal_issues': true,
            'total_spend': true,
            'ytd_cost_plan': true,
            'ytd_spend': true,
            'etc': true,
            'eac': true,
            'earned_value': true,
            'planned_margin': true,
            'per_planned_margin': true,
            'per_margin_plan': true,
            'calculated_planned_margin': true,
            'calculated_actual_margin': true,
            'per_actual_margin': true,
        };
    columnListOne: any[] = []
    dialogFiledData: any;
    showMoreButtonVisible: boolean = true;
    visibleProjectItems: any;
    isStandardMode: boolean = false;

    get visibleColumns() {
        return this.columnListOne?.filter((column: any) => column.visible).map((column: any) => column.property)
    }
    trackByProperty<T>(index: number, column: any) {
        return column.property
    }

    @HostListener('window:popstate', ['$event'])
    onPopState(event: PopStateEvent) {

        this.isTableViewMode = !this.isTableViewMode
    }
    constructor(private dashboardService: PortfolioService,
        private dialog: MatDialog, private router: Router, private location: Location) { }

    ngOnInit(): void {
        this.columnListOne.push(...this.dashboardService.transformTableHeader(this.columnList))
        if (this.router.url.split('/').length == 5) this.isTableViewMode = true
        this.getPortfolio()
        this.marginPieChart();
        this.budgetPieChart();
        this.costBarChart();
        this.contractStatusBarChart();
        this.contractPerformanceBarChart();
    }

    marginPieChart() {
        HighCharts.setOptions({
            colors: ['#41D8AF', '#49475F',]
        });
        const chart = HighCharts.chart('marginPieChart', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                height: 300,
                width: 500
            },
            legend: {
                align: 'right',
                verticalAlign: 'top',
                layout: 'vertical',
                x: 0,
                y: 100,
            },
            title: {
                text: '',
                align: 'left'
            },
            credits: {
                enabled: false
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    size: 200,
                    allowPointSelect: false,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: '',
                colorByPoint: true,
                data: [{
                    name: 'Actual Margin',
                    y: 76.72,
                }, {
                    name: 'Unrecoverable',
                    y: 23.27,
                },]
            }]
        } as any);
    }

    budgetPieChart() {
        HighCharts.setOptions({
            colors: ['#41D8AF', '#49475F',]
        });
        const chart = HighCharts.chart('budgetPieChart', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                height: 300,
                width: 550
            },
            title: {
                text: ''
            },
            credits: {
                enabled: false
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    size: 200,
                    allowPointSelect: false,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        border: 'black',

                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name: '',
                colorByPoint: true,
                data: [{
                    name: 'Current Budget',
                    y: 72.98,
                }, {
                    name: 'Total Spend',
                    y: 27.02,
                },]
            }]
        } as any);
    }

    costBarChart() {
        const chart = HighCharts.chart('costBarChart', {
            title: {
                text: ''
            },
            chart: {
                height: 400,
                width: 730
            },
            xAxis: [{
                categories: ['Planned Cost', 'EAC', 'ETC', 'Earned Value', 'Total Spend'],
                crosshair: true
            }],
            yAxis: [{
                // max: 100,
                gridLineDashStyle: 'longdash',
                labels: {
                    format: '{value}%',
                    style: {
                        color: '#615E83'
                    }
                },
                title: {
                    text: 'Spend %',
                    style: {
                        color: '#615E83'
                    }
                }, opposite: true
            }, {
                max: 160,
                gridLineDashStyle: 'longdash',
                labels: {
                    format: '{value}M',
                    style: {
                        color: '#615E83'
                    }
                },
                title: {
                    text: 'Cost in Million',
                    style: {
                        color: '#615E83'
                    }
                },
            }],
            credits: {
                enabled: false
            },
            tooltip: {
                shared: true
            },
            plotOptions: {
                bar: {
                    heigth: 300,
                    dataLabels: {
                        enabled: true
                    },
                },
                series: {
                    borderRadius: {
                        radius: 10
                    },
                }
            },
            legend: {
                enabled: false
            },
            series: [{
                name: '',
                type: 'column',
                yAxis: 1,
                data: [{
                    name: 'Planned Cost',
                    y: 150,
                    color: '#E5EAFC'
                }, {
                    name: 'EAC',
                    y: 35,
                    color: '#E5EAFC'
                }, {
                    name: 'ETC',
                    y: 75,
                    color: '#E5EAFC'
                }, {
                    name: 'Earned Value',
                    y: 45,
                    color: '#E5EAFC'
                }, {
                    name: 'Total Spend',
                    y: 130,
                    color: '#41D8AF'
                }],
                tooltip: {
                    valueSuffix: 'M'
                }
            }, {
                name: '',
                type: 'spline',
                color: '#F85C04',
                data: [20, 57, 75, 90, 100],
                tooltip: {
                    valueSuffix: '%'
                }
            }]
        } as any);
    }

    contractStatusBarChart() {
        HighCharts.chart('contractStatusChart', {
            chart: {
                type: 'column',
                height: 300,
                width: 300
            },
            title: {
                text: ''
            },
            yAxis: [{
                max: 200,
                gridLineDashStyle: 'longdash',
                title: {
                    text: ''
                },
                labels: {
                    format: '{value}M',
                },
            }],
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                },
            },
            series: [
                {
                    name: '',
                    data: [{
                        name: 'Contract Sum',
                        y: 178,
                        color: '#E5E5EF'
                    }, {
                        name: 'Revised Sum',
                        y: 137,
                        color: '#E5E5EF'
                    }, {
                        name: 'Approved Variation',
                        y: 110,
                        color: '#E5E5EF'
                    }, {
                        name: 'Unapproved Variation',
                        y: 180,
                        color: '#E5E5EF'
                    }, {
                        name: 'Completed Sum',
                        y: 140,
                        color: '#E5E5EF'
                    }, {
                        name: 'Total Valuations',
                        y: 110,
                        color: '#E5E5EF'
                    }],
                },
                {
                    name: '',
                    data: [{
                        name: 'Contract Sum',
                        y: 22,
                        color: '#F17BAD'
                    }, {
                        name: 'Revised Sum',
                        y: 63,
                        color: '#44C1AE'
                    }, {
                        name: 'Approved Variation',
                        y: 90,
                        color: '#6B6A7D'
                    }, {
                        name: 'Unapproved Variation',
                        y: 20,
                        color: '#23ABFF'
                    }, {
                        name: 'Completed Sum',
                        y: 60,
                        color: '#9D95FA'
                    }, {
                        name: 'Total Valuations',
                        y: 90,
                        color: '#CFB098'
                    }],
                    tooltip: {
                        valueSuffix: 'M'
                    }
                }
            ]
        } as any);

    }

    contractPerformanceBarChart() {
        HighCharts.chart('contractPerformanceChart', {
            chart: {
                type: 'column',
                height: 300,
                width: 550
            },
            title: {
                text: ''
            },
            xAxis: [{
                categories: ['Completed Sum', 'Calculated Planned Margin', 'Calculated Actual Margin'],
                // crosshair: true,
            }],
            yAxis: [{
                max: 80,
                gridLineDashStyle: 'longdash',
                title: {
                    text: ''
                },
                labels: {
                    format: '{value}M',
                },
            }],
            credits: {
                enabled: false
            },
            legend: {
                align: 'right',
                verticalAlign: 'top',
                layout: 'vertical',
                x: 0,
                y: 100,
                symbolRadius: 0,
            },
            plotOptions: {
                series: {
                    borderWidth: 3,
                    color: '#fff',
                    // pointPadding: 0,
                    groupPadding: 0,
                    borderRadius: {
                        radius: 10
                    },
                },
            },
            tooltip: {
                valueSuffix: 'M'
            },
            series: [
                {
                    name: '',
                    data: [
                        {
                            name: 'Completed Sum',
                            y: 80,
                            borderColor: '#9D95FA',
                            // color:'#9D95FA'
                            legendColor: '#9D95FA',
                        },
                        {
                            name: 'Calculated Planned Margin',
                            y: 15,
                            borderColor: '#14D19E',
                            // color:'#14D19E'
                            legendColor: '#14D19E',
                            // colorByPoint: true
                        },
                        {
                            name: 'Calculated Actual Margin',
                            y: 47,
                            borderColor: '#F85C04',
                            // color:'#F85C04'
                            legendColor: '#F85C04',
                        }
                    ],
                    // colorByPoint: true

                },
            ]
        } as any);

    }

    getPortfolio() {
        this.dashboardService.getAllPortfolios().subscribe((res: any) => {
            if (res.status == HttpStatusCode.Ok) {
                this.portfolioList = res.data
                this.onSelectPortfolio(this.selectedIndex)
            }
        })
    }

    getProjects(selectedPortfolio) {
        this.projectList = []
        this.dashboardService.getPortfolioByID(selectedPortfolio?.id).subscribe((portfolio: any) => {
            if (portfolio.status == HttpStatusCode.Ok) {
                this.dataSource = portfolio.data.meta
                this.dialogFiledData = portfolio.data
                this.portfolioDataForCharts = this.dataSource[0]
                this.dataSource.filter(item => {
                    if (item.project_id) {
                        this.projectList.push(item.project_id + ' - ' + item.project_name)
                    }
                    this.visibleProjectItems = this.projectList
                })
            }
        })
    }

    openTableDialog() {
        const dialogInstance = this.dialog.open(LayoutDialogComponent, {
            width: '960px',
            autoFocus: false,
            data: {
                filterColumns: this.columnListOne,
                name: 'LayoutDialog'
            }
        })
    }

    openCSVDialog() {
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
                this.dashboardService.excelFileHandler(this.dataSource, data, this.columnListOne)
        })
    }

    onClickProject(projectID: number) {
        if (projectID)
            this.router.navigate(['/app/portfolio/financial-plan-report/' + projectID])
    }
    tableViewHandler() {
        // this.router.navigate(['/app/portfolio/dashboard/' + this.portfolioData.id])
        this.isTableViewMode = true
        this.location.go('/app/portfolio/dashboard/' + this.portfolioData.id)
    }

    sliceNumber(number: number) {
        return Math.round(number).toString() + '%'
    }

    onSelectPortfolio(index) {
        this.selectedIndex = index
        this.portfolioData = this.portfolioList[index]
        this.getProjects(this.portfolioData)
        this.loadInitialItems()
    }

    loadInitialItems() {
        this.visibleProjectItems = this.projectList.slice(0, 3);
        this.showMoreButtonVisible = this.projectList.length > 3;
    }

    toggleItems() {
        this.visibleProjectItems = this.projectList;
        this.showMoreButtonVisible = false;
    }

    onChangeView(value){
        if (value == 'standardView') {
            this.isStandardMode = true
            this.router.navigate(['/app/dashboard'])
        }
        else this.isStandardMode = false
    }

}
