import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../_services'
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-emailcheked',
  templateUrl: './emailcheked.component.html',
  styleUrls: ['./emailcheked.component.css']
})
export class EmailchekedComponent implements OnInit {
  code:string
  cheked:boolean = false;
  msg:string;
  showmsg:boolean= false;
  error:string
  constructor(private route: ActivatedRoute, private AuthenticationService: AuthenticationService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.code = params['code']; 
     
      this.AuthenticationService.validationEmail(this.code)    
      .pipe(first())
      .subscribe(          
        data=>{            
          if(data === true){
            this.showmsg= true;
            this.cheked = true
            this.msg = "You have confirmed your mail correctly.";
          }
        },
        error=>{ 
          this.showmsg= true;
          this.cheked = false
          this.msg = error;
          this.error= error      
        }
      );
    })
  }

}
