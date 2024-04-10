import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  NgModule,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { ProjectService } from '../../../shared/services/public-api';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EditProjectInfoComponent } from './section-edit-components/project-info/edit-project-info.component';
import { EditProjectFinancialComponent } from './section-edit-components/project-financial/edit-project-financial.component';
import { EditProjectDateComponent } from './section-edit-components/project-date/edit-project-date.component';
import { EditProjectParticipantComponent } from './section-edit-components/project-participant/edit-project-participant.component';
import {
  NgbModalConfig,
  NgbModalRef,
  NgbModal,
  ModalDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'show-project',
  templateUrl: './show-project.component.html',
  styleUrls: ['./show-project.component.scss'],
})
export class ShowProjectComponent implements OnInit, OnDestroy {
  public projectEditForm: UntypedFormGroup;
  statusData = [{ name: 'Open' }, { name: 'Hold' }, { name: 'Closed' }];
  closeResult: string;
  durationUnit = [
    { value: 'hour', name: 'Hour(s)' },
    { value: 'day', name: 'Day(s)' },
  ];
  project_id = null;
  selectedProject;

  private ngUnsubscribe = new Subject<void>();
  ColumnMode = ColumnMode;
  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;

  constructor(
    public route: ActivatedRoute,
    private projectService: ProjectService,
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private toastrService: NbToastrService,
    private router: Router
  ) {}

  calc(v1, v2, op) {
    let res = 0;
    switch (op) {
      case 'divide':
        res = v1 / v2;
        break;

      default:
        res = v1 * v2;
        break;
    }
    return res;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('params', params);
      this.project_id = params['project_id'];
      this.loadProjectById(this.project_id);
    });
  }

  loadProjectById(id) {
    this.projectService.loadAllProjectById(id).subscribe(({ data }) => {
      if (data.project_financials) {
        if (data.project_financials.hasOwnProperty('cost_total')) {
          if (data.project_financials?.cost_total === 'period') {
            const monthsToInclude = Object.keys(data.project_financials).filter(
              key =>
                key !== 'cost_total' &&
                key !== 'actual_cost' &&
                key !== 'actual_cost_period'
            );

            const totalActualCost = monthsToInclude.reduce((sum, month) => {
              const monthValue = data.project_financials[month];
              return typeof monthValue === 'number' ? sum + monthValue : sum;
            }, 0);
            data.actual_cost = totalActualCost;
          } else {
            data.actual_cost = parseFloat(
              data.project_financials['actual_cost']
            );
          }
        }
      }

      const other_currency_data = {
        cost_plan: this.calc(data.cost_plan, data.ex_rate, data.calculation),
        budget: this.calc(data.budget, data.ex_rate, data.calculation),
        actual_cost: this.calc(
          data.actual_cost,
          data.ex_rate,
          data.calculation
        ),
      };
      data.other_currency_data = other_currency_data;

      this.selectedProject = data;
      console.log('prpject', this.selectedProject);
    });
  }

  goToInitialPage() {
    this.router.navigate([`/app/projects`]);
  }

  //edit project info
  editProjectInfo() {
    console.log('this.selectedProject', this.selectedProject);
    const activeModal = this.modalService.open(EditProjectInfoComponent, {
      size: 'lg',
      backdrop: 'static',
      container: 'nb-layout',
      centered: true,
    });
    activeModal.componentInstance.selectedProject = this.selectedProject;
    activeModal.result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
        this.loadProjectById(this.project_id);
        if (result != 'close') {
        }
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  //edit project financial
  editProjectFinancial() {
    const activeModal = this.modalService.open(EditProjectFinancialComponent, {
      size: 'sm',
      backdrop: 'static',
      container: 'nb-layout',
      centered: true,
    });
    activeModal.componentInstance.selectedProject = this.selectedProject;
    activeModal.result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
        this.loadProjectById(this.project_id);
        if (result != 'close') {
        }
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  //edit project dates
  editProjectDates() {
    const activeModal = this.modalService.open(EditProjectDateComponent, {
      size: 'sm',
      backdrop: 'static',
      container: 'nb-layout',
      centered: true,
    });
    activeModal.componentInstance.selectedProject = this.selectedProject;
    activeModal.result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
        this.loadProjectById(this.project_id);
        if (result != 'close') {
        }
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  //edit project dates
  editProjectParticipant() {
    const activeModal = this.modalService.open(
      EditProjectParticipantComponent,
      { size: 'sm', backdrop: 'static', container: 'nb-layout', centered: true }
    );
    activeModal.componentInstance.selectedProject = this.selectedProject;
    activeModal.result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
        this.loadProjectById(this.project_id);
        if (result != 'close') {
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

  ngOnDestroy() {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}
