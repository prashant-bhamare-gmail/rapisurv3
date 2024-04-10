export interface ITakeoff {
  forecastProductId: string;
  id: number;
  product: string
  companyId: string;
  createdBy: string;  
  createdDate: Date;
  updatedBy: string;  
  updatedDate: Date; 
}

export interface IRoles {
  roleId: string;
  roleName: string;
  createdBy: string;
  createdDate: Date;
  updatedBy: string;
  updatedDate: Date;
}

export interface IViewPermissions {
  pageViewPermissionsId: string;
  id: number;
  pageName: string;
  roleId: IRoles;
  actionStatus: number;
  createdBy: string;
  createdDate: Date;
  updatedBy: string;
  updatedDate: Date;
}

export interface ICRUDPermissions {
  id: number;
  pageCRUDPermissionsId: string;
  pageName: string;
  roleId: IRoles;
  action: string;
  actionStatus: number;
  createdBy: string;
  createdDate: Date;
  updatedBy: string;
  updatedDate: Date;
}


// Files
export interface IFile {
  binary: string;
  binaryType: string;
  createdBy: string;
  createdDate: string;
  documentType: EFileType;
  fileId: string;
  fileName: string;
  updatedBy: string;
  updatedDate: string;
}

export enum EFileStorers {
  project = 'project',
}

export enum EFileType {
  profilePic = 'profilePic',
  document = 'document',
}

