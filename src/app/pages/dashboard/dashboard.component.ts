import { Component, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  ProjectService,
  AuthService,
  WebStorageService,
  EStorageTarget,
} from '../../shared/services/public-api';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import { NbToastrService, NbMenuItem } from '@nebular/theme';
import {
  NgbModalConfig,
  NgbModalRef,
  NgbModal,
  ModalDismissReasons,
  NgbNav,
} from '@ng-bootstrap/ng-bootstrap';
import { CreateProjectComponent } from '../create-project/create-project.component';
declare let require: any;
const Boost = require('highcharts/modules/boost');
const noData = require('highcharts/modules/no-data-to-display');
const More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);
@Component({
  selector: 'rp-main_dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class MainDashboardComponent implements OnInit, OnDestroy {
  closeResult: string;
  recentProjects;
  showContract;
  showEstimate;
  showBidComparison;
  columnHeader;
  permissions = [];
  bidsTocompare;
  isLicenced;
  contract_sum;
  createdDate;
  revised_contract_sum;
  approved_variation_value;
  userData;
  approved_variation_perc;
  previousValuations;
  tax_percentage;
  vrententionPercentage;
  tax_value;
  executed_works_to_date;
  subtotal;
  costVersions;
  previousTotalValuation;
  oldTotalValuation;
  costId;
  license;
  projectDetails;
  public graphForm: UntypedFormGroup;
  projectsData;
  pricingUrl;
  isPortfolioMode = false;
  graphs = [
    { name: 'Contract Summary' },
    { name: 'Estimate' },
    { name: 'Bid Comparison' },
  ];

  items = [];

  takeoffrogue;
  takeoff;
  takeoffmain;
  takeoffroot;

  billing;
  billingmain;
  billingrogue;
  billingpreliminaries;
  billingroot;

  estimate;
  estimatemain;
  estimateroot;

  bid;
  bidmain;

  tender;
  tenderview;

  material;

  valuation;
  valuation_confrimworks;
  valuation_viewreports;

  ratesheet;

  issues;

  minutes;

  financial_planning;
  financial_planningroot;

  project;

  purchasing;

  messages;

  work_planning;

  invoicing;

  collaboration;

  public rows: any = [];
  public temp: any = [];
  isVersions = false;
  isBids = false;
  constructor(
    private projectService: ProjectService,
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private toastrService: NbToastrService,
    private storageService: WebStorageService,
    private modalService: NgbModal,
    private router: Router
  ) {
    if (this.authService.expired) {
    } else {
      const decodeToken = this.authService.decodeToken;
      this.userData = this.storageService.getItem('userData', {
        target: EStorageTarget.LocalStorage
          ? EStorageTarget.LocalStorage
          : EStorageTarget.SessionStorage,
      });

      this.license = this.storageService.getItem('license', {
        target: EStorageTarget.LocalStorage
          ? EStorageTarget.LocalStorage
          : EStorageTarget.SessionStorage,
      });
    }
  }

  ngOnInit() {
    this.permissions = this.storageService.getItem('perm', {
      target: EStorageTarget.LocalStorage
        ? EStorageTarget.LocalStorage
        : EStorageTarget.SessionStorage,
    });
    console.log('perm', this.permissions); //.filter(n=> n.includes('take')))

    console.log(
      'take---------',
      this.permissions.filter(n => n.page.includes('take'))
    );
    this.takeoff = this.permissions.find(n => n.page === 'takeoff');
    this.takeoffmain = this.permissions.find(n => n.page === 'takeoffmain');
    this.takeoffroot = this.permissions.find(n => n.page === 'takeoffroot');
    this.takeoffrogue = this.permissions.find(n => n.page === 'takeoffrogue');

    console.log(
      'billing----------',
      this.permissions.filter(n => n.page.includes('billing'))
    );
    this.billing = this.permissions.find(n => n.page === 'billing');
    this.billingmain = this.permissions.find(n => n.page === 'billingmain');
    this.billingrogue = this.permissions.find(n => n.page === 'billingrogue');
    this.billingpreliminaries = this.permissions.find(
      n => n.page === 'billingpreliminaries'
    );
    this.billingroot = this.permissions.find(n => n.page === 'billingroot');

    console.log(
      'estimate---------',
      this.permissions.filter(n => n.page.includes('estimate'))
    );
    this.estimate = this.permissions.find(n => n.page === 'estimate');
    this.estimatemain = this.permissions.find(n => n.page === 'estimatemain');
    this.estimateroot = this.permissions.find(n => n.page === 'estimateroot');

    console.log(
      'bid-----------',
      this.permissions.filter(n => n.page.includes('bid'))
    );
    this.bid = this.permissions.find(n => n.page === 'bid');
    this.bidmain = this.permissions.find(n => n.page === 'bidmain');

    console.log(
      'tender----------',
      this.permissions.filter(n => n.page.includes('tender'))
    );
    this.tender = this.permissions.find(n => n.page === 'tender');
    this.tenderview = this.permissions.find(n => n.page === 'tenderview');

    console.log(
      'material---------------',
      this.permissions.filter(n => n.page.includes('material'))
    );

    this.material = this.permissions.find(n => n.page === 'material');

    console.log(
      'valuation---------',
      this.permissions.filter(n => n.page.includes('valuation'))
    );
    this.valuation = this.permissions.find(n => n.page === 'valuation');
    this.valuation_viewreports = this.permissions.find(
      n => n.page === 'valuation_viewreports'
    );
    this.valuation_confrimworks = this.permissions.find(
      n => n.page === 'valuation_confrimworks'
    );

    console.log(
      'financial_planning---------------',
      this.permissions.filter(n => n.page.includes('financial_planning'))
    );
    this.financial_planning = this.permissions.find(
      n => n.page === 'financial_planning'
    );
    this.financial_planningroot = this.permissions.find(
      n => n.page === 'financial_planningroot'
    );

    console.log(
      'issues---------',
      this.permissions.filter(n => n.page.includes('issues'))
    );
    this.issues = this.permissions.find(n => n.page === 'issues');

    console.log(
      'minutes----------',
      this.permissions.filter(n => n.page.includes('minutes'))
    );
    this.minutes = this.permissions.find(n => n.page === 'minutes');

    console.log(
      'ratesheet----------',
      this.permissions.filter(n => n.page.includes('ratesheet'))
    );
    this.ratesheet = this.permissions.find(n => n.page === 'ratesheet');

    console.log(
      'project----------',
      this.permissions.filter(n => n.page.includes('project'))
    );
    this.project = this.permissions.find(n => n.page === 'project');

    console.log(
      'purchasing----------',
      this.permissions.filter(n => n.page.includes('purchasing'))
    );
    this.purchasing = this.permissions.find(n => n.page === 'purchasing');

    console.log(
      'messages----------',
      this.permissions.filter(n => n.page.includes('messages'))
    );
    this.messages = this.permissions.find(n => n.page === 'messages');

    console.log(
      'work_planning----------',
      this.permissions.filter(n => n.page.includes('work_planning'))
    );
    this.work_planning = this.permissions.find(n => n.page === 'work_planning');

    console.log(
      'invoicing----------',
      this.permissions.filter(n => n.page.includes('invoicing'))
    );
    this.invoicing = this.permissions.find(n => n.page === 'invoicing');

    console.log(
      'collaboration----------',
      this.permissions.filter(n => n.page.includes('collaboration'))
    );
    this.collaboration = this.permissions.find(n => n.page === 'collaboration');
    console.log('collaboration1', this.collaboration);
    this.bidComparisonChart();
    this.graphForm = this.formBuilder.group({
      projectId: [null],
      graph: [null],
      bidIds: [null],
      versionId: [null],
    });
    if (this.license) {
      this.isLicenced = true;
    } else {
      this.isLicenced = false;
    }

    this.loadAllTakeoff();

    this.projectService.webAccess().subscribe(res => {
      this.pricingUrl = res.data.url;
    });
    this.authService.setCurrentPage('Dashboard');
  }

  onChangeView() { 
    console.log('fk')
      this.isPortfolioMode = true;
      this.router.navigate(['/app/portfolio/dashboard']); 
  }

  loadAllTakeoff() {
    this.projectService.loadAllTakeoff(1).subscribe(res => {
      console.log('res.data', res.data);
      this.recentProjects = res.data
        .map(e => {
          return { ...e, displayName: e.id + '-' + e.Description };
        })
        .slice(0, 8);
      const inputArray = res.data.map(d => (d.recent ? d.recent.module : null));
      console.log(inputArray);
      const uniqueArray = Array.from(new Set(inputArray));
      this.items = uniqueArray.map(a => {
        return { text: a };
      });
      console.log(uniqueArray);
      console.log(this.items);
    });
  }

  getImage(img) {
    if (img === 'Project') {
      return 'assets/images/Takeoff.png';
    } else if (img === 'Take-off') {
      return 'assets/images/Takeoff.png';
    } else if (img === 'Bill') {
      return 'assets/images/Billing.png';
    } else if (img === 'Estimate') {
      return 'assets/images/Estimating.png';
    } else if (img === 'Tender') {
      return 'assets/images/Tender.png';
    } else if (img === 'Bid') {
      return 'assets/images/Bid&Contract.png';
    } else if (img === 'RateSheet') {
      return 'assets/images/RateSheet.png';
    } else if (img === 'Material') {
      return 'assets/images/Material.png';
    } else if (img === 'Valuation') {
      return 'assets/images/Valuation.png';
    } else if (img === 'fin_plan') {
      return 'assets/images/fin_plan.png';
    } else if (img === 'Scheduling') {
      return 'assets/images/Scheduling-icon.png';
    } else if (img === 'Purchasing') {
      return 'assets/images/Purchasing-icon.png';
    } else if (img === 'Invoicing') {
      return 'assets/images/Invoicing-icon.png';
    } else {
      return '';
    }
  }

  varianceContractChart() {
    Highcharts.chart('varianceContractChart', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: 'Variance from Contract Sum',
      },
      credits: {
        enabled: false
    },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
        },
      },
      series: [
        {
          name: undefined,
          colorByPoint: true,
          type: undefined,
          data: [
            {
              name: 'Awarded',
              y: this.contract_sum,
              sliced: true,
              selected: true,
            },
            {
              name: 'Variance',
              y: this.approved_variation_value,
            },
          ],
        },
      ],
    });
  }

  openApp(img, c) {
    console.log('open app', img);
    console.log('c', c);
    if (img === 'Project') {
      this.router.navigate(['/app/projects']);
    } else if (img === 'Take-off') {
      this.router.navigate(['/app/takeoff/add']);
    } else if (img === 'Bill') {
      this.router.navigate(['/app/billing/add']);
    } else if (img === 'Estimate') {
      this.router.navigate(['/app/estimating/add']);
    } else if (img === 'Tender') {
      this.router.navigate(['/app/tender/initiate']);
    } else if (img === 'Bid') {
      this.router.navigate(['/app/bid-contract/add']);
    } else if (img === 'RateSheet') {
      this.router.navigate([`/app/rate-sheet/view`]);
    } else if (img === 'Material') {
      this.router.navigate(['/app/materials']);
    } else if (img === 'Valuation') {
      this.router.navigate(['/app/valuation/add']);
    } else if (img === 'fin_plan') {
      this.router.navigate(['/app/financial-planning/add']);
    } else if (img === 'Scheduling') {
      this.router.navigate(['/app/work']);
    } else if (img === 'Purchasing') {
      this.router.navigate(['/app/purchase/create']);
    } else if (img === 'Invoicing') {
      this.router.navigate(['/app/purchase/invoice/payables']);
    } else {
      return '';
    }
  }

  openProject(img, c) {
    console.log('open-project', img);
    console.log('c', c);
    // view/:projectId/:takeoffId/:project_type/:owner
    // view/:projectId/:billId/main
    // view/:projectId/:costId/main

    if (img === 'Project') {
      this.router.navigate([`/app/projects/${c.id}`]);
    } else if (img === 'Take-off') {
      this.router.navigate([
        `/app/takeoff/view/${c.id}/${c.takf_version}/:project_type/:owner`,
      ]);
    } else if (img === 'Bill') {
      this.router.navigate([
        `/app/takeoff/view/${c.id}/${c.bill_version}/main`,
      ]);
    } else if (img === 'Estimate') {
      this.router.navigate([
        `/app/estimating/view/${c.id}/${c.cost_version}/main`,
      ]);
    } else if (img === 'Tender') {
      this.router.navigate(['/app/tender/initiate']);
    } else if (img === 'Bid') {
      this.router.navigate(['/app/bid-contract/add']);
    } else if (img === 'RateSheet') {
      this.router.navigate([`/app/rate-sheet/view`]);
    } else if (img === 'Material') {
      this.router.navigate(['/app/materials']);
    } else if (img === 'Valuation') {
      this.router.navigate(['/app/valuation/add']);
    } else if (img === 'fin_plan') {
      this.router.navigate(['/app/financial-planning/add']);
    } else if (img === 'Scheduling') {
      this.router.navigate(['/app/work']);
    } else if (img === 'Purchasing') {
      this.router.navigate(['/app/purchase/create']);
    } else if (img === 'Invoicing') {
      this.router.navigate(['/app/purchase/invoice/payables']);
    } else {
      return '';
    }
  }

  contractSummaryChart() {
    Highcharts.chart('contractSummaryChart', {
      chart: {
        type: 'column',
      },
      credits: {
        enabled: false
    },
      title: {
        text: 'Contract Summary',
      },
      xAxis: {
        categories: [],
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Amount',
          align: 'high',
        },
      },
      tooltip: {
        valueSuffix: ' ',
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
          },
        },
      },
      series: [
        {
          type: undefined,
          name: 'Awarded',
          data: [this.contract_sum],
        },
        {
          type: undefined,
          name: 'Variance',
          data: [this.approved_variation_value],
        },
        {
          type: undefined,
          name: 'Revised',
          data: [this.revised_contract_sum],
        },
        {
          type: undefined,
          name: 'Value',
          data: [this.previousTotalValuation],
        },
      ],
    });
  }

  estimateChart() {
    Highcharts.chart('estimateChart', {
      chart: {
        type: 'column',
      },
      credits: {
        enabled: false
    },
      title: {
        text: 'Estimate',
      },
      xAxis: {
        categories: [],
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Amount',
          align: 'high',
        },
      },
      tooltip: {
        valueSuffix: ' ',
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
          },
        },
      },
      series: [
        {
          type: undefined,
          name: 'Awarded',
          data: [107],
        },
        {
          type: undefined,
          name: 'Variance',
          data: [133],
        },
        {
          type: undefined,
          name: 'Revised',
          data: [814],
        },
        {
          type: undefined,
          name: 'Value',
          data: [1216],
        },
      ],
    });
  }

  bidComparisonChart() {}

  gotoTakeoff() {
    if (!this.isLicenced) {
      alert('Please buy a licence to access this module');
      return;
    }
    this.router.navigate(['/app/takeoff/add']);
  }

  gotoBill() {
    if (!this.isLicenced) {
      alert('Please buy a licence to access this module');
      return;
    }
    this.router.navigate(['/app/billing/add']);
  }

  estimateBtn() {
    const formValue = this.graphForm.value;
    this.spinner.show();
    this.projectService.compareEstimate(formValue.versionId).subscribe(res => {
      this.spinner.hide();
      this.columnHeader = res.data[6].slice(4);
      const nm = [];
      for (let r = 0; r < this.columnHeader.length; r++) {
        const b = { name: null, value: [] };
        b.name = this.columnHeader[r];
        for (let i = 0; i < res.data.length; i++) {
          if (i === 6) break;
          b.value.push(res.data[i].slice(4)[r]);
        }
        nm.push(b);
      }
      this.columnHeader = nm;
      const sliced = res.data.slice(7);

      Highcharts.chart('estimateChart', {
        chart: {
          type: 'column',
        },
        credits: {
          enabled: false
      },
        title: {
          text: 'Estimate',
        },
        // xAxis: {
        //   categories: ['Bids'],
        // },
        yAxis: {
          min: 0,
          title: {
            text: 'Amount',
            align: 'high',
          },
        },
        tooltip: {
          valueSuffix: ' ',
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true,
            },
          },
        },
        series: this.columnHeader.map(e => {
          return {
            type: undefined,
            name: e.name + ' (' + e.value[2] + ')',
            data: [e.value[5]],
          };
        }),
      });
    });
  }

  bidComparisonBtn() {
    const formValue = this.graphForm.value;
    this.spinner.show();
    this.projectService.compareBid(formValue.bidIds).subscribe(res => {
      this.spinner.hide();
      this.columnHeader = res.data[6].slice(4);
      const nm = [];
      for (let r = 0; r < this.columnHeader.length; r++) {
        const b = { name: null, value: [] };
        b.name = this.columnHeader[r];
        for (let i = 0; i < res.data.length; i++) {
          if (i === 6) break;
          b.value.push(res.data[i].slice(4)[r]);
        }
        nm.push(b);
      }
      const sliced = res.data.slice(7);

      Highcharts.chart('bidComparisonChart', {
        chart: {
          type: 'column',
        },
        credits: {
          enabled: false
      },
        title: {
          text: 'Bid Comparison',
        },
        // xAxis: {
        //   categories: ['Bids'],
        // },
        yAxis: {
          min: 0,
          title: {
            text: 'Amount',
            align: 'high',
          },
        },
        tooltip: {
          valueSuffix: ' ',
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true,
            },
          },
        },
        series: this.columnHeader.map(e => {
          return {
            type: undefined,
            name: e.name + ' (' + e.value[2] + ')',
            data: [e.value[5]],
          };
        }),
      });
    });
  }

  selectProject() {
    const formValue = this.graphForm.value;

    if (formValue.graph === 'Contract Summary') {
      this.isVersions = false;
      this.isBids = false;
      this.showContract = true;
      this.showEstimate = false;
      this.showBidComparison = false;
      this.projectService.getAllBids().subscribe(res => {
        this.projectsData = res.data.map(e => {
          return {
            ...e,
            displayName: e.project_id + ' - ' + e.id + ' - ' + e.desr,
          };
        });

        if (formValue.projectId) {
          const costId = res.data.find(
            e => e.project_id === formValue.projectId
          ).id;

          this.projectService
            .loadCost(formValue.projectId, costId)
            .subscribe(res => {
              this.projectService
                .loadVariationForm(formValue.projectId)
                .subscribe(variationsResponse => {
                  this.previousValuations = variationsResponse.data;
                  this.previousTotalValuation = variationsResponse.data
                    .map(e => Number(e.data.currentValuationValue))
                    .reduce((b, a) => Number(b) + Number(a), 0);
                  this.oldTotalValuation = this.previousTotalValuation;
                  this.projectDetails = res.data;
                  this.contract_sum = res.data.data.total;
                  this.approved_variation_value = res.data.data
                    .approvedVariation
                    ? res.data.data.approvedVariation
                    : 0;

                  this.contract_sum = res.data.data.total;
                  this.approved_variation_value =
                    res.data.data.approvedVariation;
                  this.tax_percentage = Number(res.data.data.vtaxPercentage);
                  this.vrententionPercentage = Number(
                    res.data.data.vrententionPercentage
                  );

                  this.subtotal =
                    Number(res.data.data.approvedVariation) +
                    Number(res.data.data.total);
                  this.approved_variation_perc =
                    (res.data.data.approvedVariation / res.data.data.total) *
                    100;
                  this.tax_value =
                    (Number(res.data.data.approvedVariation) +
                      Number(res.data.data.total)) *
                    (res.data.data.vtaxPercentage / 100);
                  this.revised_contract_sum =
                    (Number(res.data.data.approvedVariation) +
                      Number(res.data.data.total)) *
                      (res.data.data.vtaxPercentage / 100) +
                    Number(res.data.data.approvedVariation) +
                    Number(res.data.data.total);
                  this.executed_works_to_date = res.data.data
                    .executedWorksTillDate
                    ? res.data.data.executedWorksTillDate
                    : 0;
                  this.contractSummaryChart();
                  this.varianceContractChart();
                });
            });
        }
      });
    } else if (formValue.graph === 'Estimate') {
      this.showContract = false;
      this.showEstimate = true;
      this.showBidComparison = false;

      this.projectService.getAllCosts().subscribe(res => {
        this.projectsData = res.data.map(e => {
          return {
            ...e,
            displayName: e.project_id + ' - ' + e.id + ' - ' + e.desr,
          };
        });

        if (formValue.projectId) {
          const costId = res.data.find(
            e => e.project_id === formValue.projectId
          ).id;
          this.projectService
            .loadCost(formValue.projectId, costId)
            .subscribe(res => {
              this.projectDetails = res.data;
              if (res.data.data != null) {
                this.costVersions = res.data.cost_versions.map(e => {
                  return { ...e, name: e.id };
                });
                this.isVersions = true;
                this.isBids = false;
              }
            });
        }
      });
    } else if (formValue.graph === 'Bid Comparison') {
      this.showContract = false;
      this.showEstimate = false;
      this.showBidComparison = true;
      this.projectService.loadAllSharedBills().subscribe(res => {
        this.projectsData = res.data.map(e => {
          return {
            ...e,
            displayName: e.project_id + ' - ' + e.id + ' - ' + e.desr,
          };
        });

        if (formValue.projectId) {
          this.projectService
            .getAllBoqBids(formValue.projectId)
            .then(res => {
              this.projectDetails = res.data;
              this.isVersions = false;
              this.isBids = true;
              this.bidsTocompare = res.data.map(e => {
                return { name: e.id + ' ' + e.unmn, id: e.id, unmn: e.unmn };
              });
            })
            .catch((err: Response) => {});
        }
      });
    } else {
      this.isVersions = false;
      this.isBids = false;

      this.showContract = false;
      this.showEstimate = false;
      this.showBidComparison = false;
      this.graphForm.patchValue({
        projectId: null,
        versionId: null,
        bidIds: null,
      });
    }
  }

  createProject() {
    const activeModal = this.modalService.open(CreateProjectComponent, {
      size: 'lg',
      container: 'nb-layout',
      centered: true,
    });
    activeModal.componentInstance.bodyContent = {
      row: 2,
      col: 2,
      prop: 2,
      billDesc: 2,
      data: null,
      minuteId: null,
    };

    activeModal.result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
        console.log(result)
        if (result.status === 200) {
          this.loadAllTakeoff();
          this.router.navigate([`/app/projects/${result.data.id}`]);
        } else if (result.status === 206) {
          console.log('result.data', result.data);
        }
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  gotoCosting() {
    if (!this.isLicenced) {
      alert('Please buy a licence to access this module');
      return;
    }
    this.router.navigate(['/app/estimating/add']);
  }

  gotoTender() {
    if (!this.isLicenced) {
      alert('Please buy a licence to access this module');
      return;
    }
    this.router.navigate(['/app/tender/initiate']);
  }

  gotoMaterial() {
    if (!this.isLicenced) {
      alert('Please buy a licence to access this module');
      return;
    }
    this.router.navigate(['/app/materials/add']);
  }

  gotoValuation() {
    if (!this.isLicenced) {
      alert('Please buy a licence to access this module');
      return;
    }
    this.router.navigate(['/app/valuation/add']);
  }

  gotoRateSheet() {
    if (!this.isLicenced) {
      alert('Please buy a licence to access this module');
      return;
    }
    //  this.router.navigate(['/app/rate-sheet/add']);
    this.router.navigate([`/app/rate-sheet/view`]);
  }

  gotoBidAndContract() {
    if (!this.isLicenced) {
      alert('Please buy a licence to access this module');
      return;
    }
    this.router.navigate(['/app/bid-contract/add']);
  }

  subscribe() {
    window.open(this.pricingUrl, '_blank');
  }

  ngOnDestroy() {}
}
