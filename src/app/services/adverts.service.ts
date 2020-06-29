import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Advert } from "../models/Advert.model";

const ADVERTS_API = environment.advertApi;
const useradvert = environment.userApi;

@Injectable({
  providedIn: "root",
})
export class AdvertsService {
  constructor(private http: HttpClient) {}

  /**
   * Récupération de toutes les annonces.
   */
  public findAll() {
    return (
      this.http
        .get(ADVERTS_API)
        // On transforme le résultat de l'API en un tableau de adverts
        // L'API nous renvoie un objet riche, dont la propriété hydra:member représente le tableau de
        // adverts.
        // On se fout de tout le reste, donc on transforme le gros objet en extrayant uniquement le tableau
        // qui nous intéresse.
        .pipe(map((data) => data["hydra:member"] as Advert[]))
    );
  }

  /**
   * Récupère les annonces d'un utilisateur.
   * @param id id de l'utilisateur.
   */
  public findAllOfUser(id: number) {
    return this.http
      .get(useradvert + "/" + id + "/adverts")
      .pipe(map((data) => data["hydra:member"] as Advert[]));
  }

  /**
   * Récupère une annonce en particulier.
   * @param id l'id de l'annonce qu'on veut.
   */
  public find(id: number) {
    return this.http.get<Advert>(ADVERTS_API + "/" + id);
  }

  /**
   * Permet de créer une annonce via l'API.
   * @param advert L'objet annonce qu'on veut créer.
   */
  public create(advert: Advert) {
    return this.http.post<Advert>(ADVERTS_API, advert);
  }

  /**
   * Permet de mettre à jour l'annonce.
   * @param advert
   */
  public update(advert: Advert) {
    // Tri pour ne pouvoir modifier que les infos pertinentes.
    const updateAdvert = {
      title: advert.title,
      description: advert.description,
      image: advert.image,
    };

    return this.http.put<Advert>(ADVERTS_API + "/" + advert.id, updateAdvert);
  }

  public delete(id: number){
    return this.http.delete(ADVERTS_API + "/" + id)
  }
}
