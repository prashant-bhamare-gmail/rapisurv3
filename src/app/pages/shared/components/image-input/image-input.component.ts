import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'ngx-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.scss'],
})
export class ImageInputComponent implements OnInit {
  @Output() fileChange = new EventEmitter<File>();
  @Output() filesChange = new EventEmitter<FileList>();
  @Input() file: File = null;
  @Input() document: boolean;
  @Input() enable: boolean;
  @Input() image: string;
  public currentPic: string;
  public files: FileList = null;

  constructor() {}

  ngOnInit() {
    if (this.image) {
      this.currentPic = this.image;
    }
  }

  public onFileChange(files: FileList) {
    const file = files[0];
    if (!file) {
    // TODO emit error?
    } else {
      this.file = file;
      this.fileChange.emit(file);
      this.base64(this.file)
        .then(base64Image => {
        this.currentPic = base64Image;
      });
    }
  }

  public onFilesChange(files) {
    this.filesChange.emit(files);
    this.files = files;
  }

  private base64(file: File): Promise<string> {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data.toString());
      };
    });
  }
}
