import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild, ElementRef, HostListener, Renderer2, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, UntypedFormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService, NbMenuItem, } from '@nebular/theme';
import { Subject } from 'rxjs';
import { AuthService, ProjectService, WebStorageService, EStorageTarget } from '../../shared/services/public-api';
import { HttpClient } from '@angular/common/http';
import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { Location } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DashboardService } from '../portfolio/dashboard.service';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'ngx-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit, OnDestroy {
  public takeoffForm: UntypedFormGroup;
  folders = [
    { id: 1, name: 'Contract', active: false },
    { id: 2, name: 'Compliance', active: false },
    { id: 3, name: "Drawings", active: false },
    { id: 4, name: "Invoice", active: false },
    { id: 5, name: "Photos", active: false },
    { id: 6, name: "Tender", active: false },
    { id: 7, name: "Reports", active: false }
  ];
  currencies = [{ name: 'USD' }, { name: 'NGN' }, { name: 'CAD' }];

  selection = [];
  private ngUnsubscribe = new Subject<void>();
  public clientLoans: any = [];
  public rows: any = [];
  public showUpdateBtn: boolean;
  public showAddBtn: boolean;
  public isCreate: boolean;
  public isUpdate: boolean;
  public showApprovals: boolean;
  public showDeleteBtn: boolean;
  public columns: any = [];
  public rowTable: any = {};
  public departments;
  public category;
  selectedValue;
  mergedCells = [];
  photos = [];
  photosBuffer = [];
  bufferSize = 10;
  numberOfItemsFromEndBeforeFetchingMore = 5;
  loading = false;
  totalValue = 0
  totalPages = 0
  public paymentDenomination;
  btnloading = false;
  categories;
  constructions;
  constructionType;
  selectOptions;
  userData;
  cateFlat;
  savedInitital;
  locationData: any;
  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;

  constructor(
    private activeModal: NgbActiveModal,
    private projectService: ProjectService,
    private dashboardService: DashboardService,
    private formBuilder: UntypedFormBuilder,
    private toastrService: NbToastrService
  ) { }


  ngOnInit() {
    this.takeoffForm = this.formBuilder.group({
      desr: [null],
      location: [null, Validators.required],
      storage_location: [null],
      other_currency: [null],
    });
    this.getLocations();
  }

  getLocations() {
    this.dashboardService.getAllLocations('open').subscribe((res: any) => {
      if (res.status == HttpStatusCode.Ok) {
        this.locationData = res.data;
      }
    })
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
      // If the item does not exist in the selection array, find it in the original array and add it to the selection array
      const itemToAdd = originalArray.find(item => item.id === itemId);
      if (itemToAdd) {
        this.selection.push(itemToAdd);
      }
    }
    return this.selection;
  }

  createBtn() {
    let formValue = this.takeoffForm.getRawValue();
    this.projectService.createProject({ ...formValue, folder_name: this.selection.map(r => r.name) })
      .then(res => {
        this.savedInitital = res.data;
        this.activeModal.close({ data:  res.data, status: 200 });
        this.toastrService.primary('Project has been saved', 'Success', {
          duration: 3000,
        });
      })
      .catch((err) => {
        this.toastrService.warning(err.error.message, 'Error', {
          duration: 3000,
        });
      });

  }

  closeModal(status) {
    this.activeModal.close({ data: null, status: 206 });
  }


  ngOnDestroy() {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }


}
