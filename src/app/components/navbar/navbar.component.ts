import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, public session: SessionService) { }

  ngOnInit(): void {
  }

  logout() {
    this.session.logout();
    this.router.navigateByUrl('/').then(() => {
    alert("Vous avez bien été déconnecté");
    });
  }
  isLogged() {
    this.session.isLogged
  }
}
