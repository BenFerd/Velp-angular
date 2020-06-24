import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  errorMessage: string;

  form = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
  });

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  handleSubmit() {
    if (this.form.invalid) return;

    this.auth.authenticate(this.form.value).subscribe(
      (resultat) => {
        this.errorMessage = "";
        this.router.navigateByUrl("/");
      },
      (error) => {
        if (error.status === 401) {
          this.errorMessage =
            "L'email et le mot de passe de l'utilisateur ne correspondent pas!";
          return;
        }
        this.errorMessage =
          "Un problème est survenu, veuillez réessayer plus tard.";
      }
    );
  }
}
