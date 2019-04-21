import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl,FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from './../../_services'
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit { 

  signinForm: FormGroup
  errorMessage: string
  returnUrl: string

  constructor( private fb: FormBuilder, private AuthService: AuthenticationService,
               private aroute: ActivatedRoute , private router: Router) { }

  ngOnInit() {
    this.signinForm = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',Validators.required],
      rememberMe: [''],
    }) 
    this.AuthService.signout();
    this.returnUrl = this.aroute.snapshot.queryParams['returnUrl'] || '/home';
  }

  get formfieldsValue(){return this.signinForm.value}
  get formfieldsControls(){return this.signinForm.controls}

  signin(){
    if(this.signinForm.invalid){
      return
    }
    this.AuthService.signin(this.formfieldsValue.email, this.formfieldsValue.password, this.formfieldsValue.rememberMe)
      .pipe(first())
      .subscribe(
        data=>{
          this.router.navigate([this.returnUrl])
        },
        errorMessage=>{
          this.errorMessage= errorMessage
        }
      )

  }

}
