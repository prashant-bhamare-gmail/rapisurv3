import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NbToastrService, NbMenuService, NbMenuItem } from '@nebular/theme';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService, ProjectService } from '../../shared/services/public-api';
@Component({
  selector: 'ngx-dialogue',
  templateUrl: './dialogue.component.html',
  styles: [
    `
      .light-black-backdrop {
        background-color: #050607;
      }
    `,
  ],
})
export class DialogueComponent implements OnInit, OnDestroy {
  public transactForm: UntypedFormGroup;
  modalHeader: string;
  type: string;
  bodyContent: string;
  section;
  totalAmount: string;
  no: string;
  yes: string;
  projectId: string;
  takeoffId: string;
  amountPaid: string;
  balance: string;
  particulars: [];
  order: any;
  btnloading = false;
  twoBtns = true;
  constructor(
    private activeModal: NgbActiveModal,
    private projectService: ProjectService,
    private toastrService: NbToastrService,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit() {
    console.log('bodyContent', this.bodyContent);
    // this.particulars = this.order.particulars
    // this.totalAmount= this.order.totalAmount;
    // this.amountPaid=this.order.amountPaid;
    // this.balance= this.order.balance;
    this.transactForm = this.formBuilder.group({
      phone: ['', Validators.required],
      amount: ['', Validators.required],
    });
    //this.modalHeader=order.orderNo;
  }

  getRowClass(row) {
    return {
      'row-color': row.approval === 2,
    };
  }

  ngOnDestroy() {}

  closeModal(status) {
    console.log('response', status);

    if (status === 'Yes') {
      if (this.section === 'Bill Creation') {
        this.projectService
          .loadAllTakeOffCombined(this.projectId)
          .then(res => {
            console.log('res.data', res.data);
            this.activeModal.close({ status, data: res.data });
          })
          .catch((err: Response) => {
            console.log('err', err);
          });
      } else {
        this.activeModal.close({ status, data: null });
      }
    } else {
      this.activeModal.close({ status, data: null });
    }
  }
}
