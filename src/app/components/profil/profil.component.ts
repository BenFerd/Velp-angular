import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { User } from "src/app/models/User.model";
import { AdvertsService } from "src/app/services/adverts.service";
import { Observable } from "rxjs";
import { ReviewService } from "src/app/services/review.service";
import { ViewportScroller } from "@angular/common";
import { FormGroup, FormControl } from "@angular/forms";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: "app-profil",
  templateUrl: "./profil.component.html",
  styleUrls: ["./profil.component.scss"],
})
export class ProfilComponent implements OnInit {
  isAuthenticated = false;
  userData: any;
  user: User;
  adverts: Observable<any>;
  concernR: Observable<any>;
  reviews: Observable<any>;
  form: FormGroup;
  error = false;
  

  constructor(
    private auth: AuthService,
    private router: Router,
    private ad: AdvertsService,
    private revService: ReviewService,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    // Vérification du token et récupération des données du user connecté.
    this.isAuthenticated = this.auth.isAuthenticated();
    if (this.isAuthenticated === true) {
      this.userData = this.auth.getUserData();
      this.auth
        .getUserById(this.userData.id)
        .subscribe((data) => (this.user = data));
      
      this.auth.authState.subscribe((state) => {
        this.isAuthenticated = state;
      });
      // Récupération des annonces de l'utilisateur.
      this.adverts = this.ad.findAllOfUser(this.userData.id);
      // Récupérations des avis écrit par l'utilisateur.
      this.reviews = this.revService.getReview(this.userData.id);
      // Récupérations des avis écrit à propos l'utilisateur.
      this.concernR = this.revService.findAllReviewConcerningUser(
        this.userData.id
      );
      this.initializeForm();
    }

    
  }

  initializeForm() {
    this.form = new FormGroup({
      firstName: new FormControl(""),
      lastName: new FormControl(""),
      email: new FormControl(""),
      password: new FormControl(""),
      city: new FormControl(""),
    });
    if(this.user){
    this.form.setValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      password: this.user.password,
      city: this.user.city
    })
  }
  }

  get email() {
    return this.form.get("email");
  }
  get password() {
    return this.form.get("password");
  }
  get firstName() {
    return this.form.get("firstName");
  }
  get lastName() {
    return this.form.get("lastName");
  }
  get city() {
    return this.form.get("city");
  }

  handleSubmit() {
    this.auth.register(this.form.value).subscribe(
      () => {
        console.log("Edit OK");
      },
      (httpError: HttpErrorResponse) => {
        if (httpError.status === 400) {
          const violations = httpError.error.violations as Violation[];

          for (let apiViolation of violations) {
            this.form
              .get(apiViolation.propertyPath)
              .setErrors({ Violation: apiViolation.message });
          }
        }
      }
    );
  }

  handleDelete(id: number){
    this.ad.delete(id);
    console.log("delete");
    this.router.navigateByUrl("profil");
  }
  

  //Gestion déconnexion et redirection.
  handleLogout() {
    this.auth.logout();
    this.isAuthenticated = false;
    this.router.navigateByUrl("login");
  }

  onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
}
export interface Violation {
  propertyPath: string;
  message: string;
}