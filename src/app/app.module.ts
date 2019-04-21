import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { ApCommonModule } from './common/app.common.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule} from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout'
import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgxCaptchaModule } from 'ngx-captcha';


import { AppComponent } from './app.component';
import { SessionsModule } from './sessions/sessions.module'
import { HomeModule } from './home/home.module'

import { ErrorInterceptor, fakeBackendProvider } from './_helpers';
import { AuthenticationService } from './_services'
import { AuthGuard } from './_guards'
import { AppLayoutComponent } from './_layout/app-layout/app-layout.component';
import { SessionsLayoutComponent } from './_layout/sessions-layout/sessions-layout.component';

@NgModule({
  declarations: [
    AppComponent,   
    AppLayoutComponent,
    SessionsLayoutComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,  
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    NgxCaptchaModule,
    HomeModule,
    SessionsModule,
    ApCommonModule
  ], 
  providers: [ 
    AuthenticationService,   
    AuthGuard,
    //fakeBackendProvider,    
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  entryComponents: [
    //DialogOverviewExampleDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
