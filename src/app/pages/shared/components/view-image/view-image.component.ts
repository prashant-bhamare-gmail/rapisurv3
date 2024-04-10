import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FileService } from '../../../../shared/services/public-api';

@Component({
  selector: 'ngx-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.scss'],
})
export class ViewImageComponent implements OnInit {
  @Input() public image: string;
  @Input() public fileId: string;

  constructor(
    public activeModal: NgbActiveModal,
    private fileProvider: FileService,
  ) {}

  ngOnInit() {
  }

  public handle() {
    this.activeModal.close();
  }

  public deleteImage() {
    this.fileProvider
      .deleteFile(this.fileId)
      .toPromise()
      .then(_ => {
        this.activeModal.close();
      })
      .catch(err => console.error('error deleteing file ', err));
  }
}
