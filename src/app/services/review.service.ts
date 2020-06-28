import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { Review } from "../models/review.model";

const reviewApi = environment.userApi;

@Injectable({
  providedIn: "root",
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  /**
   * Renvoi le tableau des avis à propos d'un user.
   * @param id id de l'utilisateur.
   */
  public findAllReviewConcerningUser(id: number) {
    return this.http
      .get(reviewApi + "/" + id + "/concern_reviews")
      .pipe(map((data) => data["hydra:member"] as Review[]));
  }

  /**
   * Renvoi le tableau des avis écrit par le user.
   * @param id id de l'utilisateur.
   */
  public getReview(id: number){
    return this.http
      .get(reviewApi + "/" + id + "/reviews")
      .pipe(map((data) => data["hydra:member"] as Review[]));
  }

}
