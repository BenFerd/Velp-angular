import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { AdvertsComponent } from "./components/adverts/adverts.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { Routes, RouterModule } from "@angular/router";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as JwtDecode from 'jwt-decode';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { ProfilComponent } from './components/profil/profil.component';
import { AdvertComponent } from './components/advert/advert.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "adverts",
    component: AdvertsComponent,
  },
  {
    path: "adverts/:advertId",
    component: AdvertComponent,
  },
  {
    path: "profil",
    component: ProfilComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdvertsComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ProfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  {
    provide: Storage,
    useValue: window.localStorage
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
