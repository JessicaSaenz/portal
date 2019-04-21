import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailchekedComponent } from './emailcheked/emailcheked.component'
import { EmailvalidationComponent } from './emailvalidation/emailvalidation.component'
import { ErrorComponent } from './error/error.component'
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { SigninComponent } from './signin/signin.component'
import { SignupComponent } from './signup/signup.component'

import { ReactiveFormsModule, FormsModule} from '@angular/forms'
import { ApCommonModule } from './../common/app.common.module'
import { FlexLayoutModule } from '@angular/flex-layout'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxCaptchaModule } from 'ngx-captcha';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [EmailchekedComponent,EmailvalidationComponent,ErrorComponent,ForgotPasswordComponent,NotFoundComponent,SigninComponent,SignupComponent],
  imports: [ CommonModule, ReactiveFormsModule, FormsModule, ApCommonModule, FlexLayoutModule,BrowserAnimationsModule, NgxCaptchaModule, RouterModule],
  exports: [RouterModule]
})
export class SessionsModule { }
