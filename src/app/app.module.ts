import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from "ngx-spinner";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { NbEvaIconsModule } from '@nebular/eva-icons'; 
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module'; 
import { SharedModule } from './shared/shared.module';
import { environment } from '../environments/environment.prod';
import { ServicesModule } from './shared/services/public-api';
import { AuthStateComponent } from './auth-state/auth-state.component';
import { LoginComponent } from './login/login.component';
import { MentionModule } from 'angular-mentions';
import { HotTableModule } from '@handsontable/angular'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy,IonIcon,  } from '@ionic/angular'; 
import { NgSelectModule} from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbLayoutModule,
  NbSidebarModule,
  NbButtonModule,
  NbToastrModule,
  NbAccordionModule, 
  NbCardModule,
  NbTooltipModule,
  NbIconModule,
  NbContextMenuModule,
  NbTabsetModule,
  NbRouteTabsetModule,
  NbRadioModule,
  NbSpinnerModule,
  NbCheckboxModule

} from '@nebular/theme';
@NgModule({
  declarations: [
    AppComponent, 
    AuthStateComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptionHighlightModule,
    NgSelectModule,
    BrowserAnimationsModule,
    NbLayoutModule,
    FormsModule, ReactiveFormsModule,
    NgxSpinnerModule,
    ServicesModule.forRoot(environment),
    NbDatepickerModule.forRoot(),
    IonicModule,
    NbButtonModule,
    HotTableModule,
    MentionModule,
    CoreModule.forRoot(),
    NbToastrModule.forRoot(),
    SharedModule,
    ThemeModule.forRoot(), 
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbEvaIconsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
