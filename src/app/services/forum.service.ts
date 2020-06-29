import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { Topic } from "../models/Topic.model";

const topicsApiUrl = environment.topicApi;

@Injectable({
  providedIn: "root",
})
export class ForumService {
  constructor(private http: HttpClient) {}

  // Récupération de tous les topics.
  // L'API nous renvoie un objet riche, dont la propriété hydra:member représente le tableau de
  // adverts.
  // On se fout de tout le reste, donc on transforme le gros objet en extrayant uniquement le tableau
  // qui nous intéresse.
  public getAllTopics() {
    return this.http
      .get(topicsApiUrl)
      .pipe(map((data) => data["hydra:member"] as Topic[]));
  }

  // Récupération d'un topic avec son id.
  public getTopicById(id: number) {
    return this.http
      .get(topicsApiUrl + "/" + id)
      .pipe(map((data) => data["hydra:member"] as Topic[]));
  }

  // Permet d'ajouter un topic.
  public createTopic(topic: Topic) {
    this.http.post<Topic>(topicsApiUrl, topic);
  }



}
