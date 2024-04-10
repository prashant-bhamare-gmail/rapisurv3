import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ENVIRONMENT_INJECT_TOKEN } from '../shared/constants';
import { IEnvironment } from '../shared/environment.model';
import { EFileStorers, IFile } from './models';
import {  forkJoin } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FileService {
  private apiBase = '';

  constructor(
    private http: HttpClient,
    @Inject(ENVIRONMENT_INJECT_TOKEN) private env: IEnvironment,
  ) {
    this.apiBase = this.env.backend.baseUrl;
  }

  public getFiles(fileId: string, format: string) {
    const url = this.apiBase + 'files';

    return this.http
      .get(`${url}`);
  }

  public getFile(fileId: string, documentType: string) {
    const url = this.apiBase + `files/${documentType}/${fileId}`;
    return this.http
      .get(`${url}`);
  }


  public createFile(file: File, desr: string) {
    const input = new FormData();
    input.append('desr', desr);
    input.set('document', file);
    console.log('file', file) 
    console.log(input);  
    const url = this.apiBase + 'api/legacy/bid';
    return this.http.post<any>(url, input).toPromise()
    .then(response => {
      return response;
    });
  }
 
  public deleteFile(fileId: string) {
    const url = this.apiBase + `files/${fileId}`;
    return this.http.delete(url);
  }
}

