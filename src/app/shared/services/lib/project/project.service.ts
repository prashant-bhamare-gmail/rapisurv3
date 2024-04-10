import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ENVIRONMENT_INJECT_TOKEN } from '../shared/constants';
import { IEnvironment } from '../shared/environment.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiBase = '';
  constructor(
    private http: HttpClient,
    @Inject(ENVIRONMENT_INJECT_TOKEN) private env: IEnvironment,
  ) {
    this.apiBase = this.env.backend.baseUrl;
  }
 
  public currentTeam() {
    const url = this.apiBase + 'api/team/current';
    return this.http.get<any>(url)
  }

  public loadAllTakeoff(page) {
    const url = this.apiBase + `api/project?page=${page}&sort=updated_at&order=desc`;
    return this.http.get<any>(url);
  }

  public createFolder(payload: any) {
    const url = this.apiBase + 'api/folders';
    return this.http.post<any>(url, payload)
      .toPromise()
      .then(response => {
        return response;
      });
  }

  public createProject(payload: any) {
    const url = this.apiBase + 'api/projects';
    return this.http
      .post<any>(url, payload)
      .toPromise()
      .then(response => {
        return response;
      });
  }

  public loadAllTakeOffCombined(project) {
    const url = this.apiBase + `api/project/${project}/take-off?combine=true`;
    return this.http
      .get<any>(url)
      .toPromise()
      .then(response => {
        return response;
      });
  }

  public getAllBoqBids(id) {
    const url = this.apiBase + `api/bids?boq=${id}`;
    return this.http.get<any>(url)
      .toPromise()
      .then(response => {
        return response;
      });
  }

  public compareBid(payload) {
    const url = this.apiBase + `api/bids/compare`;
    return this.http.post<any>(url, { bid: payload });
  }

  public wipSummary(payload) {
    const url = this.apiBase + `api/bids/compare`;
    return this.http.post<any>(url, { bid: payload });
  }

  public getAllBids() {
    const url = this.apiBase + `api/bids?items=1000`;
    return this.http.get<any>(url);
  }

  public loadCost(project, costId) {
    const url = this.apiBase + `api/project/${project}/cost/${costId}`;
    return this.http.get<any>(url);
  }

  public loadVariationForm(project) {
    const url = this.apiBase + `api/valuation-form?project_id=${project}&items=1000`;
    return this.http.get<any>(url);
  }

  public getAllCosts() {
    const url = this.apiBase + `api/costs?items=100`;
    return this.http.get<any>(url);
  }

  
  public loadAllSharedBills() {
    const url = this.apiBase + `api/bills?shared=true&items=1000`;
    // const url = this.apiBase + `api/bids?items=1000`;
    return this.http.get<any>(url);
  }

  public webAccess() {
    const url = this.apiBase + `api/web-access`;
    return this.http.get<any>(url)
  }

  public compareEstimate(payload) {
    const url = this.apiBase + `api/estimate/compare`;
    console.log('p', { estimate: payload })
    return this.http.post<any>(url, { estimate: payload });
  }


  public switchTeam(id: any) {
    const url = this.apiBase + `api/team/${id}/switch`;
    return this.http.get<any>(url);
  }

  public loadAllTeams() {
    const url = this.apiBase + `api/team`;
    return this.http.get<any>(url);     
  }

  public loadProjects(page, search) {
    let url;
    if (search) {
      url = this.apiBase + `api/project?page=${page}&sort=updated_at&items=1000&order=desc&search=${search}`;
    } else {
      url = this.apiBase + `api/project?page=${page}&items=1000&sort=updated_at&order=desc`;
    }

    return this.http.get<any>(url)
  }

  public filterProjectByWorkPlan(value) {
    let url = this.apiBase + `api/projects?items=1000&work-plan=${value}`;
    return this.http.get<any>(url)
  }

  public loadAllProjectById(projectId) {
    const url = this.apiBase + `api/project/${projectId}`;
    return this.http.get<any>(url);
  }

  public updateDescription(payload: any, id) {
    const url = this.apiBase + `api/project/${id}`;
    return this.http.put<any>(url, payload);
  }


}
