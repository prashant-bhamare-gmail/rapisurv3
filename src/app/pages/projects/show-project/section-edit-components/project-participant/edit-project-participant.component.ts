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
  selector: 'edit-project-participant',
  templateUrl: './edit-project-participant.component.html',
  styleUrls: ['./edit-project-participant.component.scss'],
})
export class EditProjectParticipantComponent implements OnInit, OnDestroy {
  public projectEditForm: UntypedFormGroup;
  statusData = [{ name: 'Open' }, { name: 'Hold' }, { name: 'Closed' }];

  participantRoles = [
    { value: 'owner', name: 'Owner' },
    { value: 'contractor', name: 'Contractor' },
    { value: 'consultant', name: 'Consultant' },
    { value: 'regulator', name: 'Regulator' },
    { value: 'partner', name: 'Partner' },
    { value: 'financier', name: 'Financier' },
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
      participant_role: null,
      name: null,
      contact_person: null,
      email: null,
      phone: null,
    });
  }

  submitBtn() {
    const p = this.selectedProject.participants ?? [];
    const formValue = { participants: [...p, this.projectEditForm.value] };
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
