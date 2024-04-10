import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { ProjectService } from '../../../shared/services/public-api';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss'],
})
export class EditProjectComponent implements OnInit, OnDestroy {
  public projectEditForm: UntypedFormGroup;
  statusData = [{ name: 'Open' }, { name: 'Hold' }, { name: 'Closed' }];

  durationUnit = [
    { value: 'hour', name: 'Hour(s)' },
    { value: 'day', name: 'Day(s)' },
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
      duration: [this.selectedProject.duration],
      duration_unit: [this.selectedProject.duration_unit, Validators.required],
      status: [this.selectedProject.status],
      location: [this.selectedProject.location],
    });
  }

  submitBtn() {
    const formValue = this.projectEditForm.value;
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
