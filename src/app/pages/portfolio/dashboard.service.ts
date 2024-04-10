import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }),
}
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  public baseURL = environment.backend.baseUrl;
  public dialogValue = ''
  constructor(private http: HttpClient, private papa: Papa) { }

  getToken() {
    let loginObj = {
      "unmn": 'ONAH',
      "password": '123'
    }
    let url = this.baseURL + '/login'
    return this.http.post<any>(url, loginObj).subscribe(res => {
      localStorage.setItem('access_token', res.data.token[0])
      localStorage.setItem('id', res.data.id)
    })
  }

  getProjects() {
    let url = this.baseURL + 'api/projects'
    return this.http.get(url, httpOptions)
  }

  getProjectByID(id: number) {
    let url = this.baseURL + 'api/projects/' + id
    return this.http.get(url, httpOptions)
  }

  getPortfolioByID(id: number) {
    let url = this.baseURL + 'api/portfolios/' + id
    return this.http.get(url, httpOptions)
  }

  getAllPortfolios() {
    let url = this.baseURL + 'api/portfolios'
    return this.http.get(url, httpOptions)
  }

  getAllCostsByProjectID(projectId) {
    let url = this.baseURL + 'api/project/' + projectId + '/cost'
    return this.http.get(url, httpOptions)
  }

  getCost(projectId, costId, params?) {
    let url = this.baseURL + 'api/project/' + projectId + '/cost/' + costId + '?body=' + params
    return this.http.get(url, httpOptions)
  }

  getProjectFinancialPlanReport(id: number) {
    let url = this.baseURL + 'api/project/' + id + '/financial-plan'
    return this.http.get(url, httpOptions)
  }

  getProjectFinancialPerformanceReport(id: number) {
    let url = this.baseURL + 'api/project/' + id + '/financial-performance'
    return this.http.get(url, httpOptions)
  }

  getProjectCapacityReport(id: number) {
    let url = this.baseURL + 'api/project/' + id + '/capacity-utillization'
    return this.http.get(url, httpOptions)
  }

  getWorkingDays(startDate, endDate) {
    let url = this.baseURL + 'api/work-days' + '?start_date=' + startDate + "&end_date=" + endDate + "&only[]=work_days_count"
    return this.http.get(url, httpOptions)
  }

  getAllusers() {
    let url = this.baseURL + 'api/user/all'
    return this.http.get(url, httpOptions)
  }

  getUsersById(id: number) {
    let url = this.baseURL + 'api/user/show/' + id
    return this.http.get(url, httpOptions)
  }

  getProjectForecastComparisonReport(id: number) {
    let url = this.baseURL + 'api/project/' + id + '/forecast-comparison'
    return this.http.get(url, httpOptions)
  }

  getWorkPlanTemplates() {
    let url = this.baseURL + 'api/work-plans' + '?filter=template'
    return this.http.get(url, httpOptions)
  }

  getWorkPlans(projectId?) {
    let url
    if (projectId) {
      url = this.baseURL + 'api/work-plans?project_id=' + projectId
    } else {
      url = this.baseURL + 'api/work-plans'
    }
    return this.http.get(url, httpOptions)
  }

  getWorkPlanByID(id: number) {
    let url = this.baseURL + 'api/work-plans/' + id
    return this.http.get(url, httpOptions)
  }

  getIssuesByProjectId(id: number) {
    let url = this.baseURL + 'api/project/' + id + '/issues';
    return this.http.get(url, httpOptions);
  }

  createWorkPlan(obj) {
    let url = this.baseURL + 'api/work-plans'
    return this.http.post(url, obj, httpOptions)
  }

  updateWorkPlan(id: number, obj) {
    let url = this.baseURL + 'api/work-plans/' + id
    return this.http.patch(url, obj, httpOptions)
  }

  deleteWorkPlan(id: number) {
    let url = this.baseURL + 'api/work-plans/' + id
    return this.http.delete(url, httpOptions)
  }

  //vendors API
  getAllVendors(page: number, perPage: number) {
    let url = this.baseURL + 'api/vendors' + `?page=${page}&items=${perPage}`
    return this.http.get(url, httpOptions)
  }

  createNewVendor(obj) {
    let url = this.baseURL + 'api/vendors'
    return this.http.post(url, obj, httpOptions)
  }

  getVendorById(id: number) {
    let url = this.baseURL + 'api/vendors/' + id
    return this.http.get(url, httpOptions)
  }

  updateVendor(id: number, obj) {
    let url = this.baseURL + 'api/vendors/' + id
    return this.http.patch(url, obj, httpOptions)
  }

  deleteVendorById(id: number) {
    let url = this.baseURL + 'api/vendors/' + id
    return this.http.delete(url, httpOptions)
  }

  //demand API
  getAllDemands(page: number, perPage: number, filterOptions?) {
    let url = this.baseURL + 'api/demands' + `?page=${page}&items=${perPage}`
    return this.http.get(url, {...httpOptions, params: filterOptions})
  }

  createDemand(obj) {
    let url = this.baseURL + 'api/demands'
    return this.http.post(url, obj, httpOptions)
  }

  getDemandById(id: number) {
    let url = this.baseURL + 'api/demands/' + id
    return this.http.get(url, httpOptions)
  }

  editDemand(id, obj) {
    let url = this.baseURL + 'api/demands/' + id
    return this.http.put(url, obj, httpOptions)
  }

  deleteDemand(id: number) {
    let url = this.baseURL + 'api/demands/' + id
    return this.http.delete(url, httpOptions)
  }

  // share API
  sharePOViaEmail(component, POID: number, obj) {
    let url = this.baseURL + `api/${component}/` + POID + '/share'
    return this.http.post(url, obj, {headers:  {
      "Accept": 'application/json',
    }}
    )
  }

  getSharedEmail(component, POID: number) {
    let url = this.baseURL + `api/${component}/` + POID + '/share'
    return this.http.get(url, httpOptions)
  }

  //BOQ API method
  getBillOfQtyByProjectID(id: number) {
    let url = this.baseURL + `api/project/${id}/bill`
    return this.http.get(url, httpOptions)
  }

  //purchase order API
  getAllPurchases(page: number, perPage: number, filterOptions?) {
    let url = this.baseURL + 'api/purchases' + `?page=${page}&items=${perPage}`
    return this.http.get(url, {...httpOptions, params: filterOptions})
  }

  getPurchaseByProjectId(id: number) {
    let url = this.baseURL + 'api/purchases?project_list_id=' + id
    return this.http.get(url, httpOptions)
  }

  getPurchaseById(id: number) {
    let url = this.baseURL + 'api/purchases/' + id
    return this.http.get(url, httpOptions)
  }

  createPurchase(obj) {
    let url = this.baseURL + 'api/purchases'
    return this.http.post(url, obj, httpOptions)
  }

  editPurchase(id: number, obj) {
    let url = this.baseURL + 'api/purchases/' + id
    return this.http.put(url, obj, httpOptions)
  }

  deletePurchase(id: number) {
    let url = this.baseURL + 'api/purchases/' + id
    return this.http.delete(url, httpOptions)
  }

  // material API Methods
  getMaterialsByProjectId(projectId: number, costId?: number) {
    let url
    if (costId) {
      url = this.baseURL + 'api/project/' + projectId + '/materials/' + costId
    } else {
      url = this.baseURL + 'api/project/' + projectId + '/materials'
    }
    return this.http.get(url, httpOptions)
  }

  getMaterialsByExternalEstimating() {
    let url = this.baseURL + 'api/base-price?usage=external_estimating'
    return this.http.get(url, httpOptions)
  }

  //folder API Methods
  createNewFolder(pId: number , folderName: string) {
    let url = this.baseURL + 'api/folders'
    return this.http.post(url, { project_list_id: pId, folder_name: folderName}, httpOptions)
  }

  createNewIndependentFolder(folderName: string) {
    let url = this.baseURL + 'api/folders'
    return this.http.post(url, { folder_name: folderName}, httpOptions)
  }

  getFolderId(pId: number) {
    let url = this.baseURL + 'api/folders?project_list_id=' + pId
    return this.http.get(url, httpOptions)
  }

  addFileToFolder(folderId: number, formData: FormData) {
    let url = this.baseURL + 'api/folders/'+ folderId + '/files'
    return this.http.post(url, formData, {headers:  {
      "Accept": 'application/json',
    }})
  }

  //Goods API for Items
  getGoodsItems(location?) {
    let url
    if (location) url = this.baseURL + 'api/good-summary?storage_location_id=' + location
    else url = this.baseURL + 'api/good-summary'
    return this.http.get(url, httpOptions)
  }

  getGoods() {
    let url = this.baseURL + 'api/goods'
    return this.http.get(url, httpOptions)
  }

  getGoodsById(id) {
    let url = this.baseURL + 'api/goods/' + id
    return this.http.get(url, httpOptions)
  }

  createGoods(obj) {
    let url = this.baseURL + 'api/goods'
    return this.http.post(url, obj, httpOptions)
  }
  //Department API
  getAllDepartments() {
    let url = this.baseURL + 'api/departments'
    return this.http.get(url, httpOptions)
  }

  createDepartment(obj) {
    let url = this.baseURL + 'api/departments'
    return this.http.post(url, obj, httpOptions)
  }

  getDepartmentByID(id: number) {
    let url = this.baseURL + 'api/departments/' + id
    return this.http.get(url, httpOptions)
  }

  updateDepartment(id: number, obj) {
    let url = this.baseURL + 'api/departments/' + id
    return this.http.patch(url, obj, httpOptions)
  }

  deleteDepartment(id: number) {
    let url = this.baseURL + 'api/departments/' + id
    return this.http.delete(url, httpOptions)
  }

  //Storage Location API
  getAllLocations(filter?) {
    let url
    if (filter) url = this.baseURL + 'api/storage-locations?state=' + filter
    else url = this.baseURL + 'api/storage-locations'
    return this.http.get(url, httpOptions)
  }

  getLocationById(id: number) {
    let url = this.baseURL + 'api/storage-locations/' + id
    return this.http.get(url, httpOptions)
  }

  createLocation(obj) {
    let url = this.baseURL + 'api/storage-locations'
    return this.http.post(url, obj, httpOptions)
  }

  updateLocation(id: number, obj) {
    let url = this.baseURL + 'api/storage-locations/' + id
    return this.http.put(url, obj, httpOptions)
  }

  deleteLocation(id: number) {
    let url = this.baseURL + 'api/storage-locations/' + id
    return this.http.delete(url, httpOptions)
  }

  //Inventory report
  getInventoryReport(page: number, perPage: number, search) {
    let url 
    if (search) url = this.baseURL + 'api/inventory-report'+ `?page=${page}&items=${perPage}&search=${search}`
    else url = this.baseURL + 'api/inventory-report'+ `?page=${page}&items=${perPage}`
    return this.http.get(url, httpOptions)
  }

  getMovementDetails(materialID: number, locId: number) {
    let url = this.baseURL + 'api/inventory-report/'+ materialID + '?storage_location_id='+ locId
    return this.http.get(url, httpOptions)
  }

  // Tracking report
  getTrackingReport(page: number, perPage: number, search) {
    let url 
    if (search) url = this.baseURL + 'api/delivery-report'+ `?page=${page}&items=${perPage}&search=${search}`
    else url = this.baseURL + 'api/delivery-report'+ `?page=${page}&items=${perPage}`
    return this.http.get(url, httpOptions)
  }

  //teams API
  getTeambyOrgId(id: number){
    let url = this.baseURL + 'api/team/'+ id
    return this.http.get(url, httpOptions)
  }

  //Terms API
  createTerm(obj) {
    let url = this.baseURL + 'api/terms'
    return this.http.post(url, obj, httpOptions)
  }

  getAllTerms(getInvoiceTerms= false) {
    let url = this.baseURL + 'api/terms' + (getInvoiceTerms? '?term_type=invoice' : '')
    return this.http.get(url, httpOptions)
  }

  getTermByID(id: number) {
    let url = this.baseURL + 'api/terms/' + id
    return this.http.get(url, httpOptions)
  }

  updateTerm(id: number, obj) {
    let url = this.baseURL + 'api/terms/' + id
    return this.http.patch(url, obj, httpOptions)
  }

  deleteTerm(id: number) {
    let url = this.baseURL + 'api/terms/' + id
    return this.http.delete(url, httpOptions)
  }

  //Issues API

  getAllIssues(id: number) {
    let url = this.baseURL + 'api/issues?project='+ id
    return this.http.get(url, httpOptions)
  }

  getElementsByProjectId(id: number) {
    let url = this.baseURL + 'api/project/' + id + '/element?used=true'
    return this.http.get(url, httpOptions)
  }

  getElementDescriptionById(id: number, projectId) {
    let url = this.baseURL + 'api/bill-desc?element=' + id + '&items=100&project_list_id=' + projectId
    return this.http.get(url, httpOptions)
  }

  //collaborators API methods
  getCollaboratorsByProjectID(id: number) {
    let url = this.baseURL + 'api/project/' + id + '/collaborators'
    return this.http.get(url, httpOptions)
  }

  getIncomingCollaborators() {
    let url = this.baseURL + 'api/collaboration?filter=incoming'
    return this.http.get(url, httpOptions)
  }

  getOutgoingCollaborators() {
    let url = this.baseURL + 'api/collaboration?filter=outgoing'
    return this.http.get(url, httpOptions)
  }

  //Unit API
  getAllUnits() {
    let url = this.baseURL + 'api/unit'
    return this.http.get(url, httpOptions)
  }

  //invoices API methods
  getAllInvoices(filter, page, perPage, filterOption?) {
    let url = this.baseURL + 'api/invoices?invoice_type=' + filter + `&page=${page}&items=${perPage}`
    return this.http.get(url, {...httpOptions, params: filterOption})
  }

  createInvoice(obj) {
    let url = this.baseURL + 'api/invoices'
    return this.http.post(url, obj, httpOptions)
  }

  getInvoiceById(id: number) {
    let url = this.baseURL + 'api/invoices/' + id
    return this.http.get(url, httpOptions)
  }

  editInvoice(id: number, obj) {
    let url = this.baseURL + 'api/invoices/' + id
    return this.http.put(url, obj, httpOptions)
  }

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

  transformTableHeader(data: any) {
    let obj: any[] = []
    Object.entries(data).map(([property, value]) => {
      obj.push({
        label: this.getLabel(property),
        property: property,
        visible: value ? value : true,
      })

    });
    return obj
  }

  getLabel(property: string): string {
    const capitalFirst = property.replace(/([A-Z])/g, ' $1')
    const label = capitalFirst.replace(/_/g, ' ');
    const modifiedLabel = label.replace('per', '%').replace(/\b\w/g, c => c.toUpperCase());
    const words = modifiedLabel.split(' ');
    const capitalizedWords = words.map(word => word.length <= 3 ? word.toUpperCase() : word);
    return capitalizedWords.join(' ');
  }
}
