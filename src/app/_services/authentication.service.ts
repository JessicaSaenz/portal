import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpRequest, HttpClient, HttpResponse } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './../_models';

import { environment } from './../../environments/environment'

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private securityEndpoint = environment.securityEndpoint
    private appEndpoint = environment.appEndpoint  

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
       
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
  

    signin(email: string, password: string, rememberme: boolean) {
        return this.http.post<any>(this.securityEndpoint + 'users/signin', { email, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token && user.status == "A") {

                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    signup(user) {
        return this.http.post<any>(this.securityEndpoint + 'users/signup', JSON.stringify(user), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
            .pipe(
                map(response => {
                    return response;
                })
            )
    }

    signout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    validationEmail(code) {
        return this.http.post<any>(this.securityEndpoint + 'users/emailcheked', JSON.stringify(code), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
            .pipe(
                map(response => {
                    return response;
                })
            )
    }

    recoverPassword(email) {
        return this.http.post<any>(this.securityEndpoint + 'users/recoverpassword', JSON.stringify(email), { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) })
            .pipe(
                map(response => {
                    return response;
                })
            )
    }
   
}