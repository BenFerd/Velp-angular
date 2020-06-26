import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-profil",
  templateUrl: "./profil.component.html",
  styleUrls: ["./profil.component.scss"],
})
export class ProfilComponent implements OnInit {
  isAuthenticated = false;
  userData: any;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isAuthenticated = this.auth.isAuthenticated();
    if (this.isAuthenticated) {
      this.userData = this.auth.getUserData();
    }

    this.auth.authState.subscribe((state) => {
      this.isAuthenticated = state;

      if (this.isAuthenticated) {
        this.userData = this.auth.getUserData();
      }
    });
    
  }

  handleLogout() {
    this.auth.logout();
    this.isAuthenticated = false;
    this.router.navigateByUrl("login");
  }
}
