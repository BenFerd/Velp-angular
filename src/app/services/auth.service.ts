import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";


import { environment } from "src/environments/environment";
import { Credentials } from "../models/credentials.model";
import * as JwtDecode from 'jwt-decode';
import { User } from '../models/User.model';

// Modèle de la réponse de l'API jwt
interface AuthResponse {
  token: string;
}
const USERS_API = environment.userApi;
const AUTH_API = environment.authApi;

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // Sujet qui sera observé par d'autre comp.
  // Renvoi true si connecté false sinon.
  authState = new Subject<boolean>();

  constructor(private httpClient: HttpClient) {}

  //inscription d'un nouvel user.
  register(user: User) {
    return this.httpClient.post(USERS_API, user);
  }

  //Permet de s'auth à l'API.
  authenticate(credentials: Credentials) {
    return this.httpClient.post(AUTH_API, credentials).pipe(
      //map ne transforme pas la valeur de l'obs mais intervient avant de renvoyer la valeur.
      map((resultat: AuthResponse) => {
        // Enregistrement du token en local.
        sessionStorage.setItem("token", resultat.token);
        // On dit que le user est mnt log.
        this.authState.next(true);
        return resultat;
      })
    );
  }

  //Deconnexion de l'utilisateur.
  logout(){
    //On supprime le token du storage.
    sessionStorage.removeItem("token");
    //On remet son statut à déconnecté.
    this.authState.next(false);
  }

  //Permet d'avoir le token stocké ou null si pas de token.
  getToken(): string {
    return sessionStorage.getItem("token") || null;
  }

  //Permet de savoir si on est auth ou pas.
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  getUserData() {
    if (!this.getToken()) return null;

    return JwtDecode(this.getToken());
  }

  getUserById(id: number) {
    return this.httpClient.get<User>(USERS_API + "/" + id);
  }



  
  // getUserData() {
  //   if (!this.getToken()) return null;
  //   return this.helper.decodeToken(this.getToken());

  // }






}
