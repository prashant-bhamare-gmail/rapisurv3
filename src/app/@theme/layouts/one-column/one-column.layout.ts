import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import {
  AuthService,
  FileService,
  WebStorageService,
  EStorageTarget,
  ProjectService,
  STORAGE_KEY_USER_DATA,
} from '../../../shared/services/public-api';
import { Location } from '@angular/common';
@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  templateUrl: './one-column.layout.html',
})
export class OneColumnLayoutComponent {
  teamsData;
  public teamForm: UntypedFormGroup;

  constructor(
    private projectService: ProjectService,
    private storageService: WebStorageService,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit() {
    this.teamForm = this.formBuilder.group({
      teamId: [null],
    });

    const userData = this.storageService.getItem('userData', {
      target: EStorageTarget.LocalStorage,
    });

    this.projectService.loadAllTeams().subscribe(res => {
      this.teamsData = res.data.map(r => {
        return {
          ...r,
          displayName:
            `${r.name}` + ' ' + `${r.personal_team === true ? '(Main)' : ''}`,
        };
      });
    });

    this.projectService.currentTeam().subscribe(res => {
      this.teamForm.patchValue({ teamId: res.data.id });
      this.storageService.setItem(
        STORAGE_KEY_USER_DATA,
        { ...userData, organisation: res.data },
        {
          target: true
            ? EStorageTarget.LocalStorage
            : EStorageTarget.SessionStorage,
        }
      );
    });
    // .catch((err: Response) => {
    // });
  }

  changeTeam(data) {
    this.projectService.switchTeam(data.id).subscribe(res => {
      location.reload();
    });
    // .catch((err: Response) => {
    // });
  }
}
