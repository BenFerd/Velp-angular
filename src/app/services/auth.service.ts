import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { TokenModel } from '../models/tokens.model';
import { LoginModel } from '../models/login.model';

export interface ApplicationUser {
  token: string;
  username: string;
  expiresIn: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(private httpClient: HttpClient) {}

  login(login: LoginModel): Observable<TokenModel> {
    return this.httpClient.post<TokenModel>(environment.apiUrl + "/api/login_check", login);
  }
  
}
