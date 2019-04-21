import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';

import { ReactiveFormsModule, FormsModule} from '@angular/forms'
import { ApCommonModule } from './../common/app.common.module'
import { FlexLayoutModule } from '@angular/flex-layout'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [HomeComponent],
  imports: [ CommonModule,ReactiveFormsModule,FormsModule,ApCommonModule,FlexLayoutModule,BrowserAnimationsModule]
})
export class HomeModule { }
