import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    usersResource = "api/users/";

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

    getUsers(filter?: string): Observable<User[]> {
        let url = `${this.baseUrl}${this.usersResource}`;

        if (filter) {
            url += `?filter=${filter}`;
        }
        return this.http.get<User[]>(url);
    }

    getUser(id: number): Observable<User> {
        return this.http.get<User>(`${this.baseUrl}${this.usersResource}${id}`);
    }

    createUser(user: any): Observable<User> {
        return this.http.post<User>(`${this.baseUrl}${this.usersResource}`, user);
    }

    updateUser(id: number, user: any): Observable<any> {
        return this.http.put(`${this.baseUrl}${this.usersResource}${id}`, user);
    }

    deleteUser(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}${this.usersResource}${id}`);
    }
}