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
import {
  DatatableComponent,
  ColumnMode,
  SelectionType,
} from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';

declare let require: any;
const Boost = require('highcharts/modules/boost');
const noData = require('highcharts/modules/no-data-to-display');
const More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'rp-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
})
export class ApplicationsComponent implements OnInit, OnDestroy {
  isLicenced;
  userData;
  license;
  permissions = [];

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

  constructor(
    private projectService: ProjectService,
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private storageService: WebStorageService,
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
      console.log('this.license', this.license);
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

    if (this.license) {
      this.isLicenced = true;
    } else {
      this.isLicenced = false;
    }

    this.authService.setCurrentPage('Applications');
  }

  arrow() {
    // document.querySelector(".up_arrow").style.transform = "rotate(180deg)";
    // document.querySelector(".sticky_div").style.height = "70px";
    // document.querySelector(".sticky_div").style.transition = "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    // document.querySelector(".up_arrow").style.display = "block";
    // document.querySelector(".down_arrow").style.display = "none";
  }

  arrow2() {
    // document.querySelector(".up_arrow").style.transform = "rotate(180deg)";
    // document.querySelector(".sticky_div").style.height = "auto";
    // document.querySelector(".sticky_div").style.paddingBottom = "50px";
    // document.querySelector(".up_arrow").style.display = "none";
    // document.querySelector(".down_arrow").style.display = "block";
  }

  financialPlan() {
    this.router.navigate(['/app/financial-planning/add']);
  }

  workplan() {
    this.router.navigate(['/app/work']);
  }

  invoice() {
    this.router.navigate(['/app/purchase/invoice/payables']);
  }

  purchase() {
    this.router.navigate(['/app/purchase/list/demand']);
  }

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
    this.router.navigate(['/app/tender']);
  }

  gotoMaterial() {
    if (!this.isLicenced) {
      alert('Please buy a licence to access this module');
      return;
    }
    this.router.navigate(['/app/materials']);
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

  ngOnDestroy() {}
}
