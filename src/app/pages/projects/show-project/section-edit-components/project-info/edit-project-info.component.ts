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
import { DashboardService } from '../../../../portfolio/dashboard.service';
import { HttpStatusCode } from '@angular/common/http';
@Component({
  selector: 'edit-project-info',
  templateUrl: './edit-project-info.component.html',
  styleUrls: ['./edit-project-info.component.scss'],
})
export class EditProjectInfoComponent implements OnInit, OnDestroy {
  public projectEditForm: UntypedFormGroup;
  statusData = [{ name: 'Open' }, { name: 'Hold' }, { name: 'Closed' }];

  issueTypes = [{ name: 'USD' }, { name: 'NGN' }, { name: 'CAD' }];

  calculationUnit = [
    { value: 'multiply', name: 'Multiply' },
    { value: 'divide', name: 'Divide' },
  ];

  folders = [
    { id: 1, name: 'Contract', active: false, saved: false },
    { id: 2, name: 'Compliance', active: false, saved: false },
    { id: 3, name: "Drawings", active: false, saved: false },
    { id: 4, name: "Invoice", active: false, saved: false },
    { id: 5, name: "Photos", active: false, saved: false },
    { id: 6, name: "Tender", active: false, saved: false },
    { id: 7, name: "Reports", active: false, saved: false }
  ];
  currencies = [{ name: 'USD' }, { name: 'NGN' }, { name: 'CAD' }];

  selection = [];
  selectedProject;
  locationData: any;
  private ngUnsubscribe = new Subject<void>();
  ColumnMode = ColumnMode;
  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;

  constructor(
    private activeModal: NgbActiveModal,
    private projectService: ProjectService,
    private formBuilder: UntypedFormBuilder,
    private toastrService: NbToastrService,
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.projectEditForm = this.formBuilder.group({
      desr: [this.selectedProject?.Description],
      other_currency: [this.selectedProject?.other_currency],
      calculation: [this.selectedProject.calculation, Validators.required],
      ex_rate: [this.selectedProject?.ex_rate],
      project_currency: [this.selectedProject?.project_currency],
      status: [this.selectedProject.status],
      location: [this.selectedProject.location],
      scope_of_work: [this.selectedProject.scope_of_work],
      project_folder: [this.selectedProject.project_folder],
      storage_location: [this.selectedProject.storage_location],
    });
    console.log('selectedProject', this.selectedProject);

    console.log('folder_name', this.selectedProject.folder_name)
    for (let n of this.selectedProject.folder_name) {
      let nm = this.folders.find(f => f.name === n);
      console.log('nm', nm);
      const index = this.folders.findIndex(item => item.name === nm.name);
      console.log(index);

      this.folders[index].saved = true

    }
    console.log('this.folders', this.folders)
    this.getLocations();
  }

  submitBtn() {
    const formValue = this.projectEditForm.value;
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

  getLocations() {
    this.dashboardService.getAllLocations('open').subscribe((res: any) => {
      if (res.status == HttpStatusCode.Ok) {
        console.log('ok', res);
        this.locationData = res.data;
      }
    });
  }

  selectFolder(f) {
    f.active = !f.active;
    this.toggleSelection(this.folders, this.selection, f.id);
  }

  toggleSelection(originalArray, selection, itemId) {
    // Check if the item already exists in the selection array
    const index = selection.findIndex(item => item.id === itemId);
    // If the item exists in the selection array, remove it
    if (index !== -1) {
      this.selection = selection.filter(item => item.id !== itemId);
    } else {
      // If the item does not exist in the selection array, 
      // find it in the original array and add it to the selection array
      const itemToAdd = originalArray.find(item => item.id === itemId);
      if (itemToAdd) {
        this.selection.push(itemToAdd);
      }
    }
    return this.selection;
  }

  createFolder() {
    let selectedFolders = this.selection.map(r => r.name)
    console.log('selectedFolders', selectedFolders)
    for (let name of selectedFolders) {
      this.projectService.createFolder({
        "project_list_id": this.selectedProject.id,
        "folder_name": name
      })
        .then(res => {
          console.log('savedInitital', res)
          this.activeModal.close({ data: null, status: 200 });
          // this.getAllFolder();
          this.toastrService.primary('Folder has been saved', 'Success', {
            duration: 3000,
          });
        })
        .catch((err) => {
          console.log('err', err)
          const formattedErrors = this.formatErrorMessages(err.error.errors);
          console.log(formattedErrors);
          this.toastrService.warning(formattedErrors, 'Error', {
            duration: 5000,
          });
          this.activeModal.close({ data: null, status: 200 });
        });
    }
  }

  formatErrorMessages(errorObject) {
    let formattedErrors = '';

    for (const key in errorObject) {
      if (errorObject.hasOwnProperty(key)) {
        const errorMessages = errorObject[key];
        console.log('errorMessages', errorMessages)
        const propertyName = key.split('.').pop(); // Extract the last part after the dot
        const formattedErrorMessage = `  ${this.transformErrorMessage(errorMessages[0])}\n`;
        console.log('formattedErrorMessage', formattedErrorMessage)
        formattedErrors += formattedErrorMessage;
      }
    }

    return formattedErrors.trim(); // Trim to remove the trailing newline
  }

  transformErrorMessage(errorMessage) {
    console.log('formattedErrorMessageyy', errorMessage.split('.'))
    if (errorMessage.split('.')[1] === '') {
      return errorMessage
    } else {
      return errorMessage.replace(/\b\w+\./, '');

    }
  }

  closeModal(data, status = 206) {
    this.activeModal.close({ data, status });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}
