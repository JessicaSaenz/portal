import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms'
import { CustomValidators } from 'ngx-custom-validators';
import { MatProgressBar, MatButton } from '@angular/material';
import { Router } from '@angular/router';

import { User } from './../../_models';
import { AuthenticationService } from './../../_services'
import { environment } from './../../../environments/environment'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @ViewChild(MatButton) submitButton: MatButton;

  signupForm: FormGroup
  errorMessage: string
  newuser: User
  readonly sitekey = environment.captchasitekey
  captchaIsLoaded = false;
  captchaSuccess = false;
  captchaIsExpired = false;
  captchaResponse?: string;

  theme: 'light' | 'dark' = 'light';
  size: 'compact' | 'normal' = 'normal';
  lang = 'en';
  type: 'image' | 'audio';
  useGlobalDomain: boolean = false;

  constructor(private FormBuilder: FormBuilder, private AuthService: AuthenticationService, private Router: Router) { }

  ngOnInit() {
    const passwordValidation = new FormControl('', [Validators.required, Validators.minLength(6)]);
    const confirmPasswordValidation = new FormControl('', CustomValidators.equalTo(passwordValidation));
    this.signupForm = this.FormBuilder.group({
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: passwordValidation,
      confirmpassword: confirmPasswordValidation,
      rememberMe: [],
      recaptcha: ['', Validators.required]
    })
  }

  get signupFormValues() { return this.signupForm.value }
  get signupFormControls() { return this.signupForm.controls }

  signup() {
   if (this.signupForm.invalid)
      return

    this.submitButton.disabled = true;
    this.newuser = new User();
    this.newuser.FirstName = this.signupFormValues.fname;
    this.newuser.LastName = this.signupFormValues.lname;
    this.newuser.Email = this.signupFormValues.email;
    this.newuser.Password = this.signupFormValues.password;
    this.newuser.Status = "P";

    this.AuthService.signup(this.newuser)
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
}
