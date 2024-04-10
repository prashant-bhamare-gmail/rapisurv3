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
  PortfolioService,
} from '../../shared/services/public-api';
import {
  DatatableComponent,
  ColumnMode,
  SelectionType,
} from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LayoutDialogComponent } from '../portfolio/layout-dialog/layout-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpStatusCode } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { DialogueComponent } from '../dialogue/dialogue.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CreateProjectComponent } from '../create-project/create-project.component';
@Component({
  selector: 'rp-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit, OnDestroy {
  recentProjects;
  closeResult;
  isPortfolio = false;
  isManagePortfolio = false;
  entriesStatus = [
    { name: 'All Entries' },
    { name: 'Open' },
    { name: 'Hold' },
    { name: 'Closed' },
  ];

  selectOptions = [
    // { value: 'WIP' },
    { value: 'Risk' },
    { value: 'Financial plan' },
    { value: 'Financial performance' },
    { value: 'Plan forecast' },
    { value: 'Capacity utilization' },
  ];

  public graphForm: UntypedFormGroup;
  selectedProject;
  checked = false;
  portfolio: any;
  portfolioList: any;
  selectedProjectId: any[] = [];
  projectTableColumns = [
    'Project ID',
    'Project Name',
    'Duration',
    'Last Activity',
    'Status',
    'Location',
  ];

  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;
  constructor(
    private projectService: ProjectService,
    private formBuilder: UntypedFormBuilder,
    private modalService: NgbModal,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private dialog: MatDialog,
    private dashboardService: PortfolioService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.graphForm = this.formBuilder.group({
      reportName: [null],
    });
    this.getAllPortfolios();
    this.loadProjects(1, null);
    this.authService.setCurrentPage('Projects');
  }

  selectProjectsForPortfolio(event, data) {
    if (event) this.selectedProjectId.push(data);
    else
      this.selectedProjectId = this.selectedProjectId.filter(
        element => element !== data
      );
  }

  openSavePortfolioDialog() {
    const dialogInstance = this.dialog.open(LayoutDialogComponent, {
      width: '700px',
      autoFocus: false,
      disableClose: true,
      data: {
        name: 'CSVInputDialog',
        calledFrom: 'projects',
        message: 'Enter the description for saving portfolio',
      },
    });
    dialogInstance.afterClosed().subscribe(data => {
      if (data != null || data != undefined) {
        this.dashboardService
          .createPortfolio(this.selectedProjectId, data)
          .subscribe((res: any) => {
            if (res.status == HttpStatusCode.Ok) {
              this.portfolio = res.data;
              this.dashboardService['activePortfolioId'] = res.data?.id;
              this.router.navigate(['/app/portfolio/dashboard']);
              this.snackBar.open('Portfolio successfully saved', '', {
                duration: 3 * 1000,
              });
            }
          });
      }
    });
  }

  selectProject(data) {
    console.log(data);
    this.selectedProject = data;
  }

  editPorfolioHandler(portfolio) {
    this.portfolio = portfolio;
    this.isPortfolio = true;
    this.isManagePortfolio = true;
    this.selectedProjectId = this.portfolio.project_id;
    const filteredValues = this.recentProjects.filteredData.filter(item =>
      this.selectedProjectId.includes(item?.id)
    );
    const unfilteredValues = this.recentProjects.filteredData.filter(
      item => !filteredValues.includes(item)
    );
    // this.recentProjects = new MatTableDataSource([
    //   ...filteredValues,
    //   ...unfilteredValues,
    // ]);
  }

  isProjectPresent(project) {
    return this.selectedProjectId.includes(project.id);
  }

  deletePortfolio() {
    this.dashboardService
      .deletePortfolio(this.portfolio.id)
      .subscribe((res: any) => {
        this.snackBar.open('Portfolio deleted successfully', '', {
          duration: 3 * 1000,
        });
        this.getAllPortfolios();
      });
    this.cancelCreatePortfolio();
  }

  cancelCreatePortfolio() {
    this.isManagePortfolio = false;
    this.isPortfolio = false;
    this.selectedProjectId = [];
  }

  formatDuration(duration, duration_unit) {
    const durations = [
      { value: 'hour', name: 'Hour(s)' },
      { value: 'day', name: 'Day(s)' },
    ];
    return duration
      ? duration + ' ' + durations.find(u => u.value === duration_unit).name
      : 'Not set';
  }

  selectReport() {
    const formValue = this.graphForm.value;

    console.log('this.selectedProject', this.selectedProject);
    if (formValue.reportName) {
      if (formValue.reportName === 'WIP' || formValue.reportName === 'Risk') {
        if (!this.selectedProject.cost_version) {
          this.noBidNotice();
          return;
        }

        if (formValue.reportName === 'WIP') {
          this.router.navigate([
            `/app/report/wip/${this.selectedProject.id}/${this.selectedProject.cost_version}`,
          ]);
        }
        if (formValue.reportName === 'Risk') {
          this.router.navigate([
            `/app/report/risk/${this.selectedProject.id}/${this.selectedProject.cost_version}`,
          ]);
        }
      }

      if (formValue.reportName === 'Financial plan') {
        this.router.navigate([
          `/app/portfolio/financial-plan-report/${this.selectedProject.id}`,
        ]);
      }
      if (formValue.reportName === 'Financial performance') {
        this.router.navigate([
          `/app/portfolio/financial-performance-report/${this.selectedProject.id}`,
        ]);
      }
      if (formValue.reportName === 'Plan forecast') {
        this.router.navigate([
          `/app/portfolio/plan-forecast-report/${this.selectedProject.id}`,
        ]);
      }
      if (formValue.reportName === 'Capacity utilization') {
        this.router.navigate([
          `/app/portfolio/capacity-utilization-report/${this.selectedProject.id}`,
        ]);
      }
    }
  }

  noBidNotice() {
    const activeModal = this.modalService.open(DialogueComponent, {
      size: 'sm',
      backdrop: 'static',
      container: 'nb-layout',
      centered: true,
    });
    activeModal.componentInstance.bodyContent = `There is no bid created for this project.  Create a bid to be able to view this report.`;
    activeModal.componentInstance.no = 'Cancel';
    activeModal.componentInstance.yes = 'Continue';
    activeModal.componentInstance.twoBtns = false;
    activeModal.result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
        console.log('result', result);
        if (result.status === 'Yes') {
        } else {
        }
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  loadProjects(n, search) {
    this.spinner.show();
    this.projectService.loadProjects(n, search).subscribe(res => {
      this.spinner.hide();
      console.log('res', res);
     
      this.recentProjects = res.data.map(e => {
          return { ...e, displayName: e.id + '-' + e.Description };
        })
      ;
     
      // this.recentProjects = new MatTableDataSource(
      //   res.data.map(e => {
      //     return { ...e, displayName: e.id + '-' + e.Description };
      //   })
      // );
      console.log('this.recentProjects', this.recentProjects)
    });
  }

  getAllPortfolios() {
    this.dashboardService.getAllPortfolios().subscribe((res: any) => {
      if (res.status == HttpStatusCode.Ok) {
        this.portfolioList = res.data;
      }
    });
  }

  searchProjects(value) {
    const filterValue = (value.target as HTMLInputElement).value;
    this.recentProjects.filter = filterValue.trim().toLowerCase();
    // this.loadProjects(1, value.target.value)
  }

  filterProjects(value) {
    if (value) {
      this.loadProjects(1, value.name);
    } else {
      this.loadProjects(1, null);
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
        console.log('result', result);
        if (result.status === 200) {
        //  this.loadProjects(1, null);
          this.router.navigate([`/app/projects/${result.data.id}`]);
        } else if (result.status === 206) {
          console.log('result.data', result.data);
          //  this.loadProjects(1, null)
        }
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  editProject() {
    const activeModal = this.modalService.open(EditProjectComponent, {
      size: 'lg',
      backdrop: 'static',
      container: 'nb-layout',
      centered: true,
    });
    activeModal.componentInstance.bodyContent = `Do you really wish to delete this record`;
    activeModal.componentInstance.modalHeader = 'New Team';
    activeModal.componentInstance.selectedProject = this.selectedProject;
    activeModal.result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
        if (result.status === 200) {
          this.loadProjects(1, null);
          this.selectedProject = null;
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

  ngOnDestroy() {}
}
