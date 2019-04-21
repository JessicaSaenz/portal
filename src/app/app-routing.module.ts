import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './sessions/signin/signin.component'
import { SignupComponent } from './sessions/signup/signup.component'
import { EmailchekedComponent } from './sessions/emailcheked/emailcheked.component'
import { EmailvalidationComponent } from './sessions/emailvalidation/emailvalidation.component'
import { ErrorComponent } from './sessions/error/error.component'
import { NotFoundComponent } from './sessions/not-found/not-found.component'
import { ForgotPasswordComponent } from './sessions/forgot-password/forgot-password.component'
import { HomeComponent } from './home'

import { AppLayoutComponent, SessionsLayoutComponent } from './_layout'

import { AuthenticationService } from './_services'
import { AuthGuard } from './_guards'
import { from } from 'rxjs';

const routes: Routes = [
  { path: '',  redirectTo: 'signin', pathMatch: 'full'},
  { path: '', component: SessionsLayoutComponent,
     children:[
      { path: 'signin', component: SigninComponent },
      { path: 'signup',component: SignupComponent},
      { path: 'emailcheked',component: EmailchekedComponent},
      { path: 'forgot-password',component: ForgotPasswordComponent},
      { path: 'emailvalidation',component: EmailvalidationComponent},
      { path: 'error',component: ErrorComponent},
      { path: '404',component: NotFoundComponent},
  ] },
  { path: '', component: AppLayoutComponent,
     children:[
      { path: 'home',component: HomeComponent, /*canActivate: [AuthGuard]*/},
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
