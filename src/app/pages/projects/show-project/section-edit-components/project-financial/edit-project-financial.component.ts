import {
  Component,
  Directive,
  OnInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import { NbToastrService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { ProjectService } from 'src/app/shared/services/public-api';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'edit-project-info',
  templateUrl: './edit-project-financial.component.html',
  styleUrls: ['./edit-project-financial.component.scss'],
})
export class EditProjectFinancialComponent implements OnInit, OnDestroy {
  public projectEditForm: UntypedFormGroup;
  statusData = [{ name: 'Open' }, { name: 'Hold' }, { name: 'Closed' }];

  calculationUnit = [
    { value: 'multiply', name: 'Multiply' },
    { value: 'divide', name: 'Divide' },
  ];

  actual_cost_months = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  };

  selectedProject;

  private ngUnsubscribe = new Subject<void>();
  ColumnMode = ColumnMode;
  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;

  constructor(
    private activeModal: NgbActiveModal,
    private projectService: ProjectService,
    private formBuilder: UntypedFormBuilder,
    private toastrService: NbToastrService
  ) {}

  ngOnInit() {
    this.projectEditForm = this.formBuilder.group({
      actual_cost: [this.selectedProject?.project_financials?.actual_cost],
      actual_cost_period: [
        this.selectedProject?.project_financials?.actual_cost_period,
      ],
      jan: [this.selectedProject?.project_financials?.jan],
      feb: [this.selectedProject?.project_financials?.feb],
      mar: [this.selectedProject?.project_financials?.mar],
      apr: [this.selectedProject?.project_financials?.apr],
      may: [this.selectedProject?.project_financials?.may],
      jun: [this.selectedProject?.project_financials?.jun],
      jul: [this.selectedProject?.project_financials?.jul],
      aug: [this.selectedProject?.project_financials?.aug],
      sep: [this.selectedProject?.project_financials?.sep],
      oct: [this.selectedProject?.project_financials?.oct],
      nov: [this.selectedProject?.project_financials?.nov],
      dec: [this.selectedProject?.project_financials?.dec],
    });
  }

  submitBtn() {
    const formValue = { project_financials: this.projectEditForm.value };
    console.log(formValue);
    this.projectService
      .updateDescription(formValue, this.selectedProject.id)
      .subscribe(res => {
        this.toastrService.primary('Project Updated', 'Success', {
          duration: 3000,
        });
        this.closeModal('True', 200);
      });
  }

  closeModal(data, status = 206) {
    this.activeModal.close({ data, status });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}
