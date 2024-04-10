import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { ENVIRONMENT_INJECT_TOKEN } from '../shared/constants';
import { IEnvironment } from '../shared/environment.model';
import { Papa } from 'ngx-papaparse';
import * as XLSX from 'xlsx';
@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private apiBase = '';
  private chatApi = 'https://qa.chat.rapisurv.com/api/';
  //private chatApi = 'http://localhost:4050/api/';
  public dialogValue = ''
  public activePortfolioId: number = 3;
  constructor(
    private http: HttpClient,
    @Inject(ENVIRONMENT_INJECT_TOKEN) private env: IEnvironment,
    private papa: Papa
  ) {
    this.apiBase = this.env.backend.baseUrl + 'api';
  }

  createPortfolio(projectIds: number[], des: string){
    let url = this.apiBase + '/portfolios'
    let body = {
      'project_id': projectIds,
      'desr': des
    }
      return this.http.post(url, body)
  }

  getProjects(){
    let url = this.apiBase + '/project'
      return this.http.get(url)
  }

  deletePortfolio(id: number){
    let url = this.apiBase + '/portfolios/'+ id
      return this.http.delete(url)
  }

  getProjectByID(id: number){
    let url = this.apiBase + '/project/'+ id
      return this.http.get(url)
  }

  getPortfolioByID(id: number){
    let url = this.apiBase + '/portfolios/' + id
      return this.http.get(url)
  }

  getAllPortfolios(){
    let url = this.apiBase + '/portfolios'
      return this.http.get(url)
  }

  getProjectFinancialPlanReport(id: number){
    let url = this.apiBase + '/project/' + id + '/financial-plan'
      return this.http.get(url)
  }

  getProjectFinancialPerformanceReport(id: number){
    let url = this.apiBase + '/project/' + id + '/financial-performance'
      return this.http.get(url)
  }

  getProjectCapacityReport(id: number){
    let url = this.apiBase + '/project/' + id + '/capacity-utillization'
      return this.http.get(url)
  }

  getProjectForecastComparisonReport(id: number){
    let url = this.apiBase + '/project/' + id + '/forecast-comparison'
      return this.http.get(url)
  }

  // CSVFileHandler(data: any, calledFrom: string, headersName: any) {
  //   const visibleHeaders = headersName
  //     .filter((item: any) => item.visible === true)
  //     .map((item: any) => item.label);
  
  //   const visibleProperties = headersName
  //     .filter((item: any) => item.visible === true)
  //     .map((item: any) => item.property);
  
  //   const csvData = data.map((row: any) => {
  //     const rowData: any = {};
  //     visibleProperties.forEach((property: any, index: number) => {
  //       rowData[visibleHeaders[index]] = row[property]; 
  //     });
  //     return rowData;
  //   });
  
  //   const csv = this.papa.unparse({
  //     fields: visibleHeaders,
  //     data: csvData,
  //   });
  
  //   const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  //   const csvURL = window.URL.createObjectURL(blob);
  //   const tempLink = document.createElement('a');
  //   tempLink.href = csvURL;
  //   tempLink.setAttribute('download', `${calledFrom}.csv`);
  //   tempLink.click();
  // }

  excelFileHandler(data: any, calledFrom: string, headersName: any) {
    const visibleHeaders = headersName
      .filter((item: any) => item.visible === true)
      .map((item: any) => item.label);
  
    const visibleProperties = headersName
      .filter((item: any) => item.visible === true)
      .map((item: any) => item.property);
  
    const excelData = data.map((row: any) => {
      const rowData: any = {};
      visibleProperties.forEach((property: any, index: number) => {
        rowData[visibleHeaders[index]] = row[property];
      });
      return rowData;
    });
  
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
    
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
    const excelURL = window.URL.createObjectURL(blob);
    const tempLink = document.createElement('a');
    tempLink.href = excelURL;
    tempLink.setAttribute('download', `${calledFrom}.xlsx`);
    tempLink.click();
  }

  transformTableHeader(data: any){
    let obj:any[] = []
    Object.entries(data).map(([property, value]) => {
      obj.push({
        label: this.getLabel(property),
        property: property,
        visible: value? value : true,
      })
        
    });    
    return obj
  }

  getLabel(property: string): string {
    const label = property.replace(/_/g, ' ');
    const modifiedLabel = label.replace('per', '%').replace(/\b\w/g, c => c.toUpperCase());
    const words = modifiedLabel.split(' ');
    const capitalizedWords = words.map(word => word.length === 3 ? word.toUpperCase() : word);
    return capitalizedWords.join(' ');
}

}
