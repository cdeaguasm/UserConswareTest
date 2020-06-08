import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    loginResource = "api/login";
    keySession = "SESSION";

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

    login(userName: string, password: string): Observable<any> {
        let loginRequest = {
            userName,
            password
        }

        return this.http.post(`${this.baseUrl}${this.loginResource}`, loginRequest);
    }

    logout() {
        localStorage.removeItem(this.keySession);
    }

    setSesion(fullName) {
        localStorage.setItem(this.keySession, fullName);
    }

    getSession() {
        return localStorage.getItem(this.keySession);
    }
}
