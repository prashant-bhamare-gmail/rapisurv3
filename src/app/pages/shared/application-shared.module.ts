import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { FileSizePipe } from './pipes/file-size/file-size.pipe';
import { ImageInputComponent } from './components/image-input/image-input.component';
import { ThemeModule } from '../../@theme/theme.module';
import { ImageComponent } from './components/image/image.component';
import { ViewImageComponent } from './components/view-image/view-image.component';
import { CommasDirective } from '../../shared/pipes/commas.directive';
import { NumberWithCommasPipe } from '../../shared/pipes/number-with-commas.pipe';
import { ShortenTextPipe } from '../../shared/pipes/shortentext.pipe';
import { UppercaseDirective } from './components/uppercase.directive';
import { ThousandSeperatorDirective } from './components/thousand-seperator.directive';
import { ToolTipComponent, TooltipMessageDirective } from './components/tooltip/tooltip.component';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule,
        ThemeModule,
        Ng2ImgMaxModule
    ],
    declarations: [
        FileSizePipe,
        ImageInputComponent,
        ImageComponent,
        ViewImageComponent,
        CommasDirective,
        NumberWithCommasPipe,
        UppercaseDirective,
        ThousandSeperatorDirective,
        ShortenTextPipe,
        ToolTipComponent,
        TooltipMessageDirective
    ],
    providers: [],
    exports: [
        FileSizePipe,
        ImageInputComponent,
        ImageComponent,
        ViewImageComponent,
        CommasDirective,
        NumberWithCommasPipe,
        UppercaseDirective,
        ThousandSeperatorDirective,
        ShortenTextPipe,
        ToolTipComponent,
        TooltipMessageDirective
    ]
})
export class ApplicationSharedModule { }
