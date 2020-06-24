import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}
  
  // Injection du token dans les headers si on est auth.
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.auth.isAuthenticated()) {
      return next.handle(req);
    }
    // récupération du token.
    const token = this.auth.getToken();
    //On crée un copie de la requete qu'on modifie.
    const cloneReq = req.clone({
      headers: req.headers.append("Authorization", "Bearer " + token)
    });
    return next.handle(cloneReq);
  }

}
