import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IEnvironment } from './environment.model';
import { STORAGE_KEY_TOKEN, STORAGE_KEY_USER, STORAGE_KEY_USER_DATA, ROLES_PERMISSIONS, STORAGE_KEY_LICENCSE, STORAGE_KEY_PERMISSIONSERIAL, STORAGE_KEY_USERNAME, STORAGE_KEY_CRUDPERMISSIONS, STORAGE_KEY_VIEWPERMISSIONS, ENVIRONMENT_INJECT_TOKEN } from './constants';
import { WebStorageService, EStorageTarget } from './storage.service';
import { IViewPermissions, ICRUDPermissions } from './models';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = new BehaviorSubject<string>('');
  private userData = new BehaviorSubject<string>('');
  private user = new BehaviorSubject<string>(null);
  private currentPage = new BehaviorSubject<string>('');

  private permissionSerial = new BehaviorSubject<string>('');

  private crudPermissions = new BehaviorSubject<Partial<ICRUDPermissions[]>>([]);
  private viewPermissions = new BehaviorSubject<Partial<IViewPermissions[]>>([]);
  private apiBase = '';

  constructor(
    private storageService: WebStorageService,
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    @Inject(ENVIRONMENT_INJECT_TOKEN) private env: IEnvironment,
  ) {
    this.apiBase = this.env.backend.baseUrl;
    const _token =
      this.storageService.getItem(STORAGE_KEY_TOKEN, {
        target: EStorageTarget.LocalStorage,
      }) ||
      this.storageService.getItem(STORAGE_KEY_TOKEN, {
        target: EStorageTarget.SessionStorage,
      });
    if (_token) {
      this.token.next(_token);
    }

    const _permissionSerial =
      this.storageService.getItem(STORAGE_KEY_PERMISSIONSERIAL, {
        target: EStorageTarget.LocalStorage,
      }) ||
      this.storageService.getItem(STORAGE_KEY_PERMISSIONSERIAL, {
        target: EStorageTarget.SessionStorage,
      });
    if (_permissionSerial) {
      this.permissionSerial.next(_permissionSerial);
    }


    const _user =
      this.storageService.getItem(STORAGE_KEY_USER, {
        target: EStorageTarget.LocalStorage,
      }) ||
      this.storageService.getItem(STORAGE_KEY_USER, {
        target: EStorageTarget.SessionStorage,
      });
    if (_user) {
      this.user.next(_user);
    }


    const _userData =
      this.storageService.getItem(STORAGE_KEY_USER_DATA, {
        target: EStorageTarget.LocalStorage,
      }) ||
      this.storageService.getItem(STORAGE_KEY_USER_DATA, {
        target: EStorageTarget.SessionStorage,
      });
    if (_userData) {
      this.userData.next(_userData);
    }

    const _crudPermissions =
      this.storageService.getItem(STORAGE_KEY_CRUDPERMISSIONS, {
        target: EStorageTarget.LocalStorage,
      }) ||
      this.storageService.getItem(STORAGE_KEY_CRUDPERMISSIONS, {
        target: EStorageTarget.SessionStorage,
      });
    if (_crudPermissions) {
      this.crudPermissions.next(_crudPermissions);
    }

    const _viewPermissions =
      this.storageService.getItem(STORAGE_KEY_VIEWPERMISSIONS, {
        target: EStorageTarget.LocalStorage,
      }) ||
      this.storageService.getItem(STORAGE_KEY_VIEWPERMISSIONS, {
        target: EStorageTarget.SessionStorage,
      });
    if (_viewPermissions) {
      this.viewPermissions.next(_viewPermissions);
    }

  }

  public get token$() {
    return this.token.asObservable();
  }

  public get currentPage$() {
    return this.currentPage.asObservable();
  }

  public get userData$() {
    return this.userData.asObservable();
  }


  public get permissionSerial$() {
    return this.permissionSerial.asObservable();
  }

  public get viewPermissions$() {
    return this.viewPermissions.asObservable();
  }

  public get crudPermissions$() {
    return this.crudPermissions.asObservable();
  }


  public getZones() {
    const url = this.apiBase + 'api/zones';
    return this.http
      .get<any>(url)
      .toPromise()
      .then(response => {
        console.log('response', response)
        return response;
      });
  }

  public getCountry() {
    const url = this.apiBase + 'api/country';
    return this.http
      .get<any>(url)
      .toPromise()
      .then(response => {
        console.log('response', response)
        return response;
      });
  }

  public register(payload) {
    const url = this.apiBase + 'api/create';
    return this.http
      .post<any>(url, payload)
      .toPromise()
      .then(response => {
        console.log('response', response)
        // const token = response.accessToken;
        // this.token.next(token);
        // this.storageService.setItem(STORAGE_KEY_TOKEN, token, {
        //   target: EStorageTarget.LocalStorage,
        // });
        // this.storageService.setItem('path', 'check-verification', {
        //   target: EStorageTarget.LocalStorage,
        // });

        return response;
      });
  }

  public checkAuthState(unmn: string) {
    const url = this.apiBase + `api/login?unmn=${unmn}`;
    return this.http
      .get<any>(url)
      .toPromise()
      .then(response => {
        console.log('response unm', response)
        return response;
      })
  }

  public login(unmn: string, password: string, rememberUser: boolean, code, recovery_code) {
    let payload = {};
    if (password) {
      payload = { unmn: unmn, password };
    }
    if (code) {
      payload = { unmn: unmn, code };
    }
    if (recovery_code) {
      payload = { unmn: unmn, recovery_code };
    }
    console.log('payload', payload)
    const url = this.apiBase + 'api/login';
    return this.http
      .post<any>(url, payload)
      .toPromise()
      .then(response => {
        console.log('response', response)
//return;
        if (response.status === 200) {

          let role = response.roles.find(n => n.name === 'collaborator');
          console.log('role', role)
          if (role && !response.data.license) {
            this.storageService.setItem('path', response.status === 206 ? 'check-verification' : '/app/collaboration/view/incoming', {
              target: rememberUser
                ? EStorageTarget.LocalStorage
                : EStorageTarget.SessionStorage,
            });
          } else {
            this.storageService.setItem('path', response.status === 206 ? 'check-verification' : '/app/dashboard', {
              target: rememberUser
                ? EStorageTarget.LocalStorage
                : EStorageTarget.SessionStorage,
            });
          }


          console.log('response.data', response.data)
          const userData = response.data;
          console.log('userData', userData)
          const username = response.data.unmn;
          const token = response.data.token[0];
          console.log('token', token)
          this.user.next(username);
          this.storageService.setItem(STORAGE_KEY_USERNAME, username, {
            target: rememberUser
              ? EStorageTarget.LocalStorage
              : EStorageTarget.SessionStorage,
          });

          this.storageService.setItem(STORAGE_KEY_LICENCSE, response.data.license, {
            target: rememberUser
              ? EStorageTarget.LocalStorage
              : EStorageTarget.SessionStorage,
          });

          this.userData.next(userData);
          this.storageService.setItem(STORAGE_KEY_USER_DATA, { ...userData, roles: response.roles }, {
            target: rememberUser
              ? EStorageTarget.LocalStorage
              : EStorageTarget.SessionStorage,
          });

          this.storageService.setItem(ROLES_PERMISSIONS,  response.permissions , {
            target: rememberUser
              ? EStorageTarget.LocalStorage
              : EStorageTarget.SessionStorage,
          });         

          this.token.next(token);
          this.storageService.setItem(STORAGE_KEY_TOKEN, token, {
            target: rememberUser
              ? EStorageTarget.LocalStorage
              : EStorageTarget.SessionStorage,
          });

        }

     
        return response;
      });
  }


  public checkUserLogin(email) {
    const url = this.apiBase + `api/login?email=${email}`;
    return this.http.get<any>(url)
      .toPromise()
      .then(response => {
        return response;
      });
  }

  public createGuestUser(payload) {

    let rememberUser = true;
    console.log('payload', payload)
    const url = this.apiBase + 'api/create';
    return this.http
      .post<any>(url, payload)
      .toPromise()
      .then(response => {
        console.log('response', response)

        if (response.status === 200) {
          this.storageService.setItem('path', response.status === 206 ? 'check-verification' : '/app/dashboard', {
            target: rememberUser
              ? EStorageTarget.LocalStorage
              : EStorageTarget.SessionStorage,
          });
          console.log('response.data', response.data)
          const userData = response.data;
          console.log('userData', userData)
          const username = response.data.unmn;
          const token = response.data.token[0];
          console.log('token', token)
          this.user.next(username);
          this.storageService.setItem(STORAGE_KEY_USERNAME, username, {
            target: rememberUser
              ? EStorageTarget.LocalStorage
              : EStorageTarget.SessionStorage,
          });

          this.storageService.setItem(STORAGE_KEY_LICENCSE, response.data.license, {
            target: rememberUser
              ? EStorageTarget.LocalStorage
              : EStorageTarget.SessionStorage,
          });

          this.userData.next(userData);
          this.storageService.setItem(STORAGE_KEY_USER_DATA, { ...userData, roles: response.roles }, {
            target: rememberUser
              ? EStorageTarget.LocalStorage
              : EStorageTarget.SessionStorage,
          });

          this.token.next(token);
          this.storageService.setItem(STORAGE_KEY_TOKEN, token, {
            target: rememberUser
              ? EStorageTarget.LocalStorage
              : EStorageTarget.SessionStorage,
          });

        }

        return response;
      });
  }

  public findNumberRangeByObjectType2(object, type) {
    const url = this.apiBase + `items-list/number-range/${object}/${type}`;
    return this.http.get<any>(url).toPromise()
      .then(response => {
        console.log('response', response)
        return response;
      });
  }


  registerLogin(response, rememberUser) {
    this.storageService.setItem('path', response.status === 206 ? 'check-verification' : '/app/dashboard', {
      target: rememberUser
        ? EStorageTarget.LocalStorage
        : EStorageTarget.SessionStorage,
    });
    console.log('response.data', response.data)
    const userData = response.data;
    console.log('userData', userData)
    const username = response.data.unmn;
    const token = response.data.token[0];
    console.log('token', token)
    this.user.next(username);
    this.storageService.setItem(STORAGE_KEY_USERNAME, username, {
      target: rememberUser
        ? EStorageTarget.LocalStorage
        : EStorageTarget.SessionStorage,
    });

    this.userData.next(userData);
    this.storageService.setItem(STORAGE_KEY_USER_DATA, { ...userData, roles: response.roles }, {
      target: rememberUser
        ? EStorageTarget.LocalStorage
        : EStorageTarget.SessionStorage,
    });

    this.token.next(token);
    this.storageService.setItem(STORAGE_KEY_TOKEN, token, {
      target: rememberUser
        ? EStorageTarget.LocalStorage
        : EStorageTarget.SessionStorage,
    });
  }


  public clientLogin(username: string, password: string, rememberUser: boolean) {
    const payload = { username: username, password };

    const url = this.apiBase + 'clients/login';
    return this.http
      .post<any>(url, payload)
      .toPromise()
      .then(response => {
        if (response.status === 200) {
          const token = response.accessToken;
          const username = response.name;

          this.token.next(token);
          this.storageService.setItem(STORAGE_KEY_TOKEN, token, {
            target: true
              ? EStorageTarget.LocalStorage
              : EStorageTarget.SessionStorage,
          });

          this.user.next(username);
          this.storageService.setItem(STORAGE_KEY_USERNAME, username, {
            target: true
              ? EStorageTarget.LocalStorage
              : EStorageTarget.SessionStorage,
          });
        }
        return response;
      });
  }

  setCurrentPage(text) {
    this.currentPage.next(text);
  }

  public clientSignUp(email: string, password: string, phone: string, name: string) {
    const payload = { email, password, phone, name };

    const url = this.apiBase + 'clients/createOnline';
    return this.http
      .post<any>(url, payload)
      .toPromise()
      .then(response => {
        return response;
      });
  }

  public verifyAccount(verificationCode, phone, email) {
    const payload = { verificationCode, phone, email };

    const url = this.apiBase + 'clients/verifyOnline';
    return this.http
      .post<any>(url, payload)
      .toPromise()
      .then(response => {
        if (response.status === 206 || response.status === 200) {
          const token = response.accessToken;
          const username = response.name;

          this.token.next(token);
          this.storageService.setItem(STORAGE_KEY_TOKEN, token, {
            target: true
              ? EStorageTarget.LocalStorage
              : EStorageTarget.SessionStorage,
          });

          this.user.next(username);
          this.storageService.setItem(STORAGE_KEY_USERNAME, username, {
            target: true
              ? EStorageTarget.LocalStorage
              : EStorageTarget.SessionStorage,
          });

        }
        return response;
      });
  }


  public verifyAdminAccount(verificationCode, email) {
    const payload = { verificationCode, email };

    const url = this.apiBase + 'users/verifyAdminAccount';
    return this.http
      .post<any>(url, payload)
      .toPromise()
      .then(response => {
        console.log('response', response)
        if (response.status === 206 || response.status === 200) {
          const token = response.accessToken;
          const permissionSerial = response.permissionSerial;
          const username = response.username;
          const crudPermissions = response.crudPermissions;
          const viewPermissions = response.viewPermissions;
          const roleId = response.roleId;
          this.storageService.setItem('path', response.status === 206 ? 'check-verification' : '/app/dashboard', {
            target: true
              ? EStorageTarget.LocalStorage
              : EStorageTarget.SessionStorage,
          });
          this.token.next(token);
          this.storageService.setItem(STORAGE_KEY_TOKEN, token, {
            target: true
              ? EStorageTarget.LocalStorage
              : EStorageTarget.SessionStorage,
          });

          this.permissionSerial.next(permissionSerial);
          this.storageService.setItem(STORAGE_KEY_PERMISSIONSERIAL, permissionSerial, {
            target: true
              ? EStorageTarget.LocalStorage
              : EStorageTarget.SessionStorage,
          });

          this.user.next(username);
          this.storageService.setItem(STORAGE_KEY_USERNAME, username, {
            target: true
              ? EStorageTarget.LocalStorage
              : EStorageTarget.SessionStorage,
          });


          this.crudPermissions.next(crudPermissions);
          this.storageService.setItem(STORAGE_KEY_CRUDPERMISSIONS, crudPermissions, {
            target: EStorageTarget.LocalStorage
          });

          this.viewPermissions.next(viewPermissions);
          this.storageService.setItem(STORAGE_KEY_VIEWPERMISSIONS, viewPermissions, {
            target: EStorageTarget.LocalStorage
          });
        }
        return response;
      });
  }


  public changePassword(verificationCode, password, phone, email) {
    const payload = { verificationCode, password, phone, email };
    const url = this.apiBase + 'clients/changePassword';
    return this.http
      .post<any>(url, payload)
      .toPromise()
      .then(response => {
        if (response.status === 206 || response.status === 200) {
          const token = response.accessToken;
          const username = response.name;

          this.token.next(token);
          this.storageService.setItem(STORAGE_KEY_TOKEN, token, {
            target: true
              ? EStorageTarget.LocalStorage
              : EStorageTarget.SessionStorage,
          });

          this.user.next(username);
          this.storageService.setItem(STORAGE_KEY_USERNAME, username, {
            target: true
              ? EStorageTarget.LocalStorage
              : EStorageTarget.SessionStorage,
          });

        }
        return response;
      });
  }


  public resetPassword(email: string) {
    const payload = { email };

    const url = this.apiBase + 'users/resetPassword';
    return this.http
      .post<any>(url, payload)
      .toPromise()
      .then(response => {
        return response;
      });
  }

  public resetAdminPassword(email: string, phone: string) {
    const payload = { email, phone };

    const url = this.apiBase + 'users/resetPassword';
    return this.http
      .post<any>(url, payload)
      .toPromise()
      .then(response => {
        return response;
      });
  }

  public changeAdminPassword(verificationCode, password) {
    const payload = { verificationCode, password };
    const url = this.apiBase + 'auth/changePassword';
    return this.http
      .post<any>(url, payload)
      .toPromise()
      .then(response => {
        if (response.status === 206 || response.status === 200) {

          const token = response.accessToken;
          const permissionSerial = response.permissionSerial;
          const username = response.username;
          const crudPermissions = response.crudPermissions;
          const viewPermissions = response.viewPermissions;
          const roleId = response.roleId;
          this.storageService.setItem('path', response.status === 206 ? 'add-company' : '/app/dashboard', {
            target: true
              ? EStorageTarget.LocalStorage
              : EStorageTarget.SessionStorage,
          });
          this.token.next(token);
          this.storageService.setItem(STORAGE_KEY_TOKEN, token, {
            target: true
              ? EStorageTarget.LocalStorage
              : EStorageTarget.SessionStorage,
          });

          this.permissionSerial.next(permissionSerial);
          this.storageService.setItem(STORAGE_KEY_PERMISSIONSERIAL, permissionSerial, {
            target: true
              ? EStorageTarget.LocalStorage
              : EStorageTarget.SessionStorage,
          });

          this.user.next(username);
          this.storageService.setItem(STORAGE_KEY_USERNAME, username, {
            target: true
              ? EStorageTarget.LocalStorage
              : EStorageTarget.SessionStorage,
          });


          this.crudPermissions.next(crudPermissions);
          this.storageService.setItem(STORAGE_KEY_CRUDPERMISSIONS, crudPermissions, {
            target: EStorageTarget.LocalStorage
          });

          this.viewPermissions.next(viewPermissions);
          this.storageService.setItem(STORAGE_KEY_VIEWPERMISSIONS, viewPermissions, {
            target: EStorageTarget.LocalStorage
          });

          // const token = response.accessToken;
          // const username = response.name;

          // this.token.next(token);
          // this.storageService.setItem(STORAGE_KEY_TOKEN, token, {
          //   target: true
          //     ? EStorageTarget.LocalStorage
          //     : EStorageTarget.SessionStorage,
          // });

          // this.user.next(username);
          // this.storageService.setItem(STORAGE_KEY_USERNAME, username, {
          //   target: true
          //     ? EStorageTarget.LocalStorage
          //     : EStorageTarget.SessionStorage,
          // });

        }
        return response;
      });
  }


  public companylogin(response) {
    if (response.status === 206 || response.status === 200) {
      const token = response.accessToken;
      const permissionSerial = response.permissionSerial;
      const username = response.username;
      const crudPermissions = response.crudPermissions;
      const viewPermissions = response.viewPermissions;
      const roleId = response.roleId;
      this.storageService.setItem('path', response.status === 206 ? 'add-company' : '/app/dashboard', {
        target: true
          ? EStorageTarget.LocalStorage
          : EStorageTarget.SessionStorage,
      });
      this.token.next(token);
      this.storageService.setItem(STORAGE_KEY_TOKEN, token, {
        target: true
          ? EStorageTarget.LocalStorage
          : EStorageTarget.SessionStorage,
      });

      this.permissionSerial.next(permissionSerial);
      this.storageService.setItem(STORAGE_KEY_PERMISSIONSERIAL, permissionSerial, {
        target: true
          ? EStorageTarget.LocalStorage
          : EStorageTarget.SessionStorage,
      });

      this.user.next(username);
      this.storageService.setItem(STORAGE_KEY_USERNAME, username, {
        target: true
          ? EStorageTarget.LocalStorage
          : EStorageTarget.SessionStorage,
      });


      this.crudPermissions.next(crudPermissions);
      this.storageService.setItem(STORAGE_KEY_CRUDPERMISSIONS, crudPermissions, {
        target: EStorageTarget.LocalStorage
      });

      this.viewPermissions.next(viewPermissions);
      this.storageService.setItem(STORAGE_KEY_VIEWPERMISSIONS, viewPermissions, {
        target: EStorageTarget.LocalStorage
      });
    }
  }

  public logout() {


    this.storageService.removeItem(STORAGE_KEY_USERNAME, {
      target: EStorageTarget.LocalStorage,
    });
    this.storageService.removeItem(STORAGE_KEY_USERNAME, {
      target: EStorageTarget.SessionStorage,
    });

    this.storageService.removeItem(STORAGE_KEY_USER_DATA, {
      target: EStorageTarget.LocalStorage,
    });
    this.storageService.removeItem(STORAGE_KEY_USER_DATA, {
      target: EStorageTarget.SessionStorage,
    });



    this.storageService.removeItem(STORAGE_KEY_TOKEN, {
      target: EStorageTarget.LocalStorage,
    });
    this.storageService.removeItem(STORAGE_KEY_TOKEN, {
      target: EStorageTarget.SessionStorage,
    });
    this.storageService.removeItem('path', {
      target: EStorageTarget.LocalStorage,
    });
    this.storageService.removeItem('path', {
      target: EStorageTarget.SessionStorage,
    });
    ////

    this.storageService.removeItem(STORAGE_KEY_CRUDPERMISSIONS, {
      target: EStorageTarget.LocalStorage,
    });
    this.storageService.removeItem(STORAGE_KEY_CRUDPERMISSIONS, {
      target: EStorageTarget.SessionStorage,
    });
    this.storageService.removeItem(STORAGE_KEY_VIEWPERMISSIONS, {
      target: EStorageTarget.LocalStorage,
    });
    this.storageService.removeItem(STORAGE_KEY_VIEWPERMISSIONS, {
      target: EStorageTarget.SessionStorage,
    });
    this.storageService.removeItem(STORAGE_KEY_PERMISSIONSERIAL, {
      target: EStorageTarget.LocalStorage,
    });
    this.storageService.removeItem(STORAGE_KEY_PERMISSIONSERIAL, {
      target: EStorageTarget.SessionStorage,
    });
    this.viewPermissions.next(null);
    this.crudPermissions.next(null);
    this.permissionSerial.next(null);
    this.user.next(null);
    this.userData.next(null);
    this.token.next('');
  }

  public get authenticated() {
    if (!this.token.getValue()) {
      return false;
    }
    return true;//!this.jwtHelper.isTokenExpired(this.token.getValue());
  }

  public get expired() {
    if (!this.token.getValue()) {
      return true;
    }
    return false;//this.jwtHelper.isTokenExpired(this.token.getValue());
  }

  public get permissions() {
    if (!this.permissionSerial.getValue()) {
      return {
        viewPermissions: [],
        crudPermissions: [],
        selectedCompanies: []
      };
    }
    return {
      crudPermissions: this.jwtHelper.decodeToken(this.permissionSerial.getValue()).crudPermissions,
      viewPermissions: this.jwtHelper.decodeToken(this.permissionSerial.getValue()).viewPermissions,
      selectedCompanies: this.jwtHelper.decodeToken(this.permissionSerial.getValue()).selectedCompanies
    };
  }

  public get decodeToken() {
    // if (!this.token.getValue()) {
    //   return true;
    // }
    return {
      username: "", userId: "", bussinessType: "", userType: "", email: "", companyId: {
        country: { countryId: "" }
      }
    };//this.jwtHelper.decodeToken(this.token.getValue());
  }

  public get getUser() {
    return this.userData.getValue()
  }

  public get getTokenExpirationDate() {
    if (!this.token.getValue()) {
      return true;
    }
    return 'jk';//this.jwtHelper.getTokenExpirationDate(this.token.getValue());
  }


  public get getToken() {
    if (!this.token.getValue()) {
      return true;
    }
    return this.token.getValue();
  }



  public get user$() {
    return this.user.asObservable();
  }




}
