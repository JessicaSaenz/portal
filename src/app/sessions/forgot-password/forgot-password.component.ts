import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validator, FormGroup, FormControl, Validators} from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';

import { User } from './../../_models';
import { AuthenticationService } from './../../_services'
import { environment } from './../../../environments/environment'
import { Router } from '@angular/router'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor( private FormBuilder:FormBuilder, private AuthService:AuthenticationService, private Router:Router) { }

  ForgotPFormGroup: FormGroup
  readonly sitekey='6LcvoUgUAAAAAJJbhcXvLn3KgG-pyULLusaU4mL1'
  captchaIsLoaded = false;
  captchaSuccess = false;
  captchaIsExpired = false;
  captchaResponse?: string;
  errorMessage:string;

  theme: 'light' | 'dark' = 'light';
  size: 'compact' | 'normal' = 'normal';
  lang = 'en';
  type: 'image' | 'audio';
  useGlobalDomain: boolean = false;


  ngOnInit() {
    this.ForgotPFormGroup =  this.FormBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      recaptcha: ['', Validators.required]
    })
  }

  get ForgotPFormGroupValues() { return this.ForgotPFormGroup.value}

  handleReset(): void {
    this.captchaSuccess = false;
    this.captchaResponse = undefined;
    this.captchaIsExpired = false;
  }

  handleExpire(): void {
    this.captchaSuccess = false;
    this.captchaIsExpired = true;
  }

  handleLoad(): void {
    this.captchaIsLoaded = true;
    this.captchaIsExpired = false;
  }

  handleSuccess(captchaResponse: string): void {
    this.captchaSuccess = true;
    this.captchaResponse = captchaResponse;
    this.captchaIsExpired = false;
  }

  recoverPassword(){
    this.AuthService.recoverPassword(this.ForgotPFormGroupValues.email)
    .pipe()
    .subscribe(
      response => {
        if (response) {
          this.Router.navigate(['/emailvalidation'])
        }
      }, errormessage => {
        this.errorMessage = errormessage;
      }
    )
  }

}
