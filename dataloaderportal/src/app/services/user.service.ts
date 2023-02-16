import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';

const BASE_URL = "http://localhost:8081/api/auth";

const reqHeaders = new HttpHeaders({
  'Content-Type': 'application/json' as const
})

const httpOptions = {
  headers: reqHeaders
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private tokenService: TokenStorageService) { }

  //create new user
  createUser(user: {
    username: string;
    role :[string];
    email: string;
    password: string;
  }) {
    return this.http.post(BASE_URL + "/signup", user, httpOptions);
  }

  //login
  login(request: {
    username: string;
    password: string;
  }) {
    return this.http.post(BASE_URL + "/signin", request, httpOptions);
  }

}
