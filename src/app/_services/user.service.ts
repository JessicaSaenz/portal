import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from './../../environments/environment'
import { User } from './../_models';


@Injectable({ providedIn: 'root' })
export class UserService {
    private securityEndpoint = environment.securityEndpoint
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>('${config.apiUrl}/users');
    }

    getById(id: number) {
        return this.http.get<User>('${config.apiUrl}/users/${id}');
    }    

    getStatsUsers(companyId){
      return this.http.post<any>(this.securityEndpoint + 'users/stats', JSON.stringify(companyId) , {headers: new HttpHeaders({'Content-Type':'application/json'})})
      .pipe(
        map(response => {         
          return response;
        })
      )
    }
  

    update( user: User){
        
    }   
    
}