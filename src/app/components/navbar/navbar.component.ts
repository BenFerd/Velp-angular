import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isAuthenticated = false;
  userData: any;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isAuthenticated = this.auth.isAuthenticated();
    if (this.isAuthenticated) {
      this.userData = this.auth.getUserData();
    }

    this.auth.authState.subscribe(state => {
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
