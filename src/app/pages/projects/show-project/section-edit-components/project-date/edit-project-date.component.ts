import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
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
  selector: 'edit-project-date',
  templateUrl: './edit-project-date.component.html',
  styleUrls: ['./edit-project-date.component.scss'],
})
export class EditProjectDateComponent implements OnInit, OnDestroy {
  public projectEditForm: UntypedFormGroup;
  unitData = [
    { name: 'Hour', value: 'hour' },
    { name: 'Day', value: 'day' },
  ];

  calculationUnit = [
    { value: 'multiply', name: 'Multiply' },
    { value: 'divide', name: 'Divide' },
  ];

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
      planned_start: [this.selectedProject?.project_dates_plan?.planned_start],
      planned_finish: [
        this.selectedProject?.project_dates_plan?.planned_finish,
        Validators.required,
      ],
      planned_duration: [
        this.selectedProject?.project_dates_plan?.planned_duration,
      ],
      duration_unit: [this.selectedProject?.project_dates_plan?.duration_unit],
      actual_start: [this.selectedProject?.project_dates_plan?.actual_start],
      actual_finish: [this.selectedProject?.project_dates_plan?.actual_finish],
      extra_day: [this.selectedProject?.project_dates_plan?.extra_day],
    });
  }

  submitBtn() {
    const formValue = { project_dates_plan: this.projectEditForm.value };
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
