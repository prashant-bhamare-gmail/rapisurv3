import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MainDashboardComponent } from './dashboard/dashboard.component';
import { ApplicationsComponent } from './applications/applications.component';
import { ProjectsComponent } from './projects/projects.component';
import { EditProjectComponent } from './projects/edit-project/edit-project.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CreateProjectComponent } from './create-project/create-project.component';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbLayoutModule,
  NbSidebarModule,
  NbRadioModule,
  NbCardModule,
  NbListModule,
  NbButtonModule,
  NbIconModule,
  NbIconLibraries,
  NbSpinnerModule,
  NbContextMenuModule,
  NbTabsetModule,
  NbToastrModule,
  NbWindowModule,
  NbCheckboxModule,
  NbInputModule,
  NbStepperModule,
} from '@nebular/theme';
import { NgxSpinnerModule } from 'ngx-spinner';
import { IonicModule } from '@ionic/angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicationSharedModule } from './shared/application-shared.module';
import { HotTableModule } from '@handsontable/angular';
import { registerAllModules } from 'handsontable/registry';
import { DialogueComponent } from './dialogue/dialogue.component';
import { MentionModule } from 'angular-mentions';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShowProjectComponent } from './projects/show-project/show-project.component';
import { EditProjectInfoComponent } from './projects/show-project/section-edit-components/project-info/edit-project-info.component';
import { EditProjectFinancialComponent } from './projects/show-project/section-edit-components/project-financial/edit-project-financial.component';
import { EditProjectDateComponent } from './projects/show-project/section-edit-components/project-date/edit-project-date.component';
import { EditProjectParticipantComponent } from './projects/show-project/section-edit-components/project-participant/edit-project-participant.component';
import { MaterialModule } from './material.module';

import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

registerAllModules();
@NgModule({
  imports: [
    NgSelectModule,
    PagesRoutingModule,
    ThemeModule,
    ReactiveFormsModule,
    NbTabsetModule,
    NgOptionHighlightModule,
    FormsModule,
    NgxSpinnerModule,
    NbSpinnerModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbEvaIconsModule,
    NbIconModule,
    NbRadioModule,
    NbContextMenuModule,
    NbCardModule,
    NbLayoutModule,
    NbDatepickerModule,
    NbMenuModule.forRoot(),
    IonicModule.forRoot(),
    ApplicationSharedModule,
    MentionModule,
    NgxDatatableModule,
    NgbModule,
    HotTableModule,
    MaterialModule,
    NbCheckboxModule,
  ],
  declarations: [
    PagesComponent,
    ApplicationsComponent,
    MainDashboardComponent,
    ProjectsComponent,
    EditProjectComponent,
    DialogueComponent,
    CreateProjectComponent,
    ShowProjectComponent,
    EditProjectInfoComponent,
    EditProjectFinancialComponent,
    EditProjectDateComponent,
    EditProjectParticipantComponent,
  ],
})
export class PagesModule {}
