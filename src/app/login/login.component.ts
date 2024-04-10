import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NbToastrService, NbMenuItem, } from '@nebular/theme';
import { AuthService, WebStorageService, EStorageTarget } from '../shared/services/public-api';
import { NgxSpinnerService } from "ngx-spinner";
import { ENVIRONMENT_INJECT_TOKEN } from '../shared/services/lib/shared/constants';
import { IEnvironment } from '../shared/services/lib/shared/environment.model';
interface Response { status: number, msg: string, error: { status: number, message: string, errors: any } }
@Component({
  selector: 'rp-login', 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: UntypedFormGroup;
  public authError: string;
  private ngUnsubscribe = new Subject();
  is2Fa;
  isLoggedIn;
  isRecoveryCode;
  private apiBase = '';
  constructor(
    private spinner: NgxSpinnerService,
    private meta: Meta,
    private titleService: Title,
    @Inject(ENVIRONMENT_INJECT_TOKEN) private env: IEnvironment,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastrService: NbToastrService,
    private storageService: WebStorageService,
  ) {
    this.apiBase = this.env.backend.websiteUrl;
  }

  ngOnInit() {
 
    this.titleService.setTitle('Rapisurv');
    // this.meta.addTag({ property: 'og:description', content: 'Your commerce Partner' })
    // this.meta.addTag({ property: 'og:image', content: 'https://images.unsplash.com/photo-1558981822-0c0c5b070026?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' })


    this.loginForm = this.formBuilder.group({
      unmn: ['', [Validators.required]],
      password: [null, []],
      code: [null],
      recovery_code: [null],
      rememberMe: [true],
    });

    this.authService.userData$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(token => {
        console.log('token', token)
        if (token) {
          const path = this.storageService.getItem(
            'path',
            { target: EStorageTarget.LocalStorage ? EStorageTarget.LocalStorage : EStorageTarget.SessionStorage },
          );
          const originalPath = this.storageService.getItem(
            'original_route_path',
            { target: EStorageTarget.Memory },
          );

          if (originalPath) {
            this.spinner.hide();
            this.router
              .navigate([originalPath])
              .then(() =>
                this.storageService.removeItem(
                  'original_route_path',
                  { target: EStorageTarget.Memory },
                ),
              );
          } else {
            if (path) {
              this.spinner.hide();
              this.router.navigate([path]);
            }
          }
        }
      });
  }

  ngOnDestroy() {
    //this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  openRegisterPage() {
    // window.open("https://api.qa.rapisurv.com/register","_self");
    location.href = this.apiBase + "register";
  }
  
    
  proceedLogin(){
    const formValue = this.loginForm.value;
    this.spinner.show();
    this.authService.checkAuthState(formValue.unmn)
      .then(res => {
        console.log('check 2fa', res)
        this.is2Fa = res.data['2fa'];
        this.isLoggedIn = true;
          this.toastrService.primary('Username exists', 'Success', {
          duration: 3000,
        });
       this.router.navigate([`authenticate/${formValue.unmn}/${this.is2Fa}`]); 
        this.spinner.hide();
      }) 
      .catch((err: Response) => {
        console.log('err', err.error.errors.unmn[0])
        this.spinner.hide();
        this.toastrService.warning(err.error.errors.unmn[0], 'Error', {
          duration: 3000,
        });
      
        this.authError = err.error.message;
      });
    
  }

  phonenumber(inputtxt) {
    var phone = /^\d{10}$/;
    if ((inputtxt.value.match(phone))) {
      return true;
    }
    else {
      alert("message");
      return false;
    }
  }


  public onClickSubmitLogin() {
    const formValue = this.loginForm.value;
    this.spinner.show();
    this.authService.login(formValue.unmn, formValue.password, formValue.rememberMe, formValue.code, formValue.recovery_code)
      .then(res => {
        console.log('login', res)
        // this.is2Fa = res.data['2fa'];
        // this.isLoggedIn = true;
        // this.authError = res.msg;
        this.spinner.hide();
      })
      .catch((err: Response) => {
        console.log('err', err)
        this.spinner.hide();
        this.authError = err.error.message;
        setTimeout(() => {
          this.authError = null;
          console.log("this is the third message")
        }, 1000);

      });
  }

  reset() {
    this.isLoggedIn = false;
    this.is2Fa = false;
    this.isRecoveryCode = false
    this.loginForm.patchValue({
      unmn: null,
      password: null,
      code: null,
      recovery_code: null,
    })
  }

  showRecoveryCode() {
    this.isRecoveryCode = !this.isRecoveryCode
  }

  public checkAuthState() {
    const formValue = this.loginForm.value;
    this.spinner.show();
    this.authService.checkAuthState(formValue.unmn)
      .then(res => {
        console.log('check 2fa', res)
        this.is2Fa = res.data['2fa'];
        this.isLoggedIn = true;
        // this.authError = res.msg;
        this.spinner.hide();
      })
      .catch((err: Response) => {
        console.log('err', err)
        this.toastrService.warning(err.error.errors.unmn[0], 'Error', {
          duration: 3000,
        });
        this.spinner.hide();
        this.authError = err.error.message;
      });
  }
}  
 