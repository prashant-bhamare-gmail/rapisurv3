import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FileService } from '../../../../shared/services/public-api';

import { ViewImageComponent } from '../view-image/view-image.component';

@Component({
  selector: 'ngx-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
  @Input() clientId: string;
  @Input() documentType: string;
  public image: string;
  public fileId: string;

  constructor(
    private fileProvider: FileService,
    private modalService: NgbModal,
  ) {}

  ngOnInit() {
    this.getImage();
  }

  public open() {
    const modalRef = this.modalService.open(ViewImageComponent);
    modalRef.componentInstance.image = this.image;
    modalRef.componentInstance.fileId = this.fileId;
    modalRef.result.then(_ => {
      if (this.fileId) this.getImage();
    }).catch(err => console.error(err));
  }

  public getImage() {
    this.fileProvider
      .getFile(this.clientId, this.documentType)
      .toPromise()
      .then(data => {
        this.image = data[0] ? `data:${data[0].binaryType};base64,${data[0].binary}` : null;
        this.fileId = data[0] ?  data[0].fileId : null;
      })
      .catch(err => console.error('error getting file ', err));
  }
}
