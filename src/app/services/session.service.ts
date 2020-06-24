// import { Injectable } from '@angular/core';
// import { TokenModel } from '../models/tokens.model'
// import { BehaviorSubject, Observable } from 'rxjs';
// import * as jwt_decode from 'jwt-decode';

// @Injectable({
//   providedIn: 'root'
// })
// export class SessionService {

//   private token$ = new BehaviorSubject<string>(null);
//   constructor() { }


//   storeToken(token: TokenModel) {
//     sessionStorage.setItem('TOKEN', token.token);
//     this.token$.next(token.token);
//   }

//   get isLogged(): boolean {
//     return sessionStorage.getItem('TOKEN') != null;
//   }

//   get token(): Observable<string> {
//     return this.token$;
//   }

//   logout() {
//     this.token$.next(null);
//     return sessionStorage.removeItem('TOKEN');
//   }
// }